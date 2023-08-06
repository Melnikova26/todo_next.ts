import { Box, styled } from "@mui/material";
import { TodoItemProps, FormNote } from "@/types";
import { ChangeEvent, useCallback, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { TextFieldComponent } from "./TextFieldComponent";

const CustomBox = styled(Box)`
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const TodoItem: React.FC<TodoItemProps> = ({ note, removeTodo, setNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<FormNote>({
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
    (id: number) => {
      setNotes((prevNotes: TodoItemProps["note"][]) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...editedData } : note
        )
      );
      setIsEditing(false);
    },
    [note.id, note.content, note.title]
  );

  const handleCancelClick = useCallback(() => {
    setEditedData({
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
      />
    </CustomBox>
  );
};

export { TodoItem };
