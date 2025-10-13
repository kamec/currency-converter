import { motion } from "framer-motion";

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold">💱 Currency Converter</h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select className="border border-slate-300 rounded-lg p-3 bg-white">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>

          <div className="text-center text-slate-500">⇅</div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Result"
              className="w-full border border-slate-300 rounded-lg p-3 bg-slate-100"
              readOnly
            />
            <select className="border border-slate-300 rounded-lg p-3 bg-white">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
