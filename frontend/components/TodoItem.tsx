import { Box, styled } from "@mui/material";
import { TodoItemProps, FormNote, NoteType } from "@/types";
import { ChangeEvent, useCallback, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { TextFieldComponent } from "./TextFieldComponent";
import axios from "axios";
import { mutate } from "swr";

const CustomBox = styled(Box)`
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #fff;
`;

const TodoItem: React.FC<TodoItemProps> = ({ note, removeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<NoteType>({
    id: note.id,
    title: note.title,
    content: note.content,
  });

  const handleEdit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [editedData]
  );

  const handleSaveClick = useCallback(
    async (id: string) => {
      try {
        await axios.put(`/api/todo/${id}`, editedData);
        mutate("/api/todo", (data) =>
          data.map((note: { id: string }) =>
            note.id === id ? { ...note, ...editedData } : note
          )
        );
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },
    [editedData]
  );

  const handleCancelClick = useCallback(() => {
    setEditedData({
      id: note.id,
      title: note.title,
      content: note.content,
    });
    setIsEditing(false);
  }, [note.content, note.title]);

  return (
    <CustomBox>
      <TextFieldComponent
        name={"title"}
        value={isEditing ? editedData.title : note.title}
        isEditing={isEditing}
        handleEdit={handleEdit}
        styleValues={{ fontSize: `1.4rem` }}
      />
      <TextFieldComponent
        name={"content"}
        value={isEditing ? editedData.content : note.content}
        isEditing={isEditing}
        handleEdit={handleEdit}
        styleValues={{}}
      />
      <ButtonComponent
        handleSaveClick={() => handleSaveClick(note.id)}
        handleCancelClick={handleCancelClick}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        removeTodo={removeTodo}
        editedData={editedData}
      />
    </CustomBox>
  );
};

export { TodoItem };
