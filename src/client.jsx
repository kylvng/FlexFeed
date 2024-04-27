import { createClient } from '@supabase/supabase-js'

const URL = 'https://rmecipccivsbhcqbvcov.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZWNpcGNjaXZzYmhjcWJ2Y292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjkzNDAsImV4cCI6MjAyOTY0NTM0MH0.BpDruw4HseBWTxeNOJj28Rjzrc0cFNqYo7Q9av7Qxhw';
export const supabase = createClient(URL, API_KEY);


