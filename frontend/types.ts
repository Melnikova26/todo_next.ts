import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface NoteType {
  id: string;
  title: string;
  content: string;
}

export interface TodosListProps {
  notes: NoteType[];
  removeTodo: (id: string) => void;
}

export interface TodoItemProps {
  note: NoteType;
  removeTodo: () => void;
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
  editedData: FormNote;
}

export interface TodoFormProps {
  addTodo: (text: FormNote) => void;
}
export type FormNote = Omit<NoteType, "id">;

export interface TodoSearchProps {
  notes: NoteType[];
  setFilteredNotes: Dispatch<SetStateAction<NoteType[]>>;
}
