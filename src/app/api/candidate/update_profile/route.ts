// update api for candidate personal details

import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  try {
    const {
      id,
      name,
      date_of_birth,
      age,
      marital_status,
      gender,
      blood_group,
      address,
      education,
      profession,
      hobbies
    } = await req.json();

    if (!id) {
      return NextResponse.json({ status: 0, error: "Candidate ID required" });
    }
const formattedDOB = date_of_birth
  ? new Date(date_of_birth).toISOString().split("T")[0]
  : null;
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE elderly_candidates SET
        name = ?,
        date_of_birth = ?,
        age = ?,
        marital_status = ?,
        gender = ?,
        blood_group = ?,
        address = ?,
        education = ?,
        profession = ?,
        hobbies = ?
      WHERE id = ?`,
      [
        name,
        formattedDOB,
        age,
        marital_status,
        gender,
        blood_group,
        address,
        education,
        profession,
        hobbies,
        id,
      ]
    );

    return NextResponse.json({
      status: 1,
      message: "Profile updated successfully",
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
