export const rates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.8,
  JPY: 150,
  CAD: 1.36,
  AUD: 1.52,
} as const;

export type Currency = keyof typeof rates;
