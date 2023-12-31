import { TextFieldComponentProps } from "@/types";
import { TextField } from "@mui/material";

const textFieldStyles = {
  "& fieldset": { border: "none" },
  "& .MuiInputBase-root": {
    p: "4px",
  },
};

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  name,
  value,
  handleEdit,
  isEditing,
  styleValues,
}) => {
  return (
    <TextField
      size="small"
      name={name}
      variant="outlined"
      multiline
      maxRows={4}
      value={value}
      onChange={handleEdit}
      inputProps={{
        readOnly: !isEditing,
        style: styleValues,
      }}
      sx={textFieldStyles}
    />
  );
};

export { TextFieldComponent };
