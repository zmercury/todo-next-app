"use server";

import fs from "fs/promises";
import path from "path";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

const filePath = path.join(process.cwd(), "data", "todos.json");

export async function getTodos(): Promise<Todo[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}

export async function createTodo(text: string): Promise<Todo> {
  const todos = await getTodos();
  const newTodo: Todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  await saveTodos(todos);
  return newTodo;
}

export async function updateTodo(id: number, text: string): Promise<void> {
  const todos = await getTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    await saveTodos(todos);
  }
}

export async function toggleTodo(id: number): Promise<void> {
  const todos = await getTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    await saveTodos(todos);
  }
}

export async function deleteTodo(id: number): Promise<void> {
  const todos = await getTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  await saveTodos(updatedTodos);
}
