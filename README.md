# LangChain RAG App

This project is a Retrieval-Augmented Generation (RAG) application built with [LangChain](https://js.langchain.com/) and OpenAI. It demonstrates how to load, chunk, embed, and query web content using a memory-based vector store.

## News RAG Pipeline (Planned & MVP)
This project implements a News RAG pipeline as described in the PRD:
- Ingest news feeds from various sources (RSS)
- Classify/filter news for financial data (LLM-based, especially Nasdaq)
- Tag news with ticker symbols
- Embed only relevant news into a vector store
- **Interactive CLI:** Retrieve relevant news on user request via semantic search

### Software Principles & Best Practices
- **SOLID principles:**
  - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- Modular, maintainable, and testable code
- Clear naming conventions and documentation
- Prefer composition over inheritance
- Graceful error handling
- Extensible for future data sources or requirements

## Pipeline Overview (index.ts)
This project demonstrates the following steps:

- Loading data with a Document Loader
- Chunking the indexed data with a Text Splitter to make it more easily usable by a model
- Embedding the data and storing the data in a vectorstore
- Retrieving the previously stored chunks in response to incoming questions
- Generating an answer using the retrieved chunks as context

## Conversational RAG Pipeline (conversational-rag.ts)
This script extends the RAG pipeline with:

- **Conversational message history:** Maintains and streams conversation turns.
- **Tool-augmented retrieval:** Uses tools and tool calls for retrieval steps.
- **Streaming responses:** Outputs each step of the conversation as it happens.
- **Agent-based reasoning:** Demonstrates an agent that can perform multi-step retrieval and reasoning.
- **Memory checkpointing:** Supports thread-based message history with a memory saver.

**To run the conversational RAG example:**
```sh
pnpm start:conversational-rag
# or
npm run start:conversational-rag
```

## Features
- Loads and chunks web content using Cheerio
- Embeds documents with OpenAI embeddings
- Stores and queries vectors using an in-memory vector store (MemoryVectorStore)
- Uses OpenAI's GPT models for question answering
- Example of query analysis and structured output
- Conversational and agent-based RAG pipelines
- **Interactive CLI for semantic news search**

## Requirements
- Node.js v18 or later (tested on v23)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- OpenAI API key
- LandSmith API credentials (if using LandSmith features)

## Setup
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd langchain-rag-app
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the project root:
     ```env
     OPENAI_API_KEY=sk-...
     LANDSMITH_API_KEY=your_landsmith_api_key
     LANDSMITH_API_URL=https://api.landsmith.ai
     # Add any other required LandSmith variables here
     ```
   - Replace `sk-...` and `your_landsmith_api_key` with your actual API keys.
   - The `LANDSMITH_API_URL` should point to the correct LandSmith endpoint if different from above.

## Usage
- **Run the main RAG app:**
  ```sh
  pnpm start
  # or
  npm run start
  ```
- **Run the vector store example:**
  ```sh
  pnpm start:vector-store
  # or
  npm run start:vector-store
  ```
- **Run the conversational RAG example:**
  ```sh
  pnpm start:conversational-rag
  # or
  npm run start:conversational-rag
  ```
- **Run the News RAG CLI (MVP):**
  ```sh
  npx ts-node src/ingestion/rssIngest.ts
  # or, if you have a script:
  pnpm start:news-rag
  ```
  You will be prompted to enter a search query. The system will return the top 3 most relevant news articles using semantic search over the latest financial news.

## CLI Semantic Search Example
```
$ npx ts-node src/ingestion/rssIngest.ts
...
Embedded and stored 8 news articles in vector store.
Enter your news search query: tesla

Top 3 results for query: 'tesla'
- Yahoo! Finance: ^IXIC News: https://finance.yahoo.com/video/nvidia-tariffs-volatility-defense-stocks-211500093.html?.tsrc=rss
  Nvidia & tariffs, volatility, defense stocks: Market Takeaways US stocks (^DJI, ^IXIC, ^GSPC) manage...
...
```

## Troubleshooting
- **faiss-node errors:**
  - This project uses `MemoryVectorStore` (pure JS, no native dependencies). If you see errors about `faiss-node`, ensure you are not using `FaissStore` in your code. Remove `faiss-node` from dependencies if not needed.
- **OPENAI_API_KEY missing:**
  - Make sure your `.env` file is present and contains a valid API key.
- **LANDSMITH_API_KEY or LANDSMITH_API_URL missing:**
  - Make sure your `.env` file contains the correct LandSmith credentials if you are using LandSmith features.
- **TypeScript errors about `pageContent`:**
  - Ensure you import `Document` from `@langchain/core/documents`.

## References
- [LangChain JS Documentation](https://js.langchain.com/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [LandSmith API Documentation](https://landsmit.ai/docs)  # (Update with correct link if needed)

## Cost Estimation (OpenAI API)

**Assumptions:**
- 100 news articles processed per day
- Each article ~500 tokens
- All 100 articles classified (LLM), ~50 embedded
- LLM: gpt-4o-mini ($0.15 per 1M input tokens, $0.60 per 1M output tokens)
- Embedding: text-embedding-3-large ($0.13 per 1M tokens)

| Period   | LLM Classification | Embedding | **Total** |
|----------|--------------------|-----------|-----------|
| Daily    | $0.025             | $0.003    | $0.03     |
| Weekly   | $0.175             | $0.02     | $0.20     |
| Monthly  | $0.75              | $0.10     | $0.85     |

- If you embed all 100 articles, embedding cost doubles (still very low)
- If you use gpt-4o or gpt-4, LLM cost increases by 10x-100x. gpt-4o-mini is the most affordable option for most use cases.
- For more/longer articles, scale token count accordingly
- Retrieval costs are negligible

**Conclusion:**
- The MVP pipeline is extremely affordable (less than $0.05/month for 100 articles/day with gpt-4o-mini)
- For further savings, batch articles or use keyword filtering before LLM calls

---

Feel free to modify and extend this project for your own RAG experiments! 