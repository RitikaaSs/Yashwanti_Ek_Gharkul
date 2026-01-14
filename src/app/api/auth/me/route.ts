import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface JwtPayload {
    id: number;
    role: string;
    iat?: number;
    exp?: number;
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        return NextResponse.json({
            id: decoded.id,
            role: decoded.role,
        });
    } catch {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function GET() {
//     const cookieStore = await cookies(); 
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         console.log("COOKIE TOKEN:", token);

//         return NextResponse.json({
//             id: decoded.id,
//             role: decoded.role,
//         });
//     }catch {
//     return NextResponse.json(
//         { message: "Invalid token" },
//         { status: 401 }
//     );
// }

// }
  