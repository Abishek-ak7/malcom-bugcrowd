import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Admin login check first
    if (email.endsWith("@malcom.ltd")) {
      const { data: admin, error: adminError } = await supabase
        .from("admin")
        .select("id, email, password")
        .eq("email", email)
        .single();

      if (adminError || !admin) {
        console.error("Admin fetch error:", adminError);
        return Response.json(
          { message: "Admin not found or unauthorized" },
          { status: 401 }
        );
      }

      // Compare password using bcrypt
      const isAdminValid = await bcrypt.compare(password, admin.password);
      if (!isAdminValid) {
        return Response.json(
          { message: "Invalid admin credentials" },
          { status: 401 }
        );
      }

      // ✅ Optional: Try Supabase Auth login (safe fallback)
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          console.warn("Supabase admin auth failed:", authError.message);
        }
      } catch (authErr) {
        console.warn("Admin auth skipped:", authErr);
      }

      // ✅ Success (Admin)
      return Response.json(
        {
          message: "Admin login successful",
          user: {
            id: admin.id,
            email: admin.email,
            role: "admin",
          },
          redirect: "/admin",
        },
        { status: 200 }
      );
    }

    // ✅ Normal User Login (your working code)
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password, username")
      .eq("email", email)
      .single();

    if (error || !user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Optional Supabase Auth login
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        console.warn("Supabase auth login failed:", authError.message);
      }
    } catch (authErr) {
      console.warn("User auth skipped:", authErr);
    }

    // ✅ Success (Normal User)
    return Response.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: "user",
        },
        redirect: "/",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
