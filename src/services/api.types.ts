export interface Currency {
  code: string;
  currency: string;
  mid: number;
  effectiveDay?: string;
}

export interface CurrencyRatesResponse {
  rates?: Currency[];
  date?: string;
  info?: string;
}

export interface CurrencyRate {
  info?: string;
  rates?: Currency[];
}
