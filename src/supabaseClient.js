import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mqnbaczlrcdkzjhcfxjr.supabase.co"; // récupère ça sur ton dashboard
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbmJhY3pscmNka3pqaGNmeGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjM3MTMsImV4cCI6MjA2NDQ5OTcxM30.T9_8YoeZ-8tDXw7FWSLcN6dqk1GVBVonkR8u5hLEOVo"; // prends le `anon` public key (non secret)

export const supabase = createClient(supabaseUrl, supabaseKey);
