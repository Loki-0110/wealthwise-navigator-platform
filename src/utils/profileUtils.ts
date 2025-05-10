
import { UserProfile } from "@/types/supabase.types";

/**
 * Check if a user profile is sufficiently completed with required financial information
 */
export const isProfileComplete = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  
  // Required fields to consider a profile "complete" for financial insights
  const requiredFields = [
    !!profile.monthly_income,
    !!profile.savings_goal_percent,
    !!profile.employment_status,
    !!profile.expense_breakdown,
    !!profile.risk_tolerance
  ];
  
  // Calculate the percentage of completed fields
  const completedPercentage = requiredFields.filter(Boolean).length / requiredFields.length;
  
  // Profile is considered complete if at least 80% of required fields are present
  return completedPercentage >= 0.8;
};

/**
 * Get a human-readable profile completion status message
 */
export const getProfileCompletionMessage = (profile: UserProfile | null): string => {
  if (!profile) return "Please complete your profile to get personalized insights";
  
  if (!profile.monthly_income) return "Add your monthly income to unlock personalized budgeting";
  if (!profile.savings_goal_percent) return "Set your savings goal to track financial progress";
  if (!profile.employment_status) return "Update your employment status for tailored advice";
  if (!profile.expense_breakdown) return "Add expense breakdown to optimize your budget";
  if (!profile.risk_tolerance) return "Set your risk tolerance for investment recommendations";
  
  return "Your profile is complete! Enjoy personalized financial insights.";
};
