import { ChangeEvent } from "react";

export interface NoteType {
  id: number;
  title: string;
  content: string;
}

export interface TodosListProps {
  notes: NoteType[];
  removeTodo: (id: number) => void;
  setNotes: Function;
}

export interface TodoItemProps {
  note: NoteType;
  removeTodo: () => void;
  setNotes: Function;
}

export interface TextFieldComponentProps {
  name: string;
  value: string;
  isEditing: boolean;
  styleValues: Object;
  handleEdit: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonComponentProps {
  isEditing: boolean;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  setIsEditing: Function;
  removeTodo: () => void;
}

export interface TodoFormProps {
  addTodo: (text: FormNote) => void;
}
export type FormNote = Omit<NoteType, "id">;
