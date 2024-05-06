import { Box, Typography } from "@mui/material";

const Input = ({ label = "", value = "", ...props }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", justifyContent: "end" }}
    >
      {value !== "" && <Typography sx={{ fontSize: 11 }}>{label}</Typography>}
      <input
        style={{
          fontSize: "12px",
          fontWeight: 300,
          padding: "2px 8px",
          border: "1px solid rgb(205, 205, 205)",
          borderRadius: "4px",
          height: 32,
        }}
        value={value}
        {...props}
      />
    </Box>
  );
};

export default Input;
