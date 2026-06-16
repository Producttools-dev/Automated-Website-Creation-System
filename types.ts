import z, { string } from 'zod'; 





export const WebSiteContentSchema = z.object({ 
    markdown : z.string().describe("Contains the full single webpage in markdown format"), 
    images : z.array(z.string()) 
})



// spec added
export const SpecFileSchema = z.object({ 

    web_data : WebSiteContentSchema, 

    
    
})