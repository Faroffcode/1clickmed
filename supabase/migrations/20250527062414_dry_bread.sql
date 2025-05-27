-- -------------------------------------------------------------------------------------------------
-- Extensions
-- -------------------------------------------------------------------------------------------------
-- Enable a function to automatically update 'updated_at' timestamps
CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

-- -------------------------------------------------------------------------------------------------
-- Medical Entities Table
-- Stores information about doctors, hospitals, labs, and medical shops.
-- -------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "public"."medical_entities" (
    "id"        UUID DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "name"      TEXT NOT NULL,
    "category"  TEXT NOT NULL CHECK (category IN ('Doctor', 'Hospital', 'Pathology Lab', 'Medical Shop')),
    "address"   TEXT NOT NULL,
    "city"      TEXT NOT NULL,
    "area"      TEXT NOT NULL,
    "contact"   TEXT NOT NULL,
    "rating"    NUMERIC(2, 1) DEFAULT 3.0 CHECK (rating >= 0 AND rating <= 5), -- e.g., 4.5
    "services"  TEXT[] DEFAULT '{}', -- Array of service names
    "imageUrl"  TEXT,
    "created_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Comment on the table
COMMENT ON TABLE "public"."medical_entities" IS 'Stores information about doctors, hospitals, labs, and medical shops.';

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_medical_entities_category ON "public"."medical_entities" ("category");
CREATE INDEX IF NOT EXISTS idx_medical_entities_city_area ON "public"."medical_entities" ("city", "area");
CREATE INDEX IF NOT EXISTS idx_medical_entities_services ON "public"."medical_entities" USING GIN ("services"); -- For array searching

-- Trigger to automatically update 'updated_at' timestamp on modification
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON "public"."medical_entities"
FOR EACH ROW
EXECUTE PROCEDURE extensions.moddatetime (updated_at);

-- -------------------------------------------------------------------------------------------------
-- Profiles Table
-- Stores user-specific data, including roles. Links to auth.users.
-- -------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id"         UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    "full_name"  TEXT,
    "role"       TEXT DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
    "updated_at" TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Comment on the table
COMMENT ON TABLE "public"."profiles" IS 'Stores user-specific data like full name and role, linked to auth.users.';

-- Trigger to automatically update 'updated_at' timestamp on modification
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON "public"."profiles"
FOR EACH ROW
EXECUTE PROCEDURE extensions.moddatetime (updated_at);

-- -------------------------------------------------------------------------------------------------
-- Function to create a profile entry when a new user signs up
-- -------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- Important for accessing auth.users table
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name', -- Get full_name from metadata if provided during signup
    'user' -- Default role
  );
  RETURN NEW;
END;
$$;

-- Trigger to call handle_new_user on new user creation in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- -------------------------------------------------------------------------------------------------
-- Helper function to get user role (useful for RLS policies)
-- -------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN 'anon'; -- Anonymous user
  END IF;

  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  IF user_role IS NULL THEN
    RETURN 'authenticated_user_without_profile_role'; -- Should not happen if trigger works
  END IF;
  RETURN user_role;
END;
$$;

-- -------------------------------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- -------------------------------------------------------------------------------------------------

-- RLS for medical_entities table
ALTER TABLE "public"."medical_entities" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to medical entities" ON "public"."medical_entities";
CREATE POLICY "Allow public read access to medical entities"
    ON "public"."medical_entities" FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow admin full access to medical entities" ON "public"."medical_entities";
CREATE POLICY "Allow admin full access to medical entities"
    ON "public"."medical_entities" FOR ALL
    USING (public.get_user_role() = 'admin')
    WITH CHECK (public.get_user_role() = 'admin');

-- RLS for profiles table
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow individual read access to their own profile" ON "public"."profiles";
CREATE POLICY "Allow individual read access to their own profile"
    ON "public"."profiles" FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow individual update access to their own profile" ON "public"."profiles";
CREATE POLICY "Allow individual update access to their own profile"
    ON "public"."profiles" FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Allow admin read access to all profiles" ON "public"."profiles";
CREATE POLICY "Allow admin read access to all profiles"
    ON "public"."profiles" FOR SELECT
    USING (public.get_user_role() = 'admin');

-- -------------------------------------------------------------------------------------------------
-- Supabase Storage Bucket for Medical Images
-- -------------------------------------------------------------------------------------------------

-- Policy: Allow public read access to all images in 'medical-images' bucket
CREATE POLICY "Allow public read on medical-images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'medical-images' );

-- Policy: Allow authenticated users to upload/update/delete images
CREATE POLICY "Allow authenticated users to manage medical images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'medical-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Allow authenticated users to update their medical images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'medical-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Allow authenticated users to delete their medical images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'medical-images' AND auth.role() = 'authenticated' );

SELECT 'Schema setup complete.';