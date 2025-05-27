/*
  # Create admin user and fix column name

  1. Changes
    - Rename imageUrl column to imageurl to match Supabase conventions
    - Create admin user with email admin@gmail.com and password 123456
    - Set admin role in profiles table
*/

-- Fix column name if needed
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'medical_entities' 
    AND column_name = 'imageurl'
  ) THEN
    -- Column already exists with correct name, do nothing
    RAISE NOTICE 'Column imageurl already exists';
  ELSE
    -- Rename the column if it exists with wrong case
    IF EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_name = 'medical_entities' 
      AND column_name = 'imageurl'
    ) THEN
      ALTER TABLE medical_entities RENAME COLUMN "imageUrl" TO imageurl;
    ELSE
      -- Add the column if it doesn't exist
      ALTER TABLE medical_entities ADD COLUMN imageurl text;
    END IF;
  END IF;
END $$;

-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@gmail.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Set admin role for the user
UPDATE public.profiles 
SET role = 'admin' 
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@gmail.com'
);