import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { candidate_id, status } = body;

    if (!candidate_id || !status) {
      return NextResponse.json(
        { status: 0, message: "candidate_id and status are required" },
        { status: 200 }
      );
    }

    // status can be 'approved' or 'rejected'
    const updateQuery = `
      UPDATE elderly_candidates
      SET status = ?
      WHERE id = ?
    `;

    await db.query(updateQuery, [status, candidate_id]);

    return NextResponse.json(
      { status: 1, message: "Candidate status updated successfully" },
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
