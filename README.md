# LangChain RAG App

This project is a Retrieval-Augmented Generation (RAG) application built with [LangChain](https://js.langchain.com/) and OpenAI. It demonstrates how to load, chunk, embed, and query web content using a memory-based vector store.

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
     ```
   - Replace `sk-...` with your actual OpenAI API key.

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
- **TypeScript errors about `pageContent`:**
  - Ensure you import `Document` from `@langchain/core/documents`.

## References
- [LangChain JS Documentation](https://js.langchain.com/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

---

Feel free to modify and extend this project for your own RAG experiments! 