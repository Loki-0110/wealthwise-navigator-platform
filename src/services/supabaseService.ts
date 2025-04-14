
import { supabase } from "@/lib/supabase";
import type { 
  UserProfile, 
  BudgetCategory, 
  FinancialGoal, 
  UserAlert, 
  UserAccount,
  Transaction, 
  EducationalResource 
} from "@/types/supabase.types";

// User Profile Services
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }

  return data;
};

export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single();

  if (error) {
    console.error('Error creating user profile:', error);
    return null;
  }

  return data;
};

// Budget Category Services
export const getBudgetCategories = async (userId: string): Promise<BudgetCategory[]> => {
  const { data, error } = await supabase
    .from('budget_categories')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching budget categories:', error);
    return [];
  }

  return data;
};

export const createBudgetCategory = async (category: Omit<BudgetCategory, 'id' | 'created_at'>): Promise<BudgetCategory | null> => {
  const { data, error } = await supabase
    .from('budget_categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating budget category:', error);
    return null;
  }

  return data;
};

// Financial Goal Services
export const getFinancialGoals = async (userId: string): Promise<FinancialGoal[]> => {
  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching financial goals:', error);
    return [];
  }

  return data;
};

export const createFinancialGoal = async (goal: Omit<FinancialGoal, 'id' | 'created_at'>): Promise<FinancialGoal | null> => {
  const { data, error } = await supabase
    .from('financial_goals')
    .insert(goal)
    .select()
    .single();

  if (error) {
    console.error('Error creating financial goal:', error);
    return null;
  }

  return data;
};

// Transaction Services
export const getTransactions = async (userId: string, limit = 50): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('transaction_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  return data;
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  if (error) {
    console.error('Error creating transaction:', error);
    return null;
  }

  return data;
};

// User Alert Services
export const getUserAlerts = async (userId: string): Promise<UserAlert[]> => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user alerts:', error);
    return [];
  }

  return data;
};

export const markAlertAsRead = async (alertId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('alerts')
    .update({ read: true })
    .eq('id', alertId);

  if (error) {
    console.error('Error marking alert as read:', error);
    return false;
  }

  return true;
};

// Educational Resources Services
export const getEducationalResources = async (limit = 10): Promise<EducationalResource[]> => {
  const { data, error } = await supabase
    .from('educational_content')
    .select('*')
    .eq('published', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching educational resources:', error);
    return [];
  }

  return data;
};

// User Accounts Services
export const getUserAccounts = async (userId: string): Promise<UserAccount[]> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user accounts:', error);
    return [];
  }

  return data;
};

export const createUserAccount = async (account: Omit<UserAccount, 'id' | 'created_at' | 'last_updated'>): Promise<UserAccount | null> => {
  const { data, error } = await supabase
    .from('accounts')
    .insert(account)
    .select()
    .single();

  if (error) {
    console.error('Error creating user account:', error);
    return null;
  }

  return data;
};

export const updateAccountBalance = async (accountId: string, balance: number): Promise<boolean> => {
  const { error } = await supabase
    .from('accounts')
    .update({ 
      balance: balance,
      last_updated: new Date().toISOString()
    })
    .eq('id', accountId);

  if (error) {
    console.error('Error updating account balance:', error);
    return false;
  }

  return true;
};
