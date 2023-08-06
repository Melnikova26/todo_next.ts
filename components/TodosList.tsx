import { TodosListProps } from "@/types";
import { TodoItem } from "./TodoItem";
import { styled } from "@mui/material";

const CustomContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
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
