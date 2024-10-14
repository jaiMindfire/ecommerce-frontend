import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 4,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
}));

interface SubmitButtonProps {
  loading: boolean;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, label }) => {
  return (
    <StyledButton type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
      {loading ? <CircularProgress size={24} /> : label}
    </StyledButton>
  );
};

export default SubmitButton;
