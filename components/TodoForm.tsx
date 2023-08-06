"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { FormNote, TodoFormProps } from "@/types";

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [texts, setTexts] = useState<FormNote>({ title: "", content: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in texts) {
      if (!texts[key as keyof FormNote].trim()) return;
    }
    addTodo(texts);
    setTexts({ title: "", content: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTexts((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkTextsValuesNotEmpty = (obj: FormNote): boolean => {
    for (const key in obj) {
      if (!obj[key as keyof FormNote].trim()) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <h2>Добавить новую заметку:</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", maxWidth: "25rem" }}
      >
        <TextField
          name="title"
          id="outlined-multiline-flexible"
          label="Заголовок заметки"
          placeholder="Заголовок заметки"
          multiline
          maxRows={4}
          sx={{ pb: 2 }}
          value={texts.title}
          onChange={handleChange}
        />
        <TextField
          name="content"
          id="outlined-textarea"
          label="Напишите здесь заметку"
          placeholder="Напишите здесь заметку"
          multiline
          rows={4}
          sx={{ pb: 2 }}
          value={texts.content}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={checkTextsValuesNotEmpty(texts)}
        >
          Добавить заметку
        </Button>
      </Box>
    </>
  );
};

export { TodoForm };