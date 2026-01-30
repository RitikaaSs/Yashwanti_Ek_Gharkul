// fetch enquiry form list
// in this api i want search filter for subject and date filter for submitted_at which is in format YYYY-MM-DD HH:mm:ss and pagination

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
      date,
      status,
      subject,
      page = 1,
    } = body;

    const limit = 10;
    const offset = (page - 1) * limit;
    const whereConditions: string[] = [];
    // let whereQuery = ` WHERE 1=1 `;
    const values: (string | number)[] = [];

    if (subject && subject !== "all") {
      whereConditions.push("subject LIKE ?");
      values.push(`%${subject}%`);
    }
    if (status && status !== "all") {
      whereConditions.push("status = ?");
      values.push(status);
    }
    if (date) {
      whereConditions.push("DATE(submitted_at) = ?");
      values.push(date); // YYYY-MM-DD
    }
    const whereQuery =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    //  Count query
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

    //  Data query
    const [rows] = await pool.query<VisitRequest[]>(

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
