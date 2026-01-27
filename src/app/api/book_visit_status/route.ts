
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { status: 0, message: "id and status are required" },
        { status: 200 }
      );
    }

    // status can be 'approved' or 'rejected'
    const updateQuery = `
      UPDATE visit_requests
      SET status = ?
      WHERE id = ?
    `;

    await db.query(updateQuery, [status, id]);

    return NextResponse.json(
      { status: 1, message: "Status updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Update status error:", error);

    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
