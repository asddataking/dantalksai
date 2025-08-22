-- Enable the pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION call_rss_update_function()
RETURNS void AS $$
BEGIN
  -- Call the Edge Function via HTTP
  PERFORM net.http_post(
    url := 'https://your-project-id.supabase.co/functions/v1/update-rss-feeds',
    headers := '{"Authorization": "Bearer your-service-role-key", "Content-Type": "application/json"}',
    body := '{}'
  );
END;
$$ LANGUAGE plpgsql;

-- Schedule the cron job to run every 10 minutes
SELECT cron.schedule(
  'rss-update-every-10-minutes',
  '*/10 * * * *', -- Every 10 minutes
  'SELECT call_rss_update_function();'
);

-- Alternative: If you prefer to use a different approach, you can also set up
-- a cron job on your server or use external services like:
-- - GitHub Actions (free tier: 2000 minutes/month)
-- - Vercel Cron Jobs (if using Vercel)
-- - External cron services (cron-job.org, easycron.com)

-- Note: Replace 'your-project-id' and 'your-service-role-key' with your actual values
-- You can find these in your Supabase dashboard under Settings > API
