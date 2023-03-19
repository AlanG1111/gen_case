import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  maxWidth: "455px",
  margin: "50px auto",
  paddingBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
}));
