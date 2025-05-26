/*
  # Fix image URL column name

  1. Changes
    - Rename `imageUrl` column to `imageurl` to match Supabase schema requirements
  
  2. Security
    - No changes to existing RLS policies
*/

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
    -- Add the column with correct lowercase name
    ALTER TABLE medical_entities ADD COLUMN IF NOT EXISTS imageurl text;
  END IF;
END $$;