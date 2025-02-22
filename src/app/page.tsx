import TodoList from "@/components/TodoList";
import { getTodos } from "@/lib/db";

export default async function Home() {
  const initialTodos = await getTodos();

  return (
    <div>
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}
