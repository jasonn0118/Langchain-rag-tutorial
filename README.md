# LangChain RAG App

This project is a Retrieval-Augmented Generation (RAG) application built with [LangChain](https://js.langchain.com/) and OpenAI. It demonstrates how to load, chunk, embed, and query web content using a memory-based vector store.

## Pipeline Overview (index.ts)
This project demonstrates the following steps:

- Loading data with a Document Loader
- Chunking the indexed data with a Text Splitter to make it more easily usable by a model
- Embedding the data and storing the data in a vectorstore
- Retrieving the previously stored chunks in response to incoming questions
- Generating an answer using the retrieved chunks as context

## Features
- Loads and chunks web content using Cheerio
- Embeds documents with OpenAI embeddings
- Stores and queries vectors using an in-memory vector store (MemoryVectorStore)
- Uses OpenAI's GPT models for question answering
- Example of query analysis and structured output

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

---

Feel free to modify and extend this project for your own RAG experiments! 