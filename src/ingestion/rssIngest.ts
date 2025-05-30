import { stdin as input, stdout as output } from "node:process";
import readline from "readline/promises";
import Parser from "rss-parser";
import { llmFinancialClassifier } from "../classification/financialClassifier.ts";
import { embedAndStoreNews } from "../embedding/embedAndStore.ts";
import { tagTickers } from "../tagging/tickerTagger.ts";

const rssFeeds = [
  "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^IXIC&region=US&lang=en-US", // Nasdaq news
  "https://www.cnbc.com/id/100003114/device/rss/rss.html", // CNBC top news
  // Add more feeds as needed
];

export type NormalizedNews = {
  title: string;
  content: string;
  link: string;
  pubDate: string;
  source: string;
};

async function fetchAndNormalizeRSS() {
  const parser = new Parser();
  let allNews: NormalizedNews[] = [];

  for (const feedUrl of rssFeeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const source = feed.title || feedUrl;
      const items = (feed.items || []).map((item) => ({
        title: item.title || "",
        content: item.contentSnippet || item.content || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        source,
      }));
      allNews = allNews.concat(items);
    } catch (err) {
      console.error(`Failed to fetch ${feedUrl}:`, err);
    }
  }

  return allNews;
}

// Run if called directly (ESM compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAndNormalizeRSS().then(async (news) => {
    // LLM-based classification example
    const classified: NormalizedNews[] = [];
    for (const item of news.slice(0, 10)) {
      // Limit for demo/cost
      const isFinancial = await llmFinancialClassifier(item);
      if (isFinancial) classified.push(item);
    }
    // Tag tickers in each classified news item
    const tagged = classified.map(tagTickers);
    console.log(
      "LLM-classified & Ticker-tagged Financial News:",
      tagged.slice(0, 5)
    );

    // Embedding and vector store example
    const vectorStore = await embedAndStoreNews(tagged);
    console.log(
      `Embedded and stored ${tagged.length} news articles in vector store.`
    );

    // CLI user input for semantic search
    const rl = readline.createInterface({ input, output });
    const query = await rl.question("Enter your news search query: ");
    rl.close();
    const results = await vectorStore.similaritySearch(query, 3);
    console.log(`\nTop 3 results for query: '${query}'`);
    for (const doc of results) {
      console.log(
        `- ${doc.metadata.source}: ${
          doc.metadata.link
        }\n  ${doc.pageContent.slice(0, 100)}...`
      );
    }
  });
}
