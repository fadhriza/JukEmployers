import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { colors } from "../theme/colors";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  label,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: colors.text,
        color: colors.background,
        textTransform: "none",
        fontWeight: 600,
        padding: "10px 24px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#333333", // Slightly lighter for hover
        },
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export const SecondaryButton: React.FC<CustomButtonProps> = ({
  label,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: colors.text,
        color: colors.text,
        textTransform: "none",
        fontWeight: 600,
        padding: "8px 22px",
        borderRadius: "8px",
        borderWidth: "1.5px",
        "&:hover": {
          borderColor: colors.text,
          backgroundColor: colors.accent2,
        },
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export const TertiaryButton: React.FC<CustomButtonProps> = ({
  label,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="text"
      sx={{
        color: colors.text,
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
        },
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
