// fetch elderly candidates detailed list based on their application status

import pool from "../../../../../utils/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";

interface ElderlyCandidate extends RowDataPacket {
total: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        status: 0,
        error: "Status is required",
      });
    }

    const [rows] = await pool.query<ElderlyCandidate[]>(
      `SELECT * FROM elderly_candidates WHERE status = ?`,
      [status]
    );

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

// async function fetchCandidates(status: string) {
//   const res = await fetch("/api/elderly_candidates/filter", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//   });

//   return await res.json();
// }