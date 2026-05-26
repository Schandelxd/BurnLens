-- =========================================
-- Gauge Supabase Schema Setup
-- =========================================

-- 1. Create Profiles Table (Ties to auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signups and automatically create a profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================

-- 2. Create Audits Table
CREATE TABLE public.audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_size INTEGER NOT NULL,
  monthly_api_spend NUMERIC NOT NULL,
  tool_details JSONB NOT NULL, -- The raw state dump
  gauge_score INTEGER NOT NULL,
  annual_savings NUMERIC NOT NULL,
  recommendations JSONB NOT NULL, -- The generated optimization cards
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on audits
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Audit RLS Policies
CREATE POLICY "Users can view own audits" ON public.audits FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert own audits" ON public.audits FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can delete own audits" ON public.audits FOR DELETE USING (auth.uid() = profile_id);
