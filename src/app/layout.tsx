"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark  ");
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      <body className="min-h-screen flex flex-col items-center py-8">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-accent"
          >
            Todo App
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="mt-4 px-4 py-2 bg-accent text-white rounded-lg"
          >
            {isDark ? "Light" : "Dark"}
          </motion.button>
        </header>
        <main className="w-full max-w-md">{children}</main>
      </body>
    </html>
  );
}
