import { GoogleGenAI } from "@google/genai";

exports.handler = async (event) => {
  try {
    const { model, contents, config } = JSON.parse(event.body || "{}");

    if (!process.env.GEMINI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
        headers: { "Content-Type": "application/json" }
      };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: model || "gemini-3-flash-preview",
      contents,
      config
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.text }),
      headers: { "Content-Type": "application/json" }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
