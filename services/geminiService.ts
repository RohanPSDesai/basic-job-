import { GoogleGenAI, Type } from "@google/genai";
import { Roadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCareerRoadmap = async (targetRole: string): Promise<Roadmap | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a career roadmap for a "${targetRole}". Break it down into 4-6 sequential steps for someone starting today.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            progress: { type: Type.NUMBER, description: "Set to 0 initially" },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["pending"] },
                  resources: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "List of 2-3 short topics or technologies to learn"
                  }
                },
                required: ["id", "title", "description", "status", "resources"]
              }
            }
          },
          required: ["role", "steps", "progress"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as Roadmap;
  } catch (error) {
    console.error("Failed to generate roadmap:", error);
    return null;
  }
};

export const generateJobDescription = async (title: string, skills: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a professional, concise job description (max 150 words) for a "${title}" requiring these skills: ${skills.join(", ")}. Use markdown formatting.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Failed to generate JD:", error);
    return "Error generating description. Please try again.";
  }
};
