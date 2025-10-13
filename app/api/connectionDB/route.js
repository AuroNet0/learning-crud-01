import database from "../../../infra/database";

export async function GET(request) {
  const testConnection = await database.query("SELECT 1 + 1 AS sum;");
  const result = testConnection.rows[0].sum;
  return Response.json(result);
}
