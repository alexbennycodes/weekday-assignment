import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import JobCard from "../../components/JobCard";
import JobsFilter from "../../components/JobsFilter";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
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
      if (
        filter.roles.length > 0 &&
        !filter.roles.map((option) => option.value).includes(job.jobRole)
      ) {
        return false;
      }

      // TODO: no of Employees data is not available
      // if (
      //   filter.noOfEmployees.length > 0 &&
      //   !filter.noOfEmployees.map((option) => option.value).includes(job.noOfEmployees)
      // ) {
      //   return false;
      // }

      // Filter by experience
      if (
        filter.experience !== null &&
        (job.minExp > filter.experience.value ||
          job.maxExp < filter.experience.value)
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
        if (
          !filter.remote.map((option) => option.value).includes(locationType)
        ) {
          return false;
        }
      }

      // TODO: techStack data is not available
      // if (
      //   filter.techStack.length > 0 &&
      //   !filter.techStack.map((option) => option.value).every((stack) => job.techStack.includes(stack))
      // ) {
      //   return false;
      // }

      // Filter by min base pay
      //? could be improved based on the currenyCode
      if (
        filter.minBasePay !== null &&
        job.minJdSalary < filter.minBasePay?.value
      ) {
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
      <JobsFilter setFilter={setFilter} filter={filter} />
      <Grid
        container
        spacing={4}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingY: 5 }}
      >
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
        <Grid item xs={4} sm={4} md={4}>
          <div ref={observerTarget}></div>
        </Grid>
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
