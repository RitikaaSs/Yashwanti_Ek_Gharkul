
// src/app/api/user_list/route.ts
// fetch user list and only on condition of the elderly person application status is approved. in elderly_candidates table user_id references users table id.

import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import pool from "../../../../utils/db";

type User = RowDataPacket;

interface RequestBody {
  search?: string;
  page?: number;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { search, page = 1 } = body;

    const limit = 10;
    const offset = (page - 1) * limit;

    // 🔒 Approved status is ALWAYS enforced
    let whereQuery = `
      WHERE ec.status = 'Approved'
    `;
    const values: (string | number)[] = [];

    // 🔍 Search filter // OR u.email LIKE ?
          // OR u.phone_number LIKE ?
    if (search && search.trim() !== "") {
      whereQuery += `
        AND (
          u.full_name LIKE ?
          
        )
      `;
      const searchValue = `%${search}%`;
      values.push(searchValue);
    }

    // 🔹 Count query
    const [countRows] = await pool.query<RowDataPacket[]>(
      `
      SELECT COUNT(DISTINCT u.id) AS total
      FROM users u
      INNER JOIN elderly_candidates ec
        ON ec.user_id = u.id
      ${whereQuery}
      `,
      values
    );

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 🔹 Data query
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
      ${whereQuery}
      ORDER BY u.id DESC
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

// type User = RowDataPacket;

// interface RequestBody {
//   search?: string;
//   page?: number;
// }

// export async function POST(req: Request) {
//   try {
//     const body: RequestBody = await req.json();
//     const { search, page = 1 } = body;
//  const limit = 10;
//     const offset = (page - 1) * limit;

//     let whereQuery = ` WHERE 1=1`;
//     const values: (string | number)[] = [];

//      if (search && search.trim() !== "") {
//       whereQuery += ` AND name LIKE ?`;
//       values.push(`%${search}%`);
//     }

//     const [rows] = await pool.query<User[]>(
//       `
//       SELECT DISTINCT
//         u.id,
//         u.full_name,
//         u.email,
//         u.phone_number,
//         u.address
//       FROM users u
//       INNER JOIN elderly_candidates ec
//         ON ec.user_id = u.id
//       WHERE ec.status = ?
//       `,
//       ["Approved"] 
//     );
// const total = rows[0].total;
//     const totalPages = Math.ceil(total / limit);
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
