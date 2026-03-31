import { GoogleGenAI, Type } from "@google/genai";
import { ScopeAnalysisResult, AnalysisResult } from "../types";

// Initialize the API client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeScopeChange = async (description: string): Promise<ScopeAnalysisResult> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.floor(Math.random() * 40) + 60,
          impactDays: Math.floor(Math.random() * 10) + 2,
          reasoning: "Mock analysis: This change affects core architectural components and was introduced late in the sprint."
        });
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following software scope change request and estimate its "Chaos Score" (0-100, where 100 is maximum disruption) and estimated delay in days.
      
      Change Request: "${description}"
      
      Provide a brief reasoning.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Chaos score from 0 to 100" },
            reasoning: { type: Type.STRING, description: "Brief explanation of the impact" },
            impactDays: { type: Type.INTEGER, description: "Estimated delay in days" }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(text) as ScopeAnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      score: 85,
      reasoning: "Failed to analyze with AI. Defaulting to high risk due to unknown parameters.",
      impactDays: 5
    };
  }
};

export const analyzeTransaction = async (merchant: string, amount: number): Promise<AnalysisResult> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          riskScore: amount > 100 ? 75 : 20,
          category: "Shopping",
          advice: "Mock analysis: Spending seems reasonable but verify against budget."
        });
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this transaction: Merchant "${merchant}", Amount $${amount}. Determine a risk score (0-100) for impulsive/unnecessary spending, categorize it, and provide brief advice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.INTEGER, description: "Risk score 0-100" },
            category: { type: Type.STRING, description: "Transaction category" },
            advice: { type: Type.STRING, description: "Brief financial advice" }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      riskScore: 0,
      category: "Error",
      advice: "Failed to analyze transaction."
    };
  }
};