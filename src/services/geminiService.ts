import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface CompanyAdoption {
  company: string;
  feature: string;
  why: string;
  technology: string;
  impact: string;
  source: string;
}

export interface WeeklyReport {
  executiveSummary: string;
  companies: CompanyAdoption[];
  trends: string[];
  citations: string[];
  date: string;
}

export async function generateWeeklyReport(): Promise<WeeklyReport> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a Junior Research Analyst. Generate a "Weekly AI Adoption Tracker" report for April 29, 2026.
    
    The report should track: "New companies adopting AI in customer service this week."
    
    Rules:
    1. Identify 5 new companies adopting AI in customer service (use realistic recent cases or project future implementations based on current trends in April 2026).
    2. For each company, capture:
       - AI Feature
       - Why it was introduced
       - Technology/provider used
       - Measurable benefits (Business Impact)
       - A plausible source citation (e.g., Press Release, TechCrunch, etc.)
    3. Include an Executive Summary (3-4 lines).
    4. Include 5 Trend Insights.
    5. Return the data in strict JSON format.

    JSON Schema:
    {
      "executiveSummary": "string",
      "date": "string",
      "companies": [
        {
          "company": "string",
          "feature": "string",
          "why": "string",
          "technology": "string",
          "impact": "string",
          "source": "string"
        }
      ],
      "trends": ["string"],
      "citations": ["string"]
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          date: { type: Type.STRING },
          companies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                feature: { type: Type.STRING },
                why: { type: Type.STRING },
                technology: { type: Type.STRING },
                impact: { type: Type.STRING },
                source: { type: Type.STRING },
              },
              required: ["company", "feature", "why", "technology", "impact", "source"],
            },
          },
          trends: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          citations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["executiveSummary", "date", "companies", "trends", "citations"],
      },
    },
  });

  return JSON.parse(response.text);
}
