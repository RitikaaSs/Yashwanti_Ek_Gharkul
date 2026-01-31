// update api for candidate personal details

import { NextResponse } from "next/server";
// import pool from "../../../../../utils/db";
import { ResultSetHeader } from "mysql2";
import pool from "../../../../utils/db";

export async function POST(req: Request) {
    try {

        const {
            id,
            full_name,
            email,
            phone_number,
            preferred_date,
            preferred_time_slot,
            purpose_of_visit,
            number_of_visitors, status
        } = await req.json();

        if (!id) {
            return NextResponse.json({ status: 0, error: "Candidate ID required" });
        }
// const formattedDate = preferred_date ? preferred_date.split("T")[0] : null
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE visit_requests SET
        full_name = ?,
        email = ?,
        phone_number = ?,
        preferred_date = ?,
        preferred_time_slot = ?,
        purpose_of_visit = ?,
        number_of_visitors = ?,
        status = ?
      WHERE id = ?`,
            [
                full_name,
                email,
                phone_number,
                preferred_date ? preferred_date.split("T")[0] : null,
                preferred_time_slot,
                purpose_of_visit,
                number_of_visitors,
                status,
                id
            ]
        );

        return NextResponse.json({
            status: 1,
            message: "Visit updated successfully",
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
