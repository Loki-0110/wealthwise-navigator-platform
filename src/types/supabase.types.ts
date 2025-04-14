
// Define schema types for Supabase tables
export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url?: string | null;
  monthly_income?: number | null;
  savings_goal_percent?: number | null;
  theme_preference?: 'light' | 'dark' | null;
  created_at: string;
  updated_at: string | null;
};

export type BudgetCategory = {
  id: string;
  user_id: string;
  name: string;
  monthly_limit: number;
  color: string | null;
  icon: string | null;
  created_at: string | null;
};

export type FinancialGoal = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_amount: number;
  current_amount: number | null;
  target_date: string | null;
  category: string;
  completed: boolean | null;
  priority: number | null;
  created_at: string | null;
};

export type UserAlert = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  read: boolean | null;
  related_entity_id: string | null;
  related_entity_type: string | null;
  created_at: string | null;
};

export type EducationalResource = {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[] | null;
  thumbnail_url: string | null;
  published: boolean | null;
  author: string | null;
  created_at: string | null;
};

export type UserAccount = {
  id: string;
  user_id: string;
  name: string;
  account_type: string;
  balance: number;
  institution: string | null;
  is_credit: boolean | null;
  last_updated: string | null;
  created_at: string | null;
};

export type Transaction = {
  id: string;
  user_id: string;
  account_id: string | null;
  category_id: string | null;
  amount: number;
  description: string;
  transaction_date: string;
  transaction_type: 'income' | 'expense';
  created_at: string | null;
};
