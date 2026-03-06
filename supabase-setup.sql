-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  votes JSONB NOT NULL,
  favorite_painting TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for exhibition submissions)
CREATE POLICY "Anyone can insert submissions"
ON submissions FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anyone to read submissions (for admin dashboard)
CREATE POLICY "Anyone can read submissions"
ON submissions FOR SELECT
TO anon
USING (true);

-- Create index on email for duplicate checking
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
