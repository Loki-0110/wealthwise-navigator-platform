-- Restrict all user-scoped policies to authenticated users only

-- alerts table
ALTER POLICY "Users can view own alerts" ON public.alerts TO authenticated;
ALTER POLICY "Users can update own alerts" ON public.alerts TO authenticated;

-- Add missing DELETE policy for alerts
CREATE POLICY "Users can delete own alerts" 
  ON public.alerts FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- budget_categories table
ALTER POLICY "Users can view own budget categories" ON public.budget_categories TO authenticated;
ALTER POLICY "Users can insert own budget categories" ON public.budget_categories TO authenticated;
ALTER POLICY "Users can update own budget categories" ON public.budget_categories TO authenticated;
ALTER POLICY "Users can delete own budget categories" ON public.budget_categories TO authenticated;

-- financial_goals table
ALTER POLICY "Users can view own financial goals" ON public.financial_goals TO authenticated;
ALTER POLICY "Users can insert own financial goals" ON public.financial_goals TO authenticated;
ALTER POLICY "Users can update own financial goals" ON public.financial_goals TO authenticated;
ALTER POLICY "Users can delete own financial goals" ON public.financial_goals TO authenticated;

-- transactions table
ALTER POLICY "Users can view own transactions" ON public.transactions TO authenticated;
ALTER POLICY "Users can insert own transactions" ON public.transactions TO authenticated;
ALTER POLICY "Users can update own transactions" ON public.transactions TO authenticated;
ALTER POLICY "Users can delete own transactions" ON public.transactions TO authenticated;

-- user_profiles table
ALTER POLICY "Users can view own profile" ON public.user_profiles TO authenticated;
ALTER POLICY "Users can insert own profile" ON public.user_profiles TO authenticated;
ALTER POLICY "Users can update own profile" ON public.user_profiles TO authenticated;

-- educational_content - public viewing is intentional, restrict to authenticated for better security
ALTER POLICY "Anyone can view published educational content" ON public.educational_content TO authenticated, anon;