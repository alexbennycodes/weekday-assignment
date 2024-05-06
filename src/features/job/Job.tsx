import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import JobCard from "../../components/JobCard";
import JobsFilter from "../../components/JobsFilter";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { filterJobs } from "../../utils/filterJobs";
import {
  JobDetailsType,
  STATUS,
  getJob,
  selectJob,
  selectOffset,
  selectStatus,
  selectTotalCount,
} from "./jobSlice";

export interface JobFilter {
  roles: { value: string; label: string }[];
  noOfEmployees: { value: string; label: string }[];
  experience: { value: number; label: string } | null;
  remote: { value: string; label: string }[];
  techStack: { value: string; label: string }[];
  minBasePay: { value: number; label: string } | null;
  searchTerm: string;
}

const Job = () => {
  const jobList = useAppSelector(selectJob);
  const status = useAppSelector(selectStatus);
  const offset = useAppSelector(selectOffset);
  const totalCount = useAppSelector(selectTotalCount);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<JobFilter>({
    roles: [],
    noOfEmployees: [],
    experience: null,
    remote: [],
    techStack: [],
    minBasePay: null,
    searchTerm: "",
  });

  const observerTarget = useInfiniteScroll(
    () => {
      dispatch(getJob(offset));
    },
    status === STATUS.LOADING,
    totalCount === 0 ? true : totalCount > jobList.length,
    status === STATUS.FAILED
  );

  return (
    <div>
      <JobsFilter setFilter={setFilter} filter={filter} />
      {status === STATUS.FAILED && (
        <Alert variant="filled" severity="error">
          Error occurred while fetching jobs. Try again later.
        </Alert>
      )}
      <Grid
        container
        spacing={4}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingY: 5 }}
      >
        {filterJobs(filter, jobList).map((job: JobDetailsType) => (
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

        {status === STATUS.LOADING ? (
          <Grid item xs={4} sm={8} md={12}>
            <Box
              height={500}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          <Grid item xs={4} sm={4} md={4}>
            {/* Intersection Observer Target */}
            <div ref={observerTarget}></div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Job;
