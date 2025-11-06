
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey });

export async function getIdeologyDescription(ideologyName: string): Promise<string> {
  try {
    const prompt = `Provide a concise, neutral, one-paragraph summary of the political ideology "${ideologyName}". Explain its typical stance on the economic axis (left vs right), the authority axis (authoritarian vs libertarian), and the cultural axis (progressive vs traditionalist).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching ideology description from Gemini API:", error);
    if (error instanceof Error) {
        return `Failed to generate description: ${error.message}`;
    }
    return "An unknown error occurred while generating the description. Please check the console for details.";
  }
}
