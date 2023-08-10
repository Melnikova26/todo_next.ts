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

const TodosList: React.FC<TodosListProps> = ({ notes, removeTodo }) => {
  return (
    <CustomContainer>
      {notes.map((note) => (
        <TodoItem
          key={note.id}
          note={note}
          removeTodo={() => removeTodo(note.id)}
        />
      ))}
    </CustomContainer>
  );
};

export { TodosList };
