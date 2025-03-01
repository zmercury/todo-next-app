"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Todo = {
  id: number; text: string;
  completed: boolean;
};

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await fetch("http://localhost:6969/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo, completed: false }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleUpdateTodo = async (id: number, text: string) => {
    const res = await fetch(`http://localhost:6969/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: todos.find(t => t.id === id)?.completed }),
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleToggleTodo = async (id: number) => {
    const res = await fetch(`http://localhost:6969/todos/${id}/toggle`, {
      method: "PATCH",
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`http://localhost:6969/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -20 }}
    >
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-light dark:bg-dark border border-accent text-textLight dark:text-textDark"
          placeholder="Add a new todo..."
        />
        {isMounted ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg"
          >
            Add
          </motion.button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg"
          >
            Add
          </button>
        )}
      </form>

      <AnimatePresence>
        {todos.map((todo) => (
          isMounted ? (
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
          ) : (
            <div
              key={todo.id}
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
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-2 py-1 bg-accent text-white rounded"
              >
                Delete
              </button>
            </div>
          )
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
