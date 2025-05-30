import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import type { TickerTaggedNews } from "../tagging/tickerTagger";

// Type for the vector store instance
export type NewsVectorStore = MemoryVectorStore;

/**
 * Embeds and stores ticker-tagged news articles in a MemoryVectorStore.
 * @param news Array of ticker-tagged news articles
 * @returns The MemoryVectorStore instance containing the embeddings and metadata
 */
export async function embedAndStoreNews(
  news: TickerTaggedNews[]
): Promise<NewsVectorStore> {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const vectorStore = new MemoryVectorStore(embeddings);

  // Prepare documents for vector store
  const docs = news.map((item) => ({
    pageContent: `${item.title}\n${item.content}`,
    metadata: {
      link: item.link,
      pubDate: item.pubDate,
      source: item.source,
      tickers: item.tickers,
    },
  }));

  await vectorStore.addDocuments(docs);
  return vectorStore;
}

/**
// Example usage:
import { embedAndStoreNews } from './embedAndStore';
import type { TickerTaggedNews } from '../tagging/tickerTagger';

(async () => {
  const taggedNews: TickerTaggedNews[] = [...]; // Your tagged news array
  const vectorStore = await embedAndStoreNews(taggedNews);
  // Now you can use vectorStore.similaritySearch(...)
})();
*/
