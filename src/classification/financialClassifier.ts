import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import type { NormalizedNews } from "../ingestion/rssIngest";
dotenv.config();

// Simple keyword-based filter for MVP
const FINANCIAL_KEYWORDS = [
  "nasdaq",
  "stock",
  "market",
  "earnings",
  "ipo",
  "shares",
  "index",
  "equity",
  "finance",
  "trading",
  "investor",
  "S&P",
  "Dow",
  "Wall Street",
  "SEC",
  "ETF",
  "dividend",
  "futures",
  "bond",
  "analyst",
  "portfolio",
  "bull",
  "bear",
  "volatility",
  "ticker",
  "exchange",
  "quarter",
  "profit",
  "loss",
  "guidance",
  "revenue",
  "capital",
  "valuation",
  "merger",
  "acquisition",
  "buyback",
  "split",
  "SEC",
  "regulation",
  "listing",
  "delisting",
  "Nasdaq",
  "NASDAQ",
];

export function filterFinancialNews(news: NormalizedNews[]): NormalizedNews[] {
  return news.filter((item) => {
    const text = `${item.title} ${item.content}`.toLowerCase();
    return FINANCIAL_KEYWORDS.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );
  });
}

// LLM-based classifier (MVP, binary yes/no)
const llm = new ChatOpenAI({
  model: "gpt-4o-mini", // switched from gpt-3.5-turbo for lower cost and good performance
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export async function llmFinancialClassifier(
  news: NormalizedNews
): Promise<boolean> {
  const prompt = `Is the following news article related to financial markets, stocks, or Nasdaq? Answer only "yes" or "no".\n\nTitle: ${news.title}\nContent: ${news.content}`;
  const response = await llm.invoke(prompt);
  const answer =
    typeof response.content === "string" ? response.content.toLowerCase() : "";
  return answer.includes("yes");
}
