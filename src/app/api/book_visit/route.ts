import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      phone_number,
      preferred_date,
      preferred_time_slot,
      purpose_of_visit,
      number_of_visitors
    } = body;

    // Insert into MySQL
    const query = `
      INSERT INTO visit_requests 
      (full_name, email, phone_number, preferred_date, preferred_time_slot, purpose_of_visit, number_of_visitors)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      full_name,
      email,
      phone_number,
      preferred_date,
      preferred_time_slot,
      purpose_of_visit,
      number_of_visitors
    ]);

    return NextResponse.json(
      { status: 1, message: "Form submitted successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
