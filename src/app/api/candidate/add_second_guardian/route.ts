import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      elderly_id,
      name,
      address,
      contact_number,
      email
    } = body;

    if (!elderly_id || !name || !contact_number) {
      return NextResponse.json(
        { status: 0, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO secondary_guardians
      (elderly_id, name, address, contact_number, email)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      elderly_id,
      name,
      address || null,
      contact_number,
      email || null
    ]);

    return NextResponse.json(
      { status: 1, message: "Secondary guardian added successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Add secondary guardian error:", error);

    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}
