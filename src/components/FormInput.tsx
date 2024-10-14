//React Imports
import React from "react";
//3rd Party Imports
import {
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string | false;
  isPassword?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  handleChange,
  handleBlur,
  error,
  helperText,
  isPassword = false,
  showPassword = false,
  toggleShowPassword,
}) => {
  return isPassword ? (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {helperText && (
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      )}
    </FormControl>
  ) : (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
    />
  );
};

export default FormInput;
