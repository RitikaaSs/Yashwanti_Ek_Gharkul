import { NextResponse } from "next/server";
import pool from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json({ status: 0, error: "User ID required" });
    }

    // Fetch user's phone number
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT phone_number FROM users WHERE id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ status: 0, error: "User not found" });
    }

    const phoneNumber = rows[0].phone_number;

    // Hash phone number as password
    const hashedPassword = await bcrypt.hash(phoneNumber, 10);

    // Update password
    await pool.query<ResultSetHeader>(
      `UPDATE users 
       SET password_hash = ?
       WHERE id = ?`,
      [hashedPassword, user_id]
    );

    return NextResponse.json({
      status: 1,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      error: "Failed to reset password",
    });
  }
}
