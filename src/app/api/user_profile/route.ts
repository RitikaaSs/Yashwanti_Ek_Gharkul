// fetch elderly candidates detailed based on their id

import pool from "../../../../utils/db";
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

        const [user_details] = await pool.query<ElderlyCandidate[]>(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );

        
        return NextResponse.json({
            status: 1,
            data: user_details,
        });
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            return NextResponse.json({ status: 0, error: error.message });
        }

        return NextResponse.json({ status: 0, error: "Unknown error" });
    }
}
