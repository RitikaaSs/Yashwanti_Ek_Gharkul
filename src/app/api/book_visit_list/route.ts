
// fetch book visit list data
// add filter for purpose drop down and single date picker not to from date picker

import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import pool from "../../../../utils/db";

interface VisitRequest extends RowDataPacket {
  total: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      purpose,
      status,
      date,
      page = 1,
      limit = 10,
    } = body;

    const offset = (page - 1) * limit;

    const whereConditions: string[] = [];
    const values: (string | number)[] = [];

    // Purpose filter
    if (purpose && purpose !== "all") {
      whereConditions.push("purpose_of_visit = ?");
      values.push(purpose);
    }
    if (status && status !== "all") {
      whereConditions.push("status = ?");
      values.push(status);
    }
    // Single date filter
    if (date) {
      whereConditions.push("DATE(preferred_date) = ?");
      values.push(date); // YYYY-MM-DD
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Data query
    const [rows] = await pool.query<VisitRequest[]>(
      `
      SELECT *
      FROM visit_requests
      ${whereClause}
      ORDER BY preferred_date DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    // Count query
    const [countResult] = await pool.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) as total
      FROM visit_requests
      ${whereClause}
      `,
      values
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      status: 1,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// import { NextResponse } from "next/server";
// import { RowDataPacket } from "mysql2/promise";
// import pool from "../../../../utils/db";

// interface ElderlyCandidate extends RowDataPacket {
// total: number;
// }

// export async function POST() {
//   try {

//     const [rows] = await pool.query<ElderlyCandidate[]>(
//       `SELECT * FROM visit_requests order BY created_at DESC`
//     )

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
