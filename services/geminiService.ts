
import { GoogleGenAI, Type } from "@google/genai";
import { ActivityAnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeActivity = async (goal: string, context: string): Promise<ActivityAnalysisResponse> => {
  const prompt = `You are an expert Occupational Therapist and Activity Analysis Specialist. 
  The clinician provides a Therapeutic Goal and Patient Context. 
  Generate three distinct levels of intervention: DOWNGRADE, TARGET, and UPGRADE.
  
  Therapeutic Goal: ${goal}
  Patient Context: ${context}
  
  Requirements:
  1. DOWNGRADE: Focused on preparatory tasks, smaller components, or adaptive equipment to build confidence.
  2. TARGET: The 'Just Right' challenge matching functional level and interests.
  3. UPGRADE: Advanced challenge with increased complexity, resistance, or dual-tasking.
  
  Be specific with materials (e.g., '1lb wrist weight'). 
  Explain the Clinical Rationale for each.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goalSummary: { type: Type.STRING },
          interventions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                clinicalRationale: { type: Type.STRING },
                gradingType: { type: Type.STRING, description: "Must be one of DOWNGRADE, TARGET, UPGRADE" }
              },
              required: ["title", "description", "materials", "clinicalRationale", "gradingType"]
            }
          }
        },
        required: ["goalSummary", "interventions"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as ActivityAnalysisResponse;
};
