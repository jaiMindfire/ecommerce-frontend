import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const StyledSkeletonCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxWidth: 250,
    margin: "0 auto",
    padding: theme.spacing(2),
  }));