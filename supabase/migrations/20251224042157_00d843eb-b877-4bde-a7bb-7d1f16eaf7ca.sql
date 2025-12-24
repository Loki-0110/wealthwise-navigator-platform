-- Fix mutable search_path warnings by pinning to public

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Restrict owner-scoped account policies to authenticated users only
ALTER POLICY "Users can view own accounts" ON public.accounts TO authenticated;
ALTER POLICY "Users can insert own accounts" ON public.accounts TO authenticated;
ALTER POLICY "Users can update own accounts" ON public.accounts TO authenticated;
ALTER POLICY "Users can delete own accounts" ON public.accounts TO authenticated;