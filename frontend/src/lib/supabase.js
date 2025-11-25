import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://boemtcdhdruvexwcegej.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZW10Y2RoZHJ1dmV4d2NlZ2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODc2NDIsImV4cCI6MjA3OTY2MzY0Mn0.IQZAe9UGYe9J53QTO8mG-NPgwIlQg_Vsruqo-TiD0C8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
