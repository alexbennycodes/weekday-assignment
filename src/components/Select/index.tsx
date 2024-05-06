import { Box, Typography } from "@mui/material";
import React from "react";
import ReactSelect, { StylesConfig } from "react-select";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  styles?: StylesConfig<Option, false>;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti: false;
  value: Option | Option[] | null;
  onChange: (value: Option | Option[] | null) => void;
  placeholder: string;
  options: Option[] | [];
}

const Select: React.FC<SelectProps> = ({
  label = "",
  styles = {},
  value,
  isMulti = false,
  isSearchable = false,
  isClearable = false,
  placeholder = "",
  onChange = () => {},
  options = [],
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        minHeight: "55px",
      }}
    >
      {value && (Array.isArray(value) ? value.length > 0 : true) && (
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
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
      />
    </Box>
  );
};

export default Select;
