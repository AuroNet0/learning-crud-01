"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();

  const handleSubmit = (id) => {
    router.push(`tasks/edit/${id}`);
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>Lista de Tarefas</h1>
          <button>Nova Tarefa</button>
        </div>

        <div>
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                <div>
                  <h2>{t.title}</h2>
                  <p>{t.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleSubmit(t.id);
                    }}
                  >
                    Editar
                  </button>
                  <button>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
