import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // --- Basic validation ---
    if (!username || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // --- Validate email format ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // --- Validate password strength ---
    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // --- Check if user already exists ---
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // --- Create Supabase Auth user ---
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return Response.json({ message: authError.message }, { status: 400 });
    }

    // --- Hash password before storing (optional but safer) ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Insert user data into your custom users table ---
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: authData.user?.id,
        username,
        email,
        password: hashedPassword,
      },
    ]);

    if (insertError) {
      return Response.json({ message: insertError.message }, { status: 400 });
    }

    return Response.json(
      { message: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
