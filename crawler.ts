import { Firecrawl } from 'firecrawl';
import { writeFile } from 'node:fs/promises';

const app = new Firecrawl({ apiKey : process.env.FIRECRAWL_API_KEY!});


const scrapeOptions = {
  onlyMainContent: true,
  maxAge: 172800000,
  parsers: [{ type: "pdf" as const }],
  formats: [
    { type: "markdown" as const },
    { type: "screenshot" as const, fullPage: true },
    {
      type: "json" as const,
      schema: {
        type: "object" as const,
        required: [] as string[],
        properties: {
          company_name: { type: "string" as const },
          company_description: { type: "string" as const },
        },
      },
    },
    { type: "branding" as const },
    { type: "links" as const },
    { type: "images" as const },
    { type: "summary" as const },
  ],
}


export async function crawler(baseUrl : string ) {
    const {id } = await app.startCrawl(baseUrl, {
    limit: 15,
    scrapeOptions

  });

  console.log(`Crawler ID Generated : ${id}`)

  let status; 

  while(true) {
    status = await app.getCrawlStatus(id);
    console.log(`[SCRAPING] : ${status.completed} / ${status.total} pages scraped  `  )

    if(status.status === "completed") break; 

    await new Promise((resolve)=>{ setTimeout(resolve,1000) })

  }

  const filename =
  `${id}_${status.expiresAt!.replace(/:/g, '-')}_crawled.json`;


  await writeFile(filename, JSON.stringify(status.data))

  return { 
    ...status.data, 
  }

  ;
}