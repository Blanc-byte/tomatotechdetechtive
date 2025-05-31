import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vzqnhqpyjxagaqoucaep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cW5ocXB5anhhZ2Fxb3VjYWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTY1OTYsImV4cCI6MjA2NDE5MjU5Nn0.FaL97wZIl80kMJFdlf6CNEDyLGE1Afx1IH5oiGQFeTc'
);

export interface User {
  id: string;
  Fname: string;
  Lname: string;
  email: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional fields for future use:
  // profileImage?: string;
  // role?: 'user' | 'admin';
}

async function saveUserProfile({ id, email, Fname, Lname, location }: User) {
  const { error } = await supabase
    .from('users')
    .insert([{ id, email, Fname, Lname, location, createdAt: new Date(), updatedAt: new Date() }]);
  if (error) {
    console.error('Error saving user profile:', error);
    // Show error to user
  }
} 