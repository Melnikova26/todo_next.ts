import { Box, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TodoSearchProps } from "@/types";

const TodoSearch: React.FC<TodoSearchProps> = ({ notes, setFilteredNotes }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search.trim()) {
      setFilteredNotes([...notes]);
    }
  }, [search]);

  const handleSearch = () => {
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase().trim()) ||
        note.content.toLowerCase().includes(search.toLowerCase().trim())
    );
    setFilteredNotes([...filteredNotes]);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        id="outlined-search"
        fullWidth
        label="Поиск..."
        type="search"
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearch(event.target.value)
        }
        InputProps={{
          endAdornment: (
            <IconButton edge="end" aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export { TodoSearch };
