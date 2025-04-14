
import { supabase } from "@/lib/supabase";
import { 
  FinancialDataEntry, 
  BudgetCategory, 
  FinancialGoal, 
  UserAlert,
  UserProfile,
  EducationalResource,
  UserAccount,
  Transaction
} from "@/types/supabase.types";
import { toast } from "sonner";

/**
 * User Profile Services
 */
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data as UserProfile;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId);
      
    if (error) throw error;
    toast.success("Profile updated successfully");
    return true;
  } catch (error: any) {
    console.error('Error updating user profile:', error.message);
    toast.error(error.message);
    return false;
  }
};

/**
 * Budget Category Services
 */
export const getBudgetCategories = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data as BudgetCategory[];
  } catch (error: any) {
    console.error('Error fetching budget categories:', error.message);
    return [];
  }
};

export const updateBudgetCategory = async (categoryId: string, updates: Partial<BudgetCategory>) => {
  try {
    const { error } = await supabase
      .from('budget_categories')
      .update(updates)
      .eq('id', categoryId);
      
    if (error) throw error;
    toast.success("Budget category updated");
    return true;
  } catch (error: any) {
    console.error('Error updating budget category:', error.message);
    toast.error(error.message);
    return false;
  }
};

export const createBudgetCategory = async (category: Omit<BudgetCategory, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .insert(category)
      .select()
      .single();
      
    if (error) throw error;
    toast.success("Budget category created");
    return data as BudgetCategory;
  } catch (error: any) {
    console.error('Error creating budget category:', error.message);
    toast.error(error.message);
    return null;
  }
};

/**
 * Financial Goals Services
 */
export const getFinancialGoals = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('financial_goals')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data as FinancialGoal[];
  } catch (error: any) {
    console.error('Error fetching financial goals:', error.message);
    return [];
  }
};

export const updateFinancialGoal = async (goalId: string, updates: Partial<FinancialGoal>) => {
  try {
    const { error } = await supabase
      .from('financial_goals')
      .update(updates)
      .eq('id', goalId);
      
    if (error) throw error;
    toast.success("Goal updated successfully");
    return true;
  } catch (error: any) {
    console.error('Error updating financial goal:', error.message);
    toast.error(error.message);
    return false;
  }
};

/**
 * Transactions Services
 */
export const getTransactions = async (userId: string, limit = 50) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data as Transaction[];
  } catch (error: any) {
    console.error('Error fetching transactions:', error.message);
    return [];
  }
};

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
      
    if (error) throw error;
    toast.success("Transaction recorded");
    return data as Transaction;
  } catch (error: any) {
    console.error('Error adding transaction:', error.message);
    toast.error(error.message);
    return null;
  }
};

/**
 * User Alerts Services
 */
export const getUserAlerts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_alerts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as UserAlert[];
  } catch (error: any) {
    console.error('Error fetching user alerts:', error.message);
    return [];
  }
};

export const dismissUserAlert = async (alertId: string) => {
  try {
    const { error } = await supabase
      .from('user_alerts')
      .update({ read: true })
      .eq('id', alertId);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error('Error dismissing alert:', error.message);
    return false;
  }
};

/**
 * Educational Resources Services
 */
export const getEducationalResources = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('educational_resources')
      .select('*')
      .limit(limit);
      
    if (error) throw error;
    return data as EducationalResource[];
  } catch (error: any) {
    console.error('Error fetching educational resources:', error.message);
    return [];
  }
};

/**
 * User Accounts Services
 */
export const getUserAccounts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data as UserAccount[];
  } catch (error: any) {
    console.error('Error fetching user accounts:', error.message);
    return [];
  }
};
