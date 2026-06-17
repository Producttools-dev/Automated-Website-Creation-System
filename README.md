# 01_firecrawl_spec

Scrapes websites using the Firecrawl API and generates structured analysis specs via an LLM.

## Setup

```bash
bun install
```

Requires `FIRECRAWL_API_KEY` and `GOOGLE_API_KEY` environment variables.

## Run

```bash
bun run index.ts
```

## Files

**`index.ts`** — Entry point. Calls `crawler()` or `generateSpecFiles()` with a target URL or crawl ID.

**`src/crawler.ts`** — Starts a Firecrawl crawl job (up to 15 pages), polls until completion, writes raw results to `<id>_<expiresAt>_crawled.json`. Also exports `getDatabyCrawlId()` to fetch results by ID.

**`src/spec-file.ts`** — Takes a crawl ID, fetches the crawled pages, builds a detailed prompt for each page, calls the LLM, and writes the resulting spec JSON to `spec_file/`.

**`src/llm-client.ts`** — Thin wrapper around Google Gemini (`gemini-2.5-flash`). Sends a prompt and returns a parsed JSON response structured against `SpecFileSchema`.

**`src/types.ts`** — Zod schemas for the two core data shapes: `WebSiteContentSchema` (raw scraped page data) and `SpecFileSchema` (structured analysis output with business info, page specs, UI/SEO feedback, and sitemap suggestions).

**`src/utils.ts`** — Utility helpers.
