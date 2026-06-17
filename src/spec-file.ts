import { getDatabyCrawlId } from "./crawler";
import { askLlm } from "./lllm-client";



export async function generateSpecFile(crawlId : string,  path: string = `./generate/spec_${Date.now()}.json`) {

    
    const payload = await getDatabyCrawlId(crawlId); 
    
    if(payload.data == null ) {
        console.log("No crawled data to create audit report"); 
        return; 
    }


    const PROMPT = `
    
    
    
    
    
    
    `

    
}