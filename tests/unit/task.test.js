describe("Testes para os endpoints de tarefas", () => {
  let testObjectId = null;

  it("Teste endpoint POST", async () => {
    const newTask = {
      title: "Teste de inserção",
      description: "Essa é uma tarefa apenas de teste da API de inserção. ",
    };

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    expect(response.status).toBe(201);
    const corpo = await response.json();
    testObjectId = corpo.id;
  });

  it("Teste endpoint GET 01", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${testObjectId}`);
    expect(response.status).toBe(200);
    const responseBody = await response.json();
  
    expect(responseBody.id).toBe(testObjectId);
    expect(responseBody).toMatchObject({
      title: "Teste de inserção",
      description: "Essa é uma tarefa apenas de teste da API de inserção. ",
    });
  });

  it("Teste endpoint PUT", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${testObjectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de atualização",
        description:
          "Essa é uma tarefa apenas de teste da API de atualização. ",
      }),
    });
    expect(response.status).toBe(200);
  });

  it("Teste endpoint GET 02", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${testObjectId}`);
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(testObjectId);
    expect(responseBody).toMatchObject({
      title: "Teste de atualização",
      description:
        "Essa é uma tarefa apenas de teste da API de atualização. ",
    });
  });
  
  it("Teste endpoint DELETE", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${testObjectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status).toBe(200);
  });

  it("Teste endpoint GET 03", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${testObjectId}`);
    expect(response.status).toBe(404);

    const responseBody = await response.json();
    expect(responseBody.error).toBe("Tarefa não encontrada");
  });
});
