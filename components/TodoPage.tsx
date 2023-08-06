"use client";
import { NoteType, FormNote } from "@/types";
import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodosList } from "./TodosList";
import { TodoSearch } from "./TodoSearch";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";

const TodoPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    setFilteredNotes([...notes]);
  }, [notes]);

  const addTodo = (text: FormNote) => {
    setNotes((prevNotes) => [...prevNotes, { ...text, id: uuid() }]);
    setFilteredNotes([...notes]);
  };

  const removeTodo = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setFilteredNotes([...notes]);
  };

  return (
    <Box component="main" sx={{ minHeight: "90vh" }}>
      <TodoForm addTodo={addTodo} />
      <TodoSearch notes={notes} setFilteredNotes={setFilteredNotes} />
      <TodosList
        notes={filteredNotes}
        removeTodo={removeTodo}
        setNotes={setNotes}
      />
    </Box>
  );
};

export { TodoPage };
