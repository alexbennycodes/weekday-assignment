import { Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import JobCard from "../../components/JobCard";
import Select from "../../components/Select";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {
  EXP_LEVELS_OPTIONS,
  MIN_BASE_OPTIONS,
  NUMBER_OF_EMPLOYEES_OPTIONS,
  REMOTE_OPTIONS,
  ROLES_OPTIONS,
  TECH_STACK_OPTIONS,
} from "../../utils/constants";
import {
  JobDetailsType,
  getJob,
  selectJob,
  selectOffset,
  selectStatus,
  selectTotalCount,
} from "./jobSlice";

const Job = () => {
  const jobList = useAppSelector(selectJob);
  const status = useAppSelector(selectStatus);
  const offset = useAppSelector(selectOffset);
  const totalCount = useAppSelector(selectTotalCount);
  const dispatch = useAppDispatch();

  const observerTarget = useInfiniteScroll(
    () => {
      dispatch(getJob(offset));
    },
    status === "loading",
    totalCount >= jobList.length
  );

  return (
    <div>
      <Box sx={{ display: "flex", gap: "5px", marginBottom: "1rem" }}>
        <Select
          options={ROLES_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Roles"
          styles={{
            container: (styles) => ({
              ...styles,
              minWidth: "150px",
            }),
          }}
        />
        <Select
          options={NUMBER_OF_EMPLOYEES_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Number of employees"
        />
        <Select
          options={EXP_LEVELS_OPTIONS}
          isSearchable
          isClearable
          placeholder="Experience"
        />
        <Select
          options={REMOTE_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Remote"
        />
        <Select
          options={TECH_STACK_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Tech Stack"
        />
        <Select
          options={MIN_BASE_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Minimum Base Pay Salary"
        />
        <input
          placeholder="Search Company Name"
          style={{
            fontSize: "12px",
            fontWeight: 300,
            padding: "2px 8px",
            border: "1px solid rgb(205, 205, 205)",
            borderRadius: "4px",
          }}
          
        />
      </Box>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {jobList.map((job: JobDetailsType) => (
          <Grid item xs={4} sm={4} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
        <div ref={observerTarget}></div>
        {status === "loading" && <div>Loading...</div>}
      </Grid>
    </div>
  );
};

export default Job;
