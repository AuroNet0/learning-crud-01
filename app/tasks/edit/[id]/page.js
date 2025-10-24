"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/tasks`);
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error("Erro ao buscar tarefa:", err));
  }, [id]);

  if (!task) return <p>Carregando tarefa...</p>;

  return (
    <div>
      <h1>Tarefa #{id}</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={handleSubmit}>Voltar</button>
    </div>
  );
}
