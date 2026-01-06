import { Type } from "@google/genai";

async function callGeminiAPI(payload: any) {
  const response = await fetch("/.netlify/functions/aiProxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function smartTranslate(text: string, fromLang: string, toLang: string, scenario: string) {
  const response = await callGeminiAPI({
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
  const response = await callGeminiAPI({
    model: "gemini-3-flash-preview",
    contents: `Translate the following help request into professional English for a volunteer.
    From Language: ${fromLang}
    Request: "${text}"`,
  });
  return response.text;
}
