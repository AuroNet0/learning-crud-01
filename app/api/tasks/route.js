import { NextResponse } from "next/server";
import database from "../../../infra/database";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    const queryText =
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *";
    const result = await database.query({
      text: queryText,
      values: [title, description],
    });
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await database.query("SELECT * FROM tasks ORDER BY id ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
