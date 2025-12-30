
// fetch book visit list data


import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import pool from "../../../../utils/db";

interface ElderlyCandidate extends RowDataPacket {
total: number;
}

export async function POST() {
  try {

    const [rows] = await pool.query<ElderlyCandidate[]>(
      `SELECT * FROM visit_requests order BY created_at DESC`
    )

    return NextResponse.json({
      status: 1,
      data: rows,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json({ status: 0, error: error.message });
    }

    return NextResponse.json({ status: 0, error: "Unknown error" });
  }
}
