"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from "../lib/db";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const data = await getTodos();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = await createTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleUpdateTodo = async (id: number, text: string) => {
    await updateTodo(id, text);
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const handleToggleTodo = async (id: number) => {
    await toggleTodo(id);
    setTodos(todos.map((todo) =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-light dark:bg-dark border border-accent text-textLight dark:text-textDark"
          placeholder="Add a new todo..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.095 }}
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-lg"
        >
          Add
        </motion.button>
      </form>

      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 p-2 bg-light dark:bg-dark rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="h-5 w-5 accent-accent"
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
              className={`flex-1 bg-transparent text-textLight dark:text-textDark ${todo.completed ? "line-through" : ""
                }`}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDeleteTodo(todo.id)}
              className="px-2 py-1 bg-accent text-white rounded"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
