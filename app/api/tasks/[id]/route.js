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

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = parseInt(params.id, 10);

    const { title, description } = await request.json();
    const query =
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";

    const result = await database.query({
      text: query,
      values: [title, description, id],
    });

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Erro ao alterar tarefa" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa alterada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;

    const id = parseInt(params.id, 10);
    const query = "DELETE FROM tasks WHERE id = $1";

    const result = await database.query({ text: query, values: [id] });

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa removida com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
