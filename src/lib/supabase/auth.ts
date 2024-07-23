'use client';

import { SupabaseClient } from "@supabase/supabase-js";


const supabase = new SupabaseClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY,
);

/**
 * Sign up a new user
 */
export async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: import.meta.env.SITE
        },
    });
}

/**
 * Sign in an existing user
 */
export async function signInExistingUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log(data, error);
}