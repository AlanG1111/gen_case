import { AppBar } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        color: "#000000",
        padding: "10px",
      }}
      position='static'
    >
      Genesis/Test to school
    </AppBar>
  );
};

export default Header;
