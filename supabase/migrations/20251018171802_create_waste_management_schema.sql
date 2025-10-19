/*
  # Waste Management & Recycling System - Database Schema

  ## Overview
  Creates the complete database structure for EcoTrack waste management system,
  including citizen reports, pickup scheduling, and admin authentication.

  ## 1. New Tables

  ### `bin_reports`
  Stores citizen reports of overflowing bins
  - `id` (uuid, primary key) - Unique report identifier
  - `location` (text) - Address or location description
  - `latitude` (decimal) - GPS latitude coordinate
  - `longitude` (decimal) - GPS longitude coordinate
  - `waste_type` (text) - Type of waste (General/Plastic/Organic/E-Waste/Hazardous)
  - `photo_url` (text, optional) - URL to uploaded photo
  - `comments` (text, optional) - Additional citizen comments
  - `status` (text) - Report status (Pending/In Progress/Resolved)
  - `reporter_email` (text, optional) - Contact email for follow-up
  - `created_at` (timestamptz) - Timestamp of report submission
  - `updated_at` (timestamptz) - Last status update timestamp

  ### `scheduled_pickups`
  Stores citizen-scheduled waste collection requests
  - `id` (uuid, primary key) - Unique pickup identifier
  - `name` (text) - Citizen name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `address` (text) - Pickup address
  - `latitude` (decimal, optional) - GPS latitude
  - `longitude` (decimal, optional) - GPS longitude
  - `waste_type` (text) - Type of waste to collect
  - `waste_volume` (text) - Volume description (Small/Medium/Large or kg)
  - `preferred_date` (date) - Requested pickup date
  - `preferred_time` (time) - Requested pickup time
  - `notes` (text, optional) - Special instructions
  - `status` (text) - Pickup status (Pending/Scheduled/In Progress/Completed/Cancelled)
  - `reference_number` (text) - Human-readable reference (e.g., P1021)
  - `created_at` (timestamptz) - Request timestamp
  - `updated_at` (timestamptz) - Last status update

  ### `admin_users`
  Stores admin/municipal staff accounts linked to Supabase auth
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - Admin email address
  - `full_name` (text) - Admin full name
  - `role` (text) - Admin role/department
  - `created_at` (timestamptz) - Account creation date

  ## 2. Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - `bin_reports`: Public can insert (anonymous reporting), only authenticated admins can view/update
  - `scheduled_pickups`: Public can insert, only authenticated admins can view/update
  - `admin_users`: Only accessible by authenticated users viewing their own data

  ### Policies
  - Citizens can submit reports and schedule pickups without authentication
  - Admins must authenticate to view and manage all reports and pickups
  - Admin users can only read their own profile data

  ## 3. Indexes
  - Status fields indexed for faster filtering
  - Timestamp fields indexed for sorting
  - Reference number indexed for quick lookup

  ## 4. Default Values
  - All timestamps default to current time
  - Status fields default to 'Pending'
  - IDs auto-generate using gen_random_uuid()
*/

-- Create bin_reports table
CREATE TABLE IF NOT EXISTS bin_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  waste_type text NOT NULL CHECK (waste_type IN ('General', 'Plastic', 'Organic', 'E-Waste', 'Hazardous')),
  photo_url text,
  comments text,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved')),
  reporter_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scheduled_pickups table
CREATE TABLE IF NOT EXISTS scheduled_pickups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  waste_type text NOT NULL CHECK (waste_type IN ('General', 'Plastic', 'Organic', 'E-Waste', 'Hazardous', 'Mixed')),
  waste_volume text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time time NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Scheduled', 'In Progress', 'Completed', 'Cancelled')),
  reference_number text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'Admin',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bin_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for bin_reports
-- Allow anyone to insert reports (anonymous citizen reporting)
CREATE POLICY "Anyone can submit bin reports"
  ON bin_reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can view reports
CREATE POLICY "Admins can view all bin reports"
  ON bin_reports
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admins can update reports
CREATE POLICY "Admins can update bin reports"
  ON bin_reports
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policies for scheduled_pickups
-- Allow anyone to schedule pickups
CREATE POLICY "Anyone can schedule pickups"
  ON scheduled_pickups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can view pickups
CREATE POLICY "Admins can view all scheduled pickups"
  ON scheduled_pickups
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admins can update pickups
CREATE POLICY "Admins can update scheduled pickups"
  ON scheduled_pickups
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policies for admin_users
-- Admins can view their own profile
CREATE POLICY "Admins can view own profile"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bin_reports_status ON bin_reports(status);
CREATE INDEX IF NOT EXISTS idx_bin_reports_created_at ON bin_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scheduled_pickups_status ON scheduled_pickups(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_pickups_date ON scheduled_pickups(preferred_date);
CREATE INDEX IF NOT EXISTS idx_scheduled_pickups_ref ON scheduled_pickups(reference_number);
CREATE INDEX IF NOT EXISTS idx_scheduled_pickups_created_at ON scheduled_pickups(created_at DESC);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_bin_reports_updated_at
  BEFORE UPDATE ON bin_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_pickups_updated_at
  BEFORE UPDATE ON scheduled_pickups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();