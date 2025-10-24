// test("Teste endpoint POST", async () => {
//   const newTask = {
//     title: "Teste de inserção 2",
//     description: "Essa é uma tarefa apenas de teste da API de inserção. 2 ",
//   };
//   const response = await fetch("http://localhost:3000/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTask),
//   });
//   expect(response.status).toBe(201);
//   //const responseBody = await response.json();
//   //expect(responseBody).toStrictEqual([]);
// });

test("Teste endpoint GET", async () => {
  const response = await fetch("http://localhost:3000/api/tasks");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
