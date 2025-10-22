import { ChangeEvent } from "react";
import type { Currency } from "../utils/rates";

interface CurrencyInputProps {
  label: string;
  amount: number;
  currency: Currency;
  onAmountChange: (value: number) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export default function CurrencyInput({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-slate-600">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onAmountChange(parseFloat(e.target.value) || 0)
          }
          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as Currency)}
          className="p-2 border border-slate-300 rounded-lg bg-white"
        >
          {Object.keys({
            USD: 1,
            EUR: 1,
            GBP: 1,
            JPY: 1,
            CAD: 1,
            AUD: 1,
          }).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
