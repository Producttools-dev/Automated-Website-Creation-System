import { writeFile } from "node:fs/promises";
import { getDatabyCrawlId } from "./crawler";
import { askLlm } from "./llm-client";

export async function generateSpecFiles(
	crawlId: string,
	path: string = `./generate/spec_${Date.now()}.json`,
) {
	let count = 0;
	console.log(" ");

	console.log(`Fetching Crawled Payload for id : ${crawlId}`);
	const payload = await getDatabyCrawlId(crawlId);
	console.log(`Crawled Payload Fetched..`);

	if (payload.data == null) {
		console.log("No crawled data to create audit report");
		return;
	}

	const getPrompt = (
		markdown: string,
		images: string,
		link: string,
		metadata: string,
		branding: string,
	) => `
        
        You are a website analyst. Given the full content of a webpage, analyze it thoroughly and return a structured specification.

        ## Input
        You will receive:
        - **markdown**: Full webpage content in markdown format
        - **images**: Array of image URLs present on the page
        - **links**: Array of links present on the page
        - **branding**: Brand guidelines for the website
        - **metadata**: Page metadata

        ## Output Requirements
        Return a JSON object strictly matching this structure:

        {
        "pageName": "slug-style name (e.g. contact-us, home, gallery)",
        "pageUrl": "original page URL from the content",
        "summary": "80–150 word summary of the page's purpose and content",
        "sections": ["list of all sections found on the page"],
        "general_feedback": ["overall feedback on content quality, section structure, and UI"],
        "missing_sections": ["sections typically expected for this page type that are absent"],
        "ui_issues": ["current UI/UX problems observed"],
        "ui_improvements": ["actionable tips to improve visual design and usability"],
        "suggested_ui_components": ["component types suited for this page, e.g. HeroWithCTA, ServiceGrid, TestimonialCarousel"],
        "seo_issues": ["SEO problems found on this page"],
        "seo_improvement_tips": ["specific SEO fixes and enhancements for this page"]
        }

        ## Rules
        - Be specific and actionable — avoid vague feedback
        - Base all findings strictly on the provided content
        - 'summary' must be between 80 and 150 words
        - All array fields should have at least 1 entry if issues/items exist
        - Return ONLY valid JSON, no markdown fences, no explanation
            
        
        ## MarkDown 
        ${markdown} 

        ## Images Links 
        ${images} 

        ##Branding 
        ${branding} 

        ##Links 
        ${link} 

        ## Metadata 
        ${metadata}
            
    
    
    `;


	// for (const [index, item] of payload.data.entries()) {
    //     if (count >= 5) break;      
	
		const index = 1; 
		const item = payload.data[0]!

        console.log(`For page url : ${index} : ${item.metadata?.sourceURL}`);
        const PROMPT = getPrompt(
            item.markdown!,
            JSON.stringify(item.images),
            JSON.stringify(item.links),
            JSON.stringify(item.metadata),
            JSON.stringify(item.branding),
        );

        console.log(` Brewing Prompt for : ${item.metadata?.sourceURL}`);
        console.log(` Prompt length : ${PROMPT.length}`);

        const sanitized = item.metadata?.sourceURL?.replace(/[^a-z0-9]/gi, "_") ?? `page_${index}`;  
        const filename = `${sanitized}_crawled.json`;

        console.log(`Asking for Audit...`);
        const spec = await askLlm(PROMPT);
        count++;

        console.log(`Spec file generated for url : ${item.metadata?.sourceURL}`);
        console.log(`Writing to file...`);

        await writeFile(`./spec_file/${filename}`, JSON.stringify(spec || { data: null }));  

        console.log(`file written : filename= ${filename}`);
        console.log(" ");
        console.log("---------------");
    // }
}

export async function generateSpecFile(crawlId: string) {}
