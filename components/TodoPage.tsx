"use client";
import { NoteType, FormNote } from "@/types";
import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodosList } from "./TodosList";

const TodoPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const addTodo = (text: FormNote) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...text, id: prevNotes.length + 1 },
    ]);
  };

  const removeTodo = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <TodosList notes={notes} removeTodo={removeTodo} setNotes={setNotes} />
    </>
  );
};

export { TodoPage };
