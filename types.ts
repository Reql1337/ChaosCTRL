export interface ChangeRequest {
    id: string;
    description: string;
    score: number;
    impactDays: number;
    source: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
    reasoning?: string;
    archived?: boolean;
}

export interface ScopeAnalysisResult {
    score: number;
    impactDays: number;
    reasoning: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
}

export interface AnalysisResult {
    riskScore: number;
    category: string;
    advice: string;
}

export interface Transaction {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category?: string;
    riskScore?: number;
}