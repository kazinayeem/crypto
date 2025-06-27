import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "./ui/input";

type FormData = {
  wallet: string;
  coin: string;
  amount: string;
};

const wallets = [
  { value: "wallet1", label: "Wallet 1" },
  { value: "wallet2", label: "Wallet 2" },
];

const coins = [
  { value: "btc", label: "Bitcoin (BTC)" },
  { value: "eth", label: "Ethereum (ETH)" },
];

const FundTransferForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      wallet: "",
      coin: "",
      amount: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data", data);
    // Add your API call here
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full  mx-auto p-6  rounded-xl"
    >
      {/* Recipient Wallet */}
      <div className="mb-4">
        <label htmlFor="wallet" className="block text-sm text-gray-300 mb-1">
          Recipient Wallet
        </label>
        <Controller
          name="wallet"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              name={field.name}
              disabled={field.disabled}
            >
              <SelectTrigger
                id="wallet"
                className="w-full rounded-lg border border-gray-600 bg-transparent text-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                ref={field.ref}
              >
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((w) => (
                  <SelectItem key={w.value} value={w.value}>
                    {w.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Select Coin */}
      <div className="mb-4">
        <label htmlFor="coin" className="block text-sm text-gray-300 mb-1">
          Select Coin
        </label>
        <Controller
          name="coin"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              name={field.name}
              disabled={field.disabled}
            >
              <SelectTrigger
                id="coin"
                className="w-full rounded-lg border border-gray-600 bg-transparent text-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                ref={field.ref}
              >
                <SelectValue placeholder="Select Coin" />
              </SelectTrigger>
              <SelectContent>
                {coins.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Amount to Send */}
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm text-gray-300 mb-1">
          Amount to Send
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="amount"
              placeholder="Amount"
              disabled
              className="w-full rounded-lg border border-gray-600 bg-transparent text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
      </div>

      {/* Confirm Button */}
      <motion.button
        type="submit"
        disabled
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full rounded-full bg-gray-400 py-3 text-gray-100 text-lg font-medium cursor-not-allowed transition-colors"
      >
        Confirm
      </motion.button>
    </motion.form>
  );
};

export default FundTransferForm;
