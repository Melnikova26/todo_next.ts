import { TodosListProps } from "@/types";
import { TodoItem } from "./TodoItem";
import { styled } from "@mui/material";

const CustomContainer = styled("div")`
  min-height: 10vh;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: rgba(84, 107, 240, 0.4);
  padding: 20px;
`;

const TodosList: React.FC<TodosListProps> = ({
  notes,
  removeTodo,
  setNotes,
}) => {
  return (
    <CustomContainer>
      {notes.map((note, index) => (
        <TodoItem
          key={index}
          note={note}
          removeTodo={() => removeTodo(note.id)}
          setNotes={setNotes}
        />
      ))}
    </CustomContainer>
  );
};

export { TodosList };
