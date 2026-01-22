// update api for candidate personal details

import { NextResponse } from "next/server";
import pool from "../../../../utils/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
    try {
        const {
            id,
            full_name,
            email,
            phone_number,
            address
        } = await req.json();

        if (!id) {
            return NextResponse.json({ status: 0, error: "User ID required" });
        }

        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE users SET
        full_name = ?,
        email = ?,
        phone_number = ?,
        address = ?
      WHERE id = ?`,
            [
                full_name,
                email,
                phone_number,
                address,
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
