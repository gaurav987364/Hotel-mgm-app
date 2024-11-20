
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://gekkjdhndagmiaytjzvl.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdla2tqZGhuZGFnbWlheXRqenZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0MjIwOTQsImV4cCI6MjAzNzk5ODA5NH0.jj-Ol1dCrUn4lV4W-45PO1KX9t3MNJCMUhxCo0g3bSU` //key ye url
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;