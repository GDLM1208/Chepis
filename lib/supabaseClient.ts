import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hlitismzpolklqgckmhh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsaXRpc216cG9sa2xxZ2NrbWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDcyMzIsImV4cCI6MjA3ODE4MzIzMn0.b4TfXkdywK3jvQWORiPZptb7_WiTc_DdedzktHI-4G8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
