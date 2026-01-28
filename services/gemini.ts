
import { GoogleGenAI } from "@google/genai";

export async function getSustainabilityInsights(bottlesCount: number) {
  try {
    // Correctly initialize with process.env.API_KEY directly as per @google/genai guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Calculate the environmental impact of collecting ${bottlesCount} plastic bottles. 
      Provide 3 short bullet points: 
      1. CO2 saved.
      2. Oil saved in production.
      3. A fun comparison (e.g., energy to power a laptop).
      Keep it brief and professional.`,
    });
    
    // Using the text property directly instead of text() method
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate insights at this time. Please check your connectivity or API configuration.";
  }
}