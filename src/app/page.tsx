import TodoList from "@/components/TodoList";

async function fetchTodos() {
  const res = await fetch("http://localhost:6969/todos", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch todos!");
  return res.json();
}

export default async function Home() {
  const initialTodos = await fetchTodos();

  return (
    <div>
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}
