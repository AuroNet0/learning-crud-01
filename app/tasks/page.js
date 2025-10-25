"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, pathname]);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      await fetchTasks();
    } else {
      console.error("Falha ao deletar:", data.message || "Erro desconhecido");
    }

    return data.message;
  };

  const handleEdit = (id) => {
    router.push(`tasks/edit/${id}`);
  };

  const handleInsert = async () => {
    router.push(`tasks/new`);
  };

  return (
    <div>
      <div>
        <div>
          <h1>Lista de Tarefas</h1>
          <button
            onClick={() => {
              handleInsert();
            }}
          >
            Nova Tarefa
          </button>
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
                      handleEdit(t.id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(t.id);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
