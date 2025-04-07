import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "scripts.json");
    const data = fs.readFileSync(filePath, "utf8");
    const scripts = JSON.parse(data);
    
    return NextResponse.json(scripts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load scripts" }, { status: 500 });
  }
}
