import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.resolve(process.cwd(), "words.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomWord = data[randomIndex];

  return NextResponse.json(randomWord);
}
