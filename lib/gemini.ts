
import { GoogleGenAI, Type } from "@google/genai";

export async function smartTranslate(text: string, fromLang: string, toLang: string, scenario: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate and rewrite this message for a ${scenario} situation. 
    Source Language: ${fromLang}
    Target Language: ${toLang}
    Message: "${text}"
    
    The goal is to make it extremely polite, clear, and culturally appropriate for an official in ${toLang}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          translatedText: { type: Type.STRING },
          originalRefined: { type: Type.STRING, description: "The original message but cleaned up for clarity" },
          pronunciation: { type: Type.STRING, description: "A simple phonetic guide for the user to say it" }
        },
        required: ["translatedText", "originalRefined"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { translatedText: text, originalRefined: text };
  }
}

export async function translateForVolunteer(text: string, fromLang: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate the following help request into professional English for a volunteer.
    From Language: ${fromLang}
    Request: "${text}"`,
  });
  return response.text;
}
