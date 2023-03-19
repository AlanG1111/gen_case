import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  maxWidth: "455px",
  margin: "50px auto",
  paddingBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "box-shadow 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
}));
