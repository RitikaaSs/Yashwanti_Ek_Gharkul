// update api for candidate personal details
// change password api for user profile edit

import { NextResponse } from "next/server";
import pool from "../../../../utils/db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      id,
      full_name,
      email,
      phone_number,
      address,
      new_password,
      confirm_password,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ status: 0, error: "User ID required" });
    }

    // Validate password match if provided
    if (new_password || confirm_password) {
      if (!new_password || !confirm_password) {
        return NextResponse.json({
          status: 0,
          error: "Both password fields are required",
        });
      }

      if (new_password !== confirm_password) {
        return NextResponse.json({
          status: 0,
          error: "Passwords do not match",
        });
      }
    }

    // Build dynamic query
    let query = `
      UPDATE users SET
        full_name = ?,
        email = ?,
        phone_number = ?,
        address = ?
    `;
    const values: (string | number | null)[] = [
      full_name,
      email,
      phone_number,
      address,
    ];


    // If password change requested
    if (new_password) {
      const hashedPassword = await bcrypt.hash(new_password, 10);
      query += `, password_hash = ?`;
      values.push(hashedPassword);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return NextResponse.json({
      status: 1,
      message: new_password
        ? "Profile & password updated successfully"
        : "Profile updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      error: "Failed to update profile",
    });
  }
}


// import { NextResponse } from "next/server";
// import pool from "../../../../utils/db";
// import { ResultSetHeader } from "mysql2";

// export async function POST(req: Request) {
//     try {
//         const {
//             id,
//             full_name,
//             email,
//             phone_number,
//             address
//         } = await req.json();

//         if (!id) {
//             return NextResponse.json({ status: 0, error: "User ID required" });
//         }

//         const [result] = await pool.query<ResultSetHeader>(
//             `UPDATE users SET
//         full_name = ?,
//         email = ?,
//         phone_number = ?,
//         address = ?
//       WHERE id = ?`,
//             [
//                 full_name,
//                 email,
//                 phone_number,
//                 address,
//                 id,
//             ]
//         );

//         return NextResponse.json({
//             status: 1,
//             message: "Profile updated successfully",
//             affectedRows: result.affectedRows,
//         });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({
//             status: 0,
//             error: "Failed to update profile",
//         });
//     }
// }
