import React from "react";
import ReactSelect from "react-select";

const Select = ({ styles = {}, ...props }) => {
  return (
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
      {...props}
    />
  );
};

export default Select;
