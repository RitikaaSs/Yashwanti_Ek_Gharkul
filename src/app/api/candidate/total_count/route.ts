// get total count of elderly candidates based on their application status
// for admin dashboard summary

import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import { RowDataPacket } from "mysql2/promise";

interface StatusCounts extends RowDataPacket {
  approved: number;
  on_hold: number;
  rejected: number;
}

export async function POST() {
  try {
    const [rows] = await pool.query<StatusCounts[]>(
      `
      SELECT 
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) AS on_hold,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
      FROM elderly_candidates
      `
    );

    const result = rows[0];

    return NextResponse.json({
      status: 1,
      approved: result.approved,
      on_hold: result.on_hold,
      rejected: result.rejected,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json({ status: 0, error: error.message });
    }

    return NextResponse.json({ status: 0, error: "Unknown error" });
  }
}


// const res = await fetch("/api/elderly_candidates/status_count", {
//   method: "POST",
// });

// const data = await res.json();