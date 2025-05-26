/*
  # Create medical entities table

  1. New Tables
    - `medical_entities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `address` (text)
      - `city` (text)
      - `area` (text)
      - `contact` (text)
      - `rating` (numeric)
      - `services` (text array)
      - `imageUrl` (text)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `medical_entities` table
    - Add policies for:
      - Public read access
      - Authenticated users can create/update/delete their own entities
*/

-- Create the medical_entities table
CREATE TABLE IF NOT EXISTS medical_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  address text,
  city text,
  area text,
  contact text,
  rating numeric DEFAULT 0,
  services text[] DEFAULT '{}',
  imageUrl text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medical_entities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON medical_entities
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create entities"
  ON medical_entities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their entities"
  ON medical_entities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE auth.users.id = auth.uid()
  ))
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE auth.users.id = auth.uid()
  ));

CREATE POLICY "Allow authenticated users to delete their entities"
  ON medical_entities
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE auth.users.id = auth.uid()
  ));

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_medical_entities_updated_at
    BEFORE UPDATE ON medical_entities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();