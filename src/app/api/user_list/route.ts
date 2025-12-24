
// src/app/api/user_list/route.ts
// fetch user list and only on condition of the elderly person application status is approved. in elderly_candidates table user_id references users table id.

import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import pool from "../../../../utils/db";

interface User extends RowDataPacket {}

export async function POST() {
  try {
    const [rows] = await pool.query<User[]>(
      `
      SELECT DISTINCT
        u.id,
        u.full_name,
        u.email,
        u.phone_number,
        u.address
      FROM users u
      INNER JOIN elderly_candidates ec
        ON ec.user_id = u.id
      WHERE ec.status = ?
      `,
      ["Approved"] 
    );

    return NextResponse.json({
      status: 1,
      data: rows,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json({
      status: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
