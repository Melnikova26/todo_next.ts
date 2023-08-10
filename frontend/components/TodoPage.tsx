"use client";
import { NoteType, FormNote } from "@/types";
import { useEffect, useState } from "react";
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

  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    if (notes) {
      setFilteredNotes([...notes]);
    }
  }, [notes]);

  const addTodo = async (text: FormNote) => {
    try {
      const response = await axios.post("/api/todo", { ...text, id: uuid() });
      if (notes) {
        mutate([...notes, response.data], false);
        setFilteredNotes([...notes, response.data]);
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      if (notes) {
        mutate(
          notes.filter((note) => note.id !== id),
          false
        );
      }
      setFilteredNotes((prevFilteredNotes) =>
        prevFilteredNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <Box component="main" sx={{ minHeight: "90vh" }}>
      <TodoForm addTodo={addTodo} />
      <TodoSearch notes={notes || []} setFilteredNotes={setFilteredNotes} />
      <TodosList notes={filteredNotes} removeTodo={removeTodo} />
    </Box>
  );
};

export { TodoPage };
