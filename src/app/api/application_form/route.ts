import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      // User table fields
      user_name,
      user_address,
      user_email,
      user_phone,

      // Elderly candidate fields
      name,
      date_of_birth,
      age,
      marital_status,
      gender,
      blood_group,
      relationship_with_applicant,
      address,
      education,
      profession,
      hobbies,
      volunteer_interest,
      volunteer_details,
      health_data
    } = body;

    // Step 1: Hash password (temporary password = phone number)
    const passwordHash = await bcrypt.hash(user_phone, 10);

    // Step 2: Insert into user table
    const userInsertQuery = `
      INSERT INTO users 
      (full_name, email, password_hash, phone_number, address, role, created_at) 
      VALUES (?, ?, ?, ?, ?, 'user', NOW())
    `;

    const [userResult]: any = await db.query(userInsertQuery, [
      user_name,
      user_email,
      passwordHash,
      user_phone,
      user_address,
    ]);

    const userId = userResult.insertId;

    // Step 3: Insert into elderly_candidate table
    const candidateQuery = `
      INSERT INTO elderly_candidates
      (user_id, name, date_of_birth, age, marital_status, gender, blood_group, 
       applicant_name, relationship_with_applicant, address, education, profession, 
       hobbies, volunteer_interest, volunteer_details, health_data, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'On hold ')
    `;

    await db.query(candidateQuery, [
      userId,
      name,
      date_of_birth,
      age,
      marital_status,
      gender,
      blood_group,
      '', // applicant_name is left blank as per original code
      relationship_with_applicant,
      address,
      education,
      profession,
      hobbies,
      volunteer_interest,
      volunteer_details,
      health_data,
    ]);

    return NextResponse.json(
      { status: 1, message: "Application submitted successfully", user_id: userId },
      { status: 201 }
    );

  } catch (error) {
    console.error("Application form error:", error);

    return NextResponse.json(
      { status: 0, message: "Internal Server Error"},
      { status: 200 }
    );
  }
}
