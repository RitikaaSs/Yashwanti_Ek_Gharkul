
// fetch elderly candidates detailed list based on their application status

import pool from "../../../../../utils/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";

interface ElderlyCandidate extends RowDataPacket {}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { status, userId } = body;

    if (status === undefined && !userId) {
      return NextResponse.json({
        status: 0,
        error: "Either status or userId is required",
      });
    }

    let query = `SELECT * FROM elderly_candidates WHERE 1=1`;
    const values: any[] = [];

    if (status !== undefined) {
      query += ` AND status = ?`;
      values.push(status);
    }

    if (userId) {
      query += ` AND user_id = ?`;
      values.push(userId);
    }

    const [rows] = await pool.query<ElderlyCandidate[]>(query, values);

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


// import pool from "../../../../../utils/db";
// import { NextResponse } from "next/server";
// import { RowDataPacket } from "mysql2/promise";

// interface ElderlyCandidate extends RowDataPacket {
// total: number;
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { status, userId } = body;

//     if (!status || !userId) {
//       return NextResponse.json({
//         status: 0,
//         error: "Status or User ID is required",
//       });
//     }
// if (status){
//     const [rows] = await pool.query<ElderlyCandidate[]>(
//       `SELECT * FROM elderly_candidates WHERE status = ?`,
//       [status]
//     )} else if (userId){
//     const [rows] = await pool.query<ElderlyCandidate[]>(
//       `SELECT * FROM elderly_candidates WHERE user_id = ?`,
//       [userId]
//     )}

    

//     return NextResponse.json({
//       status: 1,
//       data: rows,
//     });
//   } catch (error: unknown) {
//     console.error(error);

//     if (error instanceof Error) {
//       return NextResponse.json({ status: 0, error: error.message });
//     }

//     return NextResponse.json({ status: 0, error: "Unknown error" });
//   }
// }
