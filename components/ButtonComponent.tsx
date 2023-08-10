import { ButtonComponentProps } from "@/types";
import { Button, ButtonGroup } from "@mui/material";

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  isEditing,
  setIsEditing,
  handleSaveClick,
  handleCancelClick,
  removeTodo,
}) => {
  return isEditing ? (
    <>
      <ButtonGroup aria-label="medium secondary button group">
        <Button onClick={handleSaveClick}>Сохранить</Button>
        <Button onClick={handleCancelClick}>Отменить</Button>
      </ButtonGroup>
    </>
  ) : (
    <>
      <ButtonGroup aria-label="medium secondary button group">
        <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
        <Button color="secondary" onClick={removeTodo}>
          Удалить
        </Button>
      </ButtonGroup>
    </>
  );
};

export { ButtonComponent };
