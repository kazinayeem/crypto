import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import React from "react";
import { ArrowUpRightFromSquare } from "lucide-react";
import { initialWallets, type WalletData } from "@/wallets";

const API_BASE_URL = "http://localhost:3001/api";

interface WalletsState {
  wallets: WalletData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WalletsState = {
  wallets: initialWallets.map((wallet) => ({
    ...wallet,
    loading: wallet.id === "bybit",
    error: null,
  })),
  status: "idle",
  error: null,
};

export const fetchBybitWalletData = createAsyncThunk(
  "wallets/fetchBybitWalletData",
  async (_, { rejectWithValue }) => {
    try {
      const btcUsdtSymbol = encodeURIComponent("BTC/USDT");

      const [
        balanceResponse,
        btcUsdtTickerResponse,
        spotOpenOrdersResponse,
        futuresPositionsResponse,
        tradePairsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/balance`),
        fetch(`${API_BASE_URL}/ticker/${btcUsdtSymbol}`),
        fetch(`${API_BASE_URL}/bybit/spot-open-orders/${btcUsdtSymbol}`),
        fetch(`${API_BASE_URL}/bybit/futures-positions`),
        fetch(`${API_BASE_URL}/bybit/trade-pairs`),
      ]);

      let balance: any = {};
      if (balanceResponse.ok) {
        const fullBalanceData = await balanceResponse.json();
        balance = fullBalanceData.info?.result?.list?.[0] || {};
      }

      let todayChange = 0;
      if (btcUsdtTickerResponse.ok) {
        const btcUsdtTicker = await btcUsdtTickerResponse.json();
        todayChange = btcUsdtTicker.percentage || 0;
      }

      let spotOpenOrders: WalletData["spotOpenOrders"] = [];
      if (spotOpenOrdersResponse.ok) {
        const orders = await spotOpenOrdersResponse.json();
        spotOpenOrders = orders.map((order: any) => ({
          pair: order.symbol || "N/A",
          type: `${order.type || "N/A"}/${order.side || "N/A"}`,
          amount: `${order.filled || 0}/${order.amount || 0}`,
          price: order.price || 0,
          tp_sl: `${order.takeProfit || "--"}/${order.stopLoss || "--"}`,
          date: order.timestamp
            ? new Date(order.timestamp).toLocaleString()
            : "N/A",
        }));
      }

      let futuresPositions: WalletData["futuresPositions"] = [];
      if (futuresPositionsResponse.ok) {
        const positions = await futuresPositionsResponse.json();
        futuresPositions = positions.map((pos: any) => ({
          pair: pos.symbol || "N/A",
          pnlUsdt: pos.unrealizedPnl || 0,
          roi: pos.percentage || 0,
          sizeUsdt: (pos.contracts || 0) * (pos.notional || 0),
          marginUsdt: pos.initialMargin || 0,
          entryPrice: pos.entryPrice || 0,
          markPrice: pos.markPrice || 0,
          liqPrice: pos.liquidationPrice || "--",
          tp_sl: `${pos.takeProfitPrice || "--"}/${pos.stopLossPrice || "--"}`,
          leverage: pos.leverage || "N/A",
        }));
      }

      let tradePairs: WalletData["tradePairs"] = [];
      if (tradePairsResponse.ok) {
        const pairs = await tradePairsResponse.json();
        tradePairs = pairs.map((market: any) => ({
          ticker: market.ticker || "N/A",
          change24hrs: market.change24hrs || 0,
          iconUrl:
            market.iconUrl ||
            `https://placehold.co/24x24/CCCCCC/FFFFFF?text=${market.ticker?.[0] || "N"}`,
        }));
      }

      const processedAssets: WalletData["assets"] = (balance.coin || []).map(
        (coinInfo: any) => ({
          name: coinInfo.coin || "N/A",
          ticker: (coinInfo.coin || "N/A").toLowerCase(),
          amount: parseFloat(coinInfo.walletBalance || "0"),
          usdValue: parseFloat(coinInfo.usdValue || "0"),
          avgCost: 0,
          pnl: 0,
          pnlPercentage: 0,
          iconUrl: `https://placehold.co/24x24/CCCCCC/FFFFFF?text=${coinInfo.coin?.[0] || "N"}`,
        })
      );

      const totalBalanceEquity = parseFloat(balance.totalEquity || "0");

      const bybitWalletData: WalletData = {
        id: "bybit",
        name: "Bybit (Testnet)",
        icon: () => React.createElement(ArrowUpRightFromSquare, { size: 20 }),
        balance: totalBalanceEquity,
        todayChange,
        last7DaysChange: 0,
        assets: processedAssets,
        spotOpenOrders,
        futuresPositions,
        tradePairs,
        loading: false,
        error: null,
      };

      return bybitWalletData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch Bybit data");
    }
  }
);

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBybitWalletData.pending, (state) => {
        state.status = "loading";
        state.error = null;
        const index = state.wallets.findIndex((w) => w.id === "bybit");
        if (index !== -1) {
          state.wallets[index].loading = true;
          state.wallets[index].error = null;
        }
      })
      .addCase(
        fetchBybitWalletData.fulfilled,
        (state, action: PayloadAction<WalletData>) => {
          state.status = "succeeded";
          const index = state.wallets.findIndex((w) => w.id === "bybit");
          if (index !== -1) {
            state.wallets[index] = {
              ...action.payload,
              loading: false,
              error: null,
            };
          }
        }
      )
      .addCase(fetchBybitWalletData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        const index = state.wallets.findIndex((w) => w.id === "bybit");
        if (index !== -1) {
          state.wallets[index].loading = false;
          state.wallets[index].error = action.payload as string;
        }
      });
  },
});

export default walletsSlice.reducer;
