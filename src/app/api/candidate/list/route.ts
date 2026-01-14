
// fetch elderly candidates detailed list based on their application status
// in this existing api i want to add filters so while displaying the list of candidates i can also filter them. one will be search filter based on name, second will be age based like 30-40, 40-50, etc and third will be dropdown based on gender. make necessary changes to the route.ts and page.tsx files to accomodate these filters.
import pool from "../../../../../utils/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";

interface RequestBody {
  status?: string | number;
  userId?: number;
  search?: string;
  ageFrom?: number;
  ageTo?: number;
  gender?: string;
  page?: number;
}
export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const {
      status,
      userId,
      search,
      ageFrom,
      ageTo,
      gender,
      page = 1,
    } = body;

    const limit = 10;
    const offset = (page - 1) * limit;

    let whereQuery = ` WHERE 1=1`;
    const values: (string | number)[] = [];

    if (status !== undefined) {
      whereQuery += ` AND status = ?`;
      values.push(status);
    }

    if (userId !== undefined) {
      whereQuery += ` AND user_id = ?`;
      values.push(userId);
    }

    if (search && search.trim() !== "") {
      whereQuery += ` AND name LIKE ?`;
      values.push(`%${search}%`);
    }

    if (ageFrom !== undefined && ageTo !== undefined) {
      whereQuery += ` AND age BETWEEN ? AND ?`;
      values.push(ageFrom, ageTo);
    }

    if (gender && gender !== "all") {
      whereQuery += ` AND gender = ?`;
      values.push(gender);
    }

    // 🔹 Total count query
    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM elderly_candidates ${whereQuery}`,
      values
    );

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 🔹 Data query with pagination
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM elderly_candidates ${whereQuery} 
       ORDER BY id DESC 
       LIMIT ? OFFSET ?`,
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


// export async function POST(req: Request) {
//   try {
//     const body: RequestBody = await req.json();
//     const { status, userId } = body;

//     if (status === undefined && userId === undefined) {
//       return NextResponse.json({
//         status: 0,
//         error: "Either status or userId is required",
//       });
//     }

//     let query = `SELECT * FROM elderly_candidates WHERE 1=1`;
//     const values: (string | number)[] = [];

//     if (status !== undefined) {
//       query += ` AND status = ?`;
//       values.push(status);
//     }

//     if (userId !== undefined) {
//       query += ` AND user_id = ?`;
//       values.push(userId);
//     }

//     const [rows] = await pool.query<ElderlyCandidate[]>(query, values);

//     return NextResponse.json({
//       status: 1,
//       data: rows,
//     });
//   } catch (error: unknown) {
//     console.error(error);

//     return NextResponse.json({
//       status: 0,
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }


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
