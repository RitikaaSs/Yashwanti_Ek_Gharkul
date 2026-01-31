// import { NextRequest, NextResponse } from "next/server";
// import db from "../../../../utils/db";
// import bcrypt from "bcryptjs";
// import { ResultSetHeader } from "mysql2";
// import path from "path";
// import fs from "fs/promises";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // ---------- USER FIELDS ----------
//     const user_name = formData.get("user_name") as string;
//     const user_email = formData.get("user_email") as string;
//     const user_phone = formData.get("user_phone") as string;
//     const user_address = formData.get("user_address") as string;

//     // ---------- CANDIDATE FIELDS ----------
//     const name = formData.get("name") as string;
//     const date_of_birth = formData.get("date_of_birth") as string;
//     const age = Number(formData.get("age"));
//     const marital_status = formData.get("marital_status") as string;
//     const gender = formData.get("gender") as string;
//     const blood_group = formData.get("blood_group") as string;
//     const relationship_with_applicant = formData.get(
//       "relationship_with_applicant"
//     ) as string;
//     const address = formData.get("address") as string;
//     const education = formData.get("education") as string;
//     const profession = formData.get("profession") as string;
//     const hobbies = formData.get("hobbies") as string;
//     const volunteer_interest = Number(
//       formData.get("volunteer_interest") ?? 0
//     );
//     const volunteer_details = formData.get("volunteer_details") as string;
//     const health_data = formData.get("health_data") as string;

//     // ---------- PHOTO ----------
//     let photoPath: string | null = null;
//     const photo = formData.get("photo") as File | null;

//     if (photo && photo.size > 0) {
//       const bytes = await photo.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       await fs.mkdir(uploadDir, { recursive: true });

//       const fileName = `${Date.now()}-${photo.name}`;
//       const fullPath = path.join(uploadDir, fileName);

//       await fs.writeFile(fullPath, buffer);
//       photoPath = `/uploads/${fileName}`;
//     }

//     // ---------- PASSWORD ----------
//     const passwordHash = await bcrypt.hash(user_phone, 10);

//     // ---------- INSERT USER ----------
//     const [userResult] = await db.query<ResultSetHeader>(
//       `
//       INSERT INTO users 
//       (full_name, email, password_hash, phone_number, address, role, created_at)
//       VALUES (?, ?, ?, ?, ?, 'user', NOW())
//       `,
//       [user_name, user_email, passwordHash, user_phone, user_address]
//     );

//     const userId = userResult.insertId;

//     // ---------- INSERT CANDIDATE ----------
//     await db.query(
//       `
//       INSERT INTO elderly_candidates (
//         user_id,
//         name,
//         date_of_birth,
//         age,
//         marital_status,
//         gender,
//         blood_group,
//         relationship_with_applicant,
//         address,
//         education,
//         profession,
//         hobbies,
//         volunteer_interest,
//         volunteer_details,
//         health_data,
//         status,
//         photo_path
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `,
//       [
//         userId,
//         name,
//         date_of_birth,
//         age,
//         marital_status,
//         gender,
//         blood_group,
//         relationship_with_applicant,
//         address,
//         education,
//         profession,
//         hobbies,
//         volunteer_interest,
//         volunteer_details || null,
//         health_data || null,
//         "On hold",
//         photoPath,
//       ]
//     );

//     return NextResponse.json(
//       { status: 1, message: "Application submitted successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("APPLICATION FORM ERROR:", error);
//     return NextResponse.json(
//       { status: 0, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import db from "../../../../utils/db";
// import bcrypt from "bcryptjs";
// import { ResultSetHeader } from "mysql2";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       // User table fields
//       user_name,
//       user_address,
//       user_email,
//       user_phone,

//       // Elderly candidate fields
//       name,
//       date_of_birth,
//       age,
//       marital_status,
//       gender,
//       blood_group,
//       relationship_with_applicant,
//       address,
//       education,
//       profession,
//       hobbies,
//       volunteer_interest,
//       volunteer_details,
//       health_data
//     } = body;

//     // Step 1: Hash password (temporary password = phone number)
//     const passwordHash = await bcrypt.hash(user_phone, 10);

//     // Step 2: Insert into user table
//     const userInsertQuery = `
//       INSERT INTO users 
//       (full_name, email, password_hash, phone_number, address, role, created_at) 
//       VALUES (?, ?, ?, ?, ?, 'user', NOW())
//     `;

//     const [userResult] = await db.query<ResultSetHeader>(userInsertQuery, [

//       user_name,
//       user_email,
//       passwordHash,
//       user_phone,
//       user_address,
//     ]);

//     const userId = userResult.insertId;
//     const volunteerInterestValue =
//       volunteer_interest === "1" ? 1 : 0;

//     // Step 3: Insert into elderly_candidate table
//     const candidateQuery = `
//   INSERT INTO elderly_candidates
//   (
//     user_id,
//     name,
//     date_of_birth,
//     age,
//     marital_status,
//     gender,
//     blood_group,
//     relationship_with_applicant,
//     address,
//     education,
//     profession,
//     hobbies,
//     volunteer_interest,
//     volunteer_details,
//     health_data,
//     status
//   )
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;


//     await db.query(candidateQuery, [
//       userId,
//       name,
//       date_of_birth?.split("T")[0],
//       Number(age),
//       marital_status,
//       gender,
//       blood_group,
//       relationship_with_applicant,
//       address,
//       education,
//       profession,
//       hobbies,
//       volunteerInterestValue,
//       volunteer_details || null,
//       health_data,
//       "On hold"
//     ]);


//     return NextResponse.json(
//       { status: 1, message: "Application submitted successfully", user_id: userId },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("Application form error:", error);

//     return NextResponse.json(
//       { status: 0, message: "Internal Server Error" },
//       { status: 200 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
  const connection = await db.getConnection();

  try {
    const body = await req.json();

    const {
      // User
      user_name,
      user_address,
      user_email,
      user_phone,

      // Elderly
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
      health_data,
      digital_signature
    } = body;

    await connection.beginTransaction();

    // 🔍 STEP 1: Check if user already exists
    const [existingUsers] = await connection.query<RowDataPacket[]>(
      `
      SELECT id FROM users
      WHERE email = ? OR phone_number = ?
      LIMIT 1
      `,
      [user_email, user_phone]
    );

    let userId: number;

    // 👤 STEP 2: Create user only if not exists
    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      const passwordHash = await bcrypt.hash(user_phone, 10);

      const [userResult] = await connection.query<ResultSetHeader>(
        `
        INSERT INTO users
        (full_name, email, password_hash, phone_number, address, role, created_at)
        VALUES (?, ?, ?, ?, ?, 'user', NOW())
        `,
        [
          user_name,
          user_email,
          passwordHash,
          user_phone,
          user_address || null
        ]
      );

      userId = userResult.insertId;
    }

    // 🧓 STEP 3: Insert elderly candidate
    await connection.query(
      `
      INSERT INTO elderly_candidates (
        user_id,
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
        health_data,
        status,
        digital_signature
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        name,
        date_of_birth ? date_of_birth.split("T")[0] : null,
        age ? Number(age) : null,
        marital_status || null,
        gender || null,
        blood_group || null,
        relationship_with_applicant || null,
        address || null,
        education || null,
        profession || null,
        hobbies || null,
        volunteer_interest === "1" || volunteer_interest === 1 ? 1 : 0,
        volunteer_details || null,
        health_data || null,
        "On hold",
        digital_signature
      ]
    );

    await connection.commit();

    return NextResponse.json(
      {
        status: 1,
        message: "Application submitted successfully",
        user_id: userId
      },
      { status: 201 }
    );

  }catch (error: unknown) {
  await connection.rollback();

  console.error("APPLICATION FORM ERROR:", error);

  let errorMessage = "Internal Server Error";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return NextResponse.json(
    {
      status: 0,
      message: errorMessage
    },
    { status: 500 }
  );
} finally {
    connection.release();
  }
}
