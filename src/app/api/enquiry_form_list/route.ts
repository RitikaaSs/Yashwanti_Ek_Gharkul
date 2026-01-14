
// fetch enquiry form list
//. in this api i want search filter for subject and date filter for submitted_at which is in format YYYY-MM-DD HH:mm:ss and pagination

import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import pool from "../../../../utils/db";

interface Enquiry extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
}


interface RequestBody {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const {
      search,
      page = 1,
    } = body;

    const limit = 10;
    const offset = (page - 1) * limit;

    let whereQuery = ` WHERE 1=1 `;
    const values: (string | number)[] = [];

    //  Subject search
    if (search && search.trim() !== "") {
      whereQuery += ` AND subject LIKE ? `;
      values.push(`%${search}%`);
    }


    // 🔹 Count query
    const [countRows] = await pool.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM enquiry_form
      ${whereQuery}
      `,
      values
    );

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 🔹 Data query
    const [rows] = await pool.query<Enquiry[]>(

      `
      SELECT *
      FROM enquiry_form
      ${whereQuery}
      ORDER BY submitted_at DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    return NextResponse.json({
      status: 1,
      data: rows,
      pagination: {
        total,
        currentPage: page,
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
//       `SELECT * FROM enquiry_form order BY submitted_at DESC`
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
