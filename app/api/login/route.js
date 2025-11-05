import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check if user exists in your "users" table
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password, username")
      .eq("email", email)
      .single();

    if (error || !user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // Compare password using bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Optionally, log user into Supabase Auth (if using auth)
    const { data: loginData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return Response.json({ message: authError.message }, { status: 400 });
    }

    // Return success and user info
    return Response.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
