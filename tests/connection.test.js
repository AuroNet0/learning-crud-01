test("Teste de conexão com o banco", async () => {
  const response = await fetch("http://localhost:3000/api/connectionDB");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBe(2);
});
