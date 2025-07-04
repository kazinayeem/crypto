import express from 'express';
import cors from 'cors';
import ccxt from 'ccxt';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


const bybit = new ccxt.bybit({
    apiKey: process.env.BYBIT_TESTNET_API_KEY,
    secret: process.env.BYBIT_TESTNET_API_SECRET,
    options: {
        defaultType: 'spot',
        recvWindow: 60000,
        testnet: true,
    },
    verbose: false,
    enableRateLimit: true,
});


app.get('/api/time', async (req, res) => {
    try {
        const time = await bybit.fetchTime();
        res.json(time);
    } catch (error) {
        console.error('Error fetching Bybit time:', error);
        res.status(500).json({ error: 'Failed to fetch time' });
    }
});


app.get('/api/balance', async (req, res) => {
    try {
        const balance = await bybit.fetchBalance();
        res.json(balance);
    } catch (error) {
        console.error('Error fetching Bybit balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});


app.get('/api/ticker/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const ticker = await bybit.fetchTicker(symbol);
        res.json(ticker);
    } catch (error) {
        console.error(`Error fetching ticker for ${symbol}:`, error);
        res.status(500).json({ error: 'Failed to fetch ticker' });
    }
});


app.get('/api/ohlcv/:symbol/:timeframe', async (req, res) => {
    const { symbol, timeframe } = req.params;
    try {
        const ohlcv = await bybit.fetchOHLCV(symbol, timeframe);
        res.json(ohlcv);
    } catch (error) {
        console.error(`Error fetching OHLCV for ${symbol} timeframe ${timeframe}:`, error);
        res.status(500).json({ error: 'Failed to fetch OHLCV' });
    }
});


app.post('/api/order', async (req, res) => {
    const orderData = req.body;
    try {
        const order = await bybit.createOrder(
            orderData.symbol,
            orderData.type,
            orderData.side,
            orderData.amount,
            orderData.price,
            orderData.params || {}
        );
        res.json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});


app.get('/api/bybit/spot-open-orders/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const openOrders = await bybit.fetchOpenOrders(symbol, undefined, undefined, {
            type: 'spot',
        });
        res.json(openOrders);
    } catch (error) {
        console.error(`Error fetching Bybit spot open orders for ${symbol}:`, error);
        res.status(500).json({ error: 'Failed to fetch spot open orders' });
    }
});


app.get('/api/bybit/futures-positions', async (req, res) => {
    try {
        const positions = await bybit.fetchPositions(undefined, {
            type: 'swap',
            subType: 'linear',
        });
        res.json(positions);
    } catch (error) {
        console.error('Error fetching Bybit futures positions:', error);
        res.status(500).json({ error: 'Failed to fetch futures positions' });
    }
});


app.get('/api/bybit/trade-pairs', async (req, res) => {
    try {
        const markets = await bybit.fetchMarkets();
        const tradePairs = markets
            .filter(market => market.spot && market.active)
            .map(market => ({
                ticker: market.symbol,
                change24hrs: market.change || 0,
                iconUrl: `https://placehold.co/24x24/CCCCCC/FFFFFF?text=${market.base ? market.base.substring(0, 1) : '?'}`, // Handle potential undefined base
            }));
        res.json(tradePairs);
    } catch (error) {
        console.error('Error fetching Bybit trade pairs:', error);
        res.status(500).json({ error: 'Failed to fetch trade pairs' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
    console.log(`Bybit Testnet Mode: ${bybit.options.testnet}`);
});
