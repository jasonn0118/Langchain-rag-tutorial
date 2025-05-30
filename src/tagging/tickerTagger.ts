import type { NormalizedNews } from "../ingestion/rssIngest";

export type TickerTaggedNews = NormalizedNews & { tickers: string[] };

// Simple regex for all-caps words (2-5 letters, e.g., AAPL, MSFT, NVDA)
const TICKER_REGEX = /\b[A-Z]{2,5}\b/g;

export function tagTickers(news: NormalizedNews): TickerTaggedNews {
  const text = `${news.title} ${news.content}`;
  // Find all unique tickers
  const matches = text.match(TICKER_REGEX) || [];
  const tickers = Array.from(new Set(matches));
  return { ...news, tickers };
}
