// gemini-2.5-pro

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { SpecFileSchema } from "./types";

const ai = new GoogleGenAI({});

export async function askLlm(prompt? : string) {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-pro",
		contents: prompt || "Explain how AI works in a few words",
		config: {
			responseSchema: {
				text: {
					mimeType: "application/json",
					schema: zodToJsonSchema(SpecFileSchema),
				},
			},
		},
	}); 

	console.log(response.text);
}

askLlm();
