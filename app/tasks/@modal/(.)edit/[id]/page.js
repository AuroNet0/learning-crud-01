"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react"; // 1. Importe o useState

export default function EditTaskModal() {
  const router = useRouter();
  const { id } = useParams();

  const fetchTaskById = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    }
  }, [id]);

  useEffect(() => {
    fetchTaskById();
  }, [fetchTaskById]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const editedTask = { title, description };
    console.log(title);
    console.log(description);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (!response.ok || response.status !== 200) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao alterar tarefa.");
      }

      setIsSubmitting(false);

      router.back();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "left",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Editar Tarefa</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="title"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              disabled={isSubmitting}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "100px",
                boxSizing: "border-box",
                fontFamily: "sans-serif",
              }}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "0.9em" }}>Erro: {error}</p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              style={{ padding: "10px 15px" }}
            >
              Fechar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "10px 15px",
                background: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
