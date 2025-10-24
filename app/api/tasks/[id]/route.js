import { NextResponse } from "next/server";
import database from "../../../../infra/database";

export async function GET(request, context) {
  try {
    const params = await context.params;

    const id = parseInt(params.id, 10);
    const query = "SELECT * FROM tasks WHERE id = $1";

    if (!params.id || isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await database.query({ text: query, values: [id] });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function PUT(request, { params }) {
//   try {
//     const { title, description } = await request.json();
//     const result = await database.query(
//       "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
//       [title, description, params.id]
//     );
//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(_, { params }) {
//   try {
//     await database.query("DELETE FROM tasks WHERE id = $1", [params.id]);
//     return NextResponse.json({ message: "Tarefa removida" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
