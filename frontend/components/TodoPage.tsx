"use client";
import { NoteType, FormNote } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { TodoForm } from "./TodoForm";
import { TodosList } from "./TodosList";
import { TodoSearch } from "./TodoSearch";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";
import axios from "axios";
import fetcher from "@/helpers/fetcher";

const TodoPage = () => {
  const { data: notes, mutate } = useSWR<NoteType[]>("/api/todo", fetcher);

  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    if (!search.trim()) {
      return notes;
    }
    if (search.trim() && notes) {
      return notes.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase().trim()) ||
          note.content.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
  }, [notes, search]);

  const addTodo = useCallback(
    async (text: FormNote) => {
      try {
        const response = await axios.post("/api/todo", { ...text, id: uuid() });
        if (notes) {
          mutate([...notes, response.data], false);
        }
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    [notes, mutate]
  );

  const removeTodo = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/api/todo/${id}`);
        if (notes) {
          mutate(
            notes.filter((note) => note.id !== id),
            false
          );
        }
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    },
    [notes, mutate]
  );

  return (
    <Box component="main" sx={{ minHeight: "90vh" }}>
      <TodoForm addTodo={addTodo} />
      <TodoSearch search={search} setSearch={setSearch} />
      <TodosList notes={filteredNotes || []} removeTodo={removeTodo} />
    </Box>
  );
};

export { TodoPage };
