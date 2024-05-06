/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box } from "@mui/material";
import {
  EXP_LEVELS_OPTIONS,
  MIN_BASE_OPTIONS,
  NUMBER_OF_EMPLOYEES_OPTIONS,
  REMOTE_OPTIONS,
  ROLES_OPTIONS,
  TECH_STACK_OPTIONS,
} from "../../utils/constants";
import { debounce } from "../../utils/debounce";
import Input from "../Input";
import Select from "../Select";
import React, { ChangeEvent } from "react";
import { JobFilterType, SelectOptionType } from "../../utils/types";

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<JobFilterType>>;
  filter: JobFilterType;
}

const JobsFilter: React.FC<Props> = ({ setFilter, filter }) => {
  const debouncedHandleSearch = debounce((searchTerm: string) => {
    setFilter((prev) => ({ ...prev, searchTerm }));
  });

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        paddingTop: "24px",
      }}
    >
      <Select
        options={ROLES_OPTIONS}
        isSearchable
        isClearable
        isMulti
        placeholder="Roles"
        styles={{
          container: (styles: React.CSSProperties) => ({
            ...styles,
            minWidth: "150px",
          }),
        }}
        onChange={(e: SelectOptionType[]) =>
          setFilter((prev) => ({
            ...prev,
            roles: e,
          }))
        }
        value={filter.roles}
        label="Roles"
      />
      <Select
        options={NUMBER_OF_EMPLOYEES_OPTIONS}
        isSearchable
        isClearable
        isMulti
        placeholder="Number of employees"
        onChange={(e: SelectOptionType[]) =>
          setFilter((prev) => ({
            ...prev,
            noOfEmployees: e,
          }))
        }
        value={filter.noOfEmployees}
        label="No of employees"
      />
      <Select
        options={EXP_LEVELS_OPTIONS}
        isSearchable
        isClearable
        placeholder="Experience"
        onChange={(e: { value: number; label: string }) =>
          setFilter((prev) => ({
            ...prev,
            experience: e,
          }))
        }
        value={filter.experience}
        label="Experience"
      />
      <Select
        options={REMOTE_OPTIONS}
        isSearchable
        isClearable
        isMulti
        placeholder="Remote"
        onChange={(e: SelectOptionType[]) =>
          setFilter((prev) => ({
            ...prev,
            remote: e,
          }))
        }
        value={filter.remote}
        label="Remote"
      />
      <Select
        options={TECH_STACK_OPTIONS}
        isSearchable
        isClearable
        isMulti
        placeholder="Tech Stack"
        onChange={(e: SelectOptionType[]) =>
          setFilter((prev) => ({
            ...prev,
            techStack: e,
          }))
        }
        value={filter.techStack}
        label="Tech Stack"
      />
      <Select
        options={MIN_BASE_OPTIONS}
        isSearchable
        isClearable
        placeholder="Minimum Base Pay Salary"
        onChange={(e: { label: string; value: number } | null) =>
          setFilter((prev) => ({
            ...prev,
            minBasePay: e,
          }))
        }
        value={filter.minBasePay}
        label="Min Base Pay"
      />
      <Input
        placeholder="Search Company Name"
        label="Company Name"
        value={filter.searchTerm || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          debouncedHandleSearch(e.target.value)
        }
      />
    </Box>
  );
};

export default JobsFilter;
