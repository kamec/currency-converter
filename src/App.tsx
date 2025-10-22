import { useState, useEffect } from "react";
import { rates as localRates, type Currency } from "./utils/rates";
import { motion } from "framer-motion";

const API_BASE = "https://api.frankfurter.app";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("EUR");

  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const rateFrom = rates[fromCurrency];
  // const rateTo = rates[toCurrency];
  // const converted = (amount * rateTo) / rateFrom;

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setResult(amount);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(
      `${API_BASE}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const value = Object.values(data.rates)[0] as number;
        setResult(value);
        setError(null);
      })
      .catch((err) => {
        console.error("Ошибка при получении данных:", err);
        setResult(null);
        setError("Ошибка загрузки курса");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [amount, fromCurrency, toCurrency]);

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
            {Object.keys(localRates).map((code) => (
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
            {Object.keys(localRates).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <motion.div
          className="bg-slate-100 rounded-lg p-3 text-center text-lg font-semibold"
          key={`${fromCurrency}-${toCurrency}-${amount}-${result}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <span className="text-slate-400">Загрузка…</span>
          ) : error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <>
              {amount} {fromCurrency} ={" "}
              <span className="text-blue-600">
                {result.toFixed(2)} {toCurrency}
              </span>
            </>
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
