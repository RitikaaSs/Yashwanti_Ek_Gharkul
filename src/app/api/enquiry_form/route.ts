import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      phone_number,
      subject,
      message,
    } = body;

    // Basic validation
    // if (!full_name || !email || !subject || !message) {
    //   return NextResponse.json(
    //     { error: "Required fields are missing" },
    //     { status: 400 }
    //   );
    // }

    // Insert into MySQL
    const query = `
      INSERT INTO enquiry_form 
      (full_name, email, phone_number, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      full_name,
      email,
      phone_number || null,
      subject,
      message,
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
