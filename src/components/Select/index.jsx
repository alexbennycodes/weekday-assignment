import { Box, Typography } from "@mui/material";
import React from "react";
import ReactSelect from "react-select";

const Select = ({ label = "", styles = {}, value, ...props }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", justifyContent: "end" }}
    >
      {(value?.value || value?.length > 0) && (
        <Typography sx={{ fontSize: 11 }}>{label}</Typography>
      )}
      <ReactSelect
        styles={{
          placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: "rgb(142, 142, 142)",
            fontSize: "12px",
            fontWeight: 300,
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            fontSize: "12px",
            fontWeight: 300,
          }),
          option: (styles) => ({
            ...styles,
            fontSize: "14px",
            fontWeight: 300,
          }),
          ...styles,
        }}
        value={value}
        {...props}
      />
    </Box>
  );
};

export default Select;
