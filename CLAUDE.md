# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # install dependencies
bun run index.ts     # run the crawler
```

TypeScript type-checking only (no emit):
```bash
bunx tsc --noEmit
```

## Architecture

This is a Bun + TypeScript project that scrapes websites using the [Firecrawl](https://firecrawl.dev) API and produces structured analysis specs.

**Data flow:**
1. `index.ts` — entry point; calls `crawler()` with a target URL
2. `crawler.ts` — initiates a Firecrawl crawl job, polls until completion, writes raw crawl output to a JSON file named `<id>_<expiresAt>_crawled.json`
3. `types.ts` — Zod schemas defining the two core data shapes:
   - `WebSiteContentSchema` — raw scraped page content (markdown, images, links, branding, metadata)
   - `SpecFileSchema` — structured website analysis spec (business info, UI feedback, SEO issues, sitemap suggestions)
   - `WebsiteGenSchema` — union of both, for use as an LLM extraction target

**Key dependency:** `FIRECRAWL_API_KEY` environment variable must be set before running. The Firecrawl client reads it from `process.env.FIRECRAWL_API_KEY`.

**Crawl configuration** (in `crawler.ts`): scrapes up to 15 pages per domain, requests markdown, screenshot, JSON extraction, branding, links, images, and summary formats. Results cached for 48 hours (`maxAge: 172800000`).
