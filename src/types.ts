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
