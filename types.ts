import z, { string } from 'zod'; 





export const WebSiteContentSchema = z.object({ 
    markdown : z.string().describe("Contains the full single webpage in markdown format"), 
    images : z.array(z.string()).describe("contains all the images urls that are present on the webpage"), 
    links : z.array(z.string()).describe("contains all the links that are present on the webpage "), 
    branding: z.any().describe("Contains the whole brand guideline"), 
    metadata: z.any(), 
})



// spec added
export const SpecFileSchema = z.object({ 

    business_name : z.string().describe("contains full name of the business"), 
    business_category : z.string().describe("should point to the category the business is related to"), 
    tagline : z.string().describe("catchy tagline about the business"), 
    summary: z.string().describe("brief summary about the busines in 80 to 150 words").min(80).max(100), 
    sections: z.array(z.string()).describe("it has all the sections that website has or should have related to business"), 
    general_feedback : z.array(z.string()).describe("should contains about the overall feedback of content, sections , ui"), 

    missing_sections : z.array(z.string()).describe("should contain any missing sections if any"),
    ui_issues : z.array(z.string()).describe("should contain information issues related to the ui"),
    ui_improvements: z.array(z.string()).describe("should contain tips about ui improvements to make the website look better"),
    
    suggected_ui_components : z.array(z.string()).describe("Suggested ui component type (e.g. HeroWithCTA, ServiceGrid, TestimonialCarousel)"),
    seo_issues : z.array(z.string()).describe("SEO problems specific to this section "),
    seo_improvement_tips : z.array(z.string()).describe("SEO improvement tips specific to this section "),
    
})


const WebsiteGenSchema = z.union([SpecFileSchema, WebSiteContentSchema]);