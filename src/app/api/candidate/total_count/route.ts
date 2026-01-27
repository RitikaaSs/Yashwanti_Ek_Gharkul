// get total count of elderly candidates based on their application status
// for admin 

import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import { RowDataPacket } from "mysql2/promise";

interface StatusCounts extends RowDataPacket {
  approved: number;
  on_hold: number;
  disapproved: number;
  enquiries: number;
  visits: number;
}

export async function POST() {
  try {
    const [rows] = await pool.query<StatusCounts[]>(
      `
      SELECT 
        -- elderly candidates status counts
        SUM(CASE WHEN ec.status = 'Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN ec.status = 'On Hold' THEN 1 ELSE 0 END) AS on_hold,
        SUM(CASE WHEN ec.status = 'Disapproved' THEN 1 ELSE 0 END) AS disapproved,

        -- today's enquiries count
        (
          SELECT COUNT(*) 
          FROM enquiry_form ef
          WHERE DATE(ef.submitted_at) = CURDATE()
        ) AS enquiries,

        -- today's visit requests count
        (
          SELECT COUNT(*) 
          FROM visit_requests vr
          WHERE DATE(vr.preferred_date) = CURDATE()
        ) AS visits

      FROM elderly_candidates ec
      `
    );

    const result = rows[0];

    return NextResponse.json({
      status: 1,
      approved: result.approved || 0,
      on_hold: result.on_hold || 0,
      disapproved: result.disapproved || 0,
      enquiries: result.enquiries || 0,
      visits: result.visits || 0,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json({ status: 0, error: error.message });
    }

    return NextResponse.json({ status: 0, error: "Unknown error" });
  }
}


// import { NextResponse } from "next/server";
// import pool from "../../../../../utils/db";
// import { RowDataPacket } from "mysql2/promise";

// interface StatusCounts extends RowDataPacket {
//   approved: number;
//   on_hold: number;
//   rejected: number;
//   enquiries: number;
//   visits: number;
// }

// export async function POST() {
//   try {
//     const [rows] = await pool.query<StatusCounts[]>(
//       `
//       SELECT 
//         SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
//         SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) AS on_hold,
//         SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
//       FROM elderly_candidates
//       `
//     );

//     const result = rows[0];

//     return NextResponse.json({
//       status: 1,
//       approved: result.approved,
//       on_hold: result.on_hold,
//       rejected: result.rejected,
//       enquiries: result.enquiries,
//       visits: result.visits,
//     });
//   } catch (error: unknown) {
//     console.error(error);

//     if (error instanceof Error) {
//       return NextResponse.json({ status: 0, error: error.message });
//     }

//     return NextResponse.json({ status: 0, error: "Unknown error" });
//   }
// }

