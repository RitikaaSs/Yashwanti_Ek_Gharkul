import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // const { email, password } = await req.json();
    const body = await req.json();
    const { email,
      password
    } = body
    // Fetch user
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { status: 0, message: "Invalid email or password" },
        { status: 200 }
      );
    }

    const user = rows[0];

    // Compare password
    const validPass = bcrypt.compareSync(password, user.password_hash);

    if (!validPass) {
      return NextResponse.json(
        { status: 0, message: "Invalid email or password" },
        { status: 200 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    // Create cookie
    const response = NextResponse.json(
      {
        status: 1,
        message: "Login successful",
        role: user.role,
      },
      { status: 200 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
