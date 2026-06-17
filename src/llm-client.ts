// gemini-2.5-pro

import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { SpecFileSchema, WebPageSpecSchema } from "./types";

const ai = new GoogleGenAI({});

export async function askLlm(prompt?: string) {
	try {
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt || "Explain how AI works in a few words",
			config: {
				responseMimeType:"application/json",
				responseSchema: zodToJsonSchema(WebPageSpecSchema),
				
			},
		});
	
		// console.log(response.text);
	
		return JSON.parse(response.text!);
	} catch (error) {
		console.log('Some Error Occured', error)
		process.exit()
	}
}

// askLlm();
