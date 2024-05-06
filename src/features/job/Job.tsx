import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
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

  const [filteredJobList, setFilteredJobList] = useState([...jobList]);
  const [filter, setFilter] = useState({
    roles: [],
    noOfEmployees: [],
    experience: null,
    remote: [],
    techStack: [],
    minBasePay: null,
    searchTerm: "",
  });

  useEffect(() => {
    const list = jobList.filter((job) => {
      // Filter by role
      if (filter.roles.length > 0 && !filter.roles.includes(job.jobRole)) {
        return false;
      }

      // TODO: no of Employees data is not available
      // if (
      //   filter.noOfEmployees.length > 0 &&
      //   !filter.noOfEmployees.includes(job.noOfEmployees)
      // ) {
      //   return false;
      // }

      // Filter by experience
      if (
        filter.experience !== null &&
        (job.minExp > filter.experience || job.maxExp < filter.experience)
      ) {
        return false;
      }

      // Filter by remote
      if (filter.remote.length > 0) {
        // generate the locationType and then check if its included in the filter
        let locationType = "";
        if (job.location === "remote") locationType = "remote";
        else if (job.location === "hybrid") locationType = "hybrid";
        else locationType = "inOffice";
        if (!filter.remote.includes(locationType)) {
          return false;
        }
      }

      // TODO: techStack data is not available
      // if (
      //   filter.techStack.length > 0 &&
      //   !filter.techStack.every((stack) => job.techStack.includes(stack))
      // ) {
      //   return false;
      // }

      // Filter by min base pay
      //? could be improved based on the currenyCode
      if (filter.minBasePay !== null && job.minJdSalary < filter.minBasePay) {
        return false;
      }

      // Filter by company name
      if (
        filter.searchTerm !== "" &&
        !job.companyName.toLowerCase().includes(filter.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
    setFilteredJobList(list);
  }, [jobList, filter]);

  const observerTarget = useInfiniteScroll(
    () => {
      dispatch(getJob(offset));
    },
    status === "loading",
    totalCount === 0 ? true : totalCount > jobList.length
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
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              roles: e.map((option) => option.value),
            }))
          }
        />
        <Select
          options={NUMBER_OF_EMPLOYEES_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Number of employees"
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              noOfEmployees: e.map((option) => option.value),
            }))
          }
        />
        <Select
          options={EXP_LEVELS_OPTIONS}
          isSearchable
          isClearable
          placeholder="Experience"
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              experience: e?.value || null,
            }))
          }
        />
        <Select
          options={REMOTE_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Remote"
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              remote: e.map((option) => option.value),
            }))
          }
        />
        <Select
          options={TECH_STACK_OPTIONS}
          isSearchable
          isClearable
          isMulti
          placeholder="Tech Stack"
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              techStack: e.map((option) => option.value),
            }))
          }
        />
        <Select
          options={MIN_BASE_OPTIONS}
          isSearchable
          isClearable
          placeholder="Minimum Base Pay Salary"
          onChange={(e: { label: "string"; value: number }) =>
            setFilter((prev) => ({
              ...prev,
              minBasePay: e?.value || null,
            }))
          }
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
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredJobList.map((job: JobDetailsType) => (
          <Grid item xs={4} sm={4} md={4} key={job.jdUid}>
            <JobCard
              companyName={job.companyName}
              jobDetailsFromCompany={job.jobDetailsFromCompany}
              jobRole={job.jobRole}
              location={job.location}
              logoUrl={job.logoUrl}
              maxJdSalary={job.maxJdSalary}
              minExp={job.minExp}
              minJdSalary={job.minJdSalary}
              salaryCurrencyCode={job.salaryCurrencyCode}
            />
          </Grid>
        ))}
        <div ref={observerTarget}></div>
        {status === "loading" && (
          <Grid item xs={4} sm={8} md={12}>
            <Box
              height={250}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Job;
