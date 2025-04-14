
// Define schema types for Supabase tables
export type FinancialDataEntry = {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  created_at: string;
};

export type BudgetCategory = {
  id: string;
  user_id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type FinancialGoal = {
  id: string;
  user_id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type UserAlert = {
  id: string;
  user_id: string;
  message: string;
  severity: 'warning' | 'info' | 'success' | 'error';
  read: boolean;
  created_at: string;
};

export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  monthly_income?: number;
  savings_goal_percent?: number;
  theme_preference?: 'light' | 'dark';
  created_at: string;
  updated_at: string;
};

export type EducationalResource = {
  id: string;
  title: string;
  description: string;
  content_type: 'article' | 'video' | 'course' | 'ebook';
  url: string;
  thumbnail_url?: string;
  tags: string[];
  created_at: string;
};

export type UserAccount = {
  id: string;
  user_id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit' | 'loan';
  balance: number;
  institution: string;
  last_updated: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string;
  amount: number;
  date: string;
  description: string;
  merchant?: string;
  is_recurring: boolean;
  created_at: string;
};
