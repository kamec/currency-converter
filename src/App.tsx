import { useState } from "react";
import { rates, type Currency } from "./utils/rates";
import { motion } from "framer-motion";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("EUR");

  const rateFrom = rates[fromCurrency];
  const rateTo = rates[toCurrency];
  const converted = (amount * rateTo) / rateFrom;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-slate-800 mb-6">
          💱 Currency Converter
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* From currency */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as Currency)}
            className="w-full border rounded-lg px-3 py-2"
          >
            {Object.keys(rates).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* To currency */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as Currency)}
            className="w-full border rounded-lg px-3 py-2"
          >
            {Object.keys(rates).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <motion.div
          className="bg-slate-100 rounded-lg p-3 text-center text-lg font-semibold"
          key={`${fromCurrency}-${toCurrency}-${amount}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {amount} {fromCurrency} ={" "}
          <span className="text-blue-600">
            {converted.toFixed(2)} {toCurrency}
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}
