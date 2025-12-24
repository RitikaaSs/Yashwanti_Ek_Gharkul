// fetch elderly candidates detailed based on their id

import pool from "../../../../../utils/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";

interface ElderlyCandidate extends RowDataPacket {
    total: number;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({
                status: 0,
                error: "id is required",
            });
        }

        const [personal_details] = await pool.query<ElderlyCandidate[]>(
            `SELECT * FROM elderly_candidates WHERE id = ?`,
            [id]
        );
        const [medical_record] = await pool.query<ElderlyCandidate[]>(
            `SELECT * FROM medical_records WHERE elderly_id = ?`,
            [id]
        );

        const userId = personal_details[0].user_id;
        const [user_details] = await pool.query<ElderlyCandidate[]>(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );
        return NextResponse.json({
            status: 1,
            data: { personal_details, medical_record, user_details },
        });
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            return NextResponse.json({ status: 0, error: error.message });
        }

        return NextResponse.json({ status: 0, error: "Unknown error" });
    }
}
