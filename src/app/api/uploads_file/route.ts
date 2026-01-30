import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const userId = formData.get("user_id") as string | null;

    if (!file || !userId) {
      return NextResponse.json(
        { status: 0, message: "File or user_id missing" },
        { status: 400 }
      );
    }

    /* ✅ Folder auto-creation
       public/uploads/medical_records/user_<id> */
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "medical_records",
      `user_${userId}`
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const fileName = `record_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const fileURL = `/uploads/medical_records/user_${userId}/${fileName}`;

    return NextResponse.json({
      status: 1,
      message: "File uploaded successfully",
      documentURL: fileURL
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { status: 0, message: "Upload failed" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { IncomingForm } from "formidable";
// import { Readable } from "stream";
// import fs from "fs/promises";
// import path from "path";

// export const runtime = "nodejs";

// // Helper: convert NextRequest to Node stream
// function nextRequestToNodeRequest(req: NextRequest) {
//   const readable = new Readable({
//     read() {}
//   });

//   req.arrayBuffer().then((buffer) => {
//     readable.push(Buffer.from(buffer));
//     readable.push(null);
//   });

//   // 👇 tell TS "I know what I'm doing"
//   const nodeReq = readable as any;

//   nodeReq.headers = Object.fromEntries(req.headers);
//   nodeReq.method = req.method;

//   return nodeReq;
// }


// export async function POST(req: NextRequest) {
//   try {
//     const nodeReq = nextRequestToNodeRequest(req);

//     const form = new IncomingForm({
//       keepExtensions: true,
//       multiples: false
//     });

//     const data: any = await new Promise((resolve, reject) => {
//       form.parse(nodeReq as any, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const userId = data.fields.user_id?.[0];
//     const uploadedFile = data.files.file?.[0];

//     if (!userId) {
//       return NextResponse.json(
//         { status: 0, message: "user_id is required" },
//         { status: 400 }
//       );
//     }

//     if (!uploadedFile) {
//       return NextResponse.json(
//         { status: 0, message: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     // Folder: public/uploads/medical_records/user_<id>
//     const uploadDir = path.join(
//       process.cwd(),
//       "public",
//       "uploads",
//       "medical_records",
//       `user_${userId}`
//     );

//     await fs.mkdir(uploadDir, { recursive: true });

//     const originalName = uploadedFile.originalFilename || "document";
//     const ext = path.extname(originalName);
//     const fileName = `record_${Date.now()}${ext}`;

//     const destination = path.join(uploadDir, fileName);

//     await fs.copyFile(uploadedFile.filepath, destination);

//     const fileURL = `/uploads/medical_records/user_${userId}/${fileName}`;

//     return NextResponse.json(
//       {
//         status: 1,
//         message: "Medical record uploaded successfully",
//         documentURL: fileURL
//       },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     console.error("Upload error:", error);

//     return NextResponse.json(
//       {
//         status: 0,
//         message: "File upload failed",
//         error: error?.message || "Unknown error"
//       },
//       { status: 500 }
//     );
//   }
// }
