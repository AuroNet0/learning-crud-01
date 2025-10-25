// test("Teste endpoint POST", async () => {
//   const newTask = {
//     title: "Teste de inserção ",
//     description: "Essa é uma tarefa apenas de teste da API de inserção. ",
//   };
//   const response = await fetch("http://localhost:3000/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTask),
//   });
//   expect(response.status).toBe(201);
// });

// test("Teste endpoint DELETE", async () => {
//   const response = await fetch("http://localhost:3000/api/tasks/${id}", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   expect(response.status).toBe(200);
// });

// test("Teste endpoint DELETE", async () => {
//   const response = await fetch("http://localhost:3000/api/tasks/${id}", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   expect(response.status).toBe(200);
// });

test("Teste endpoint GET", async () => {
  const response = await fetch("http://localhost:3000/api/tasks");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
