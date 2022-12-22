import { useState } from "react";
import TextField from "@mui/material/TextField";


interface IFilterbarProps {
}

const Filterbar: React.FC<IFilterbarProps> = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchQuery(e.target.value)
    }

  return (
    <form>
    <TextField
        fullWidth
      id="search-bar"
      className="text"
      value={searchQuery}
      onChange={handleSearch}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </form>
  );
};

export default Filterbar;
