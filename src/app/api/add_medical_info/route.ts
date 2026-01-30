import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      elderly_id,
      diagnosis,
      medications,
      doctor_notes,
      record_date,
      attachment
    } = body;

    // Insert into MySQL
    const query = `
      INSERT INTO medical_records 
      (elderly_id, diagnosis, medications, doctor_notes, record_date, attachment)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      elderly_id,
      diagnosis,
      medications,
      doctor_notes,
      record_date,
      attachment || null
    ]);

    return NextResponse.json(
      { status: 1, message: "Medical record added successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Add medical record error:", error);

    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}