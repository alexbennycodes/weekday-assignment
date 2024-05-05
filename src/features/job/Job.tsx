import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getJob, selectJob, selectStatus } from "./jobSlice";

import "./job.css";
import JobCard from "../../components/JobCard";
import "./job.css";
const Job = () => {
  const jobList = useAppSelector(selectJob);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJob(0));
  }, [dispatch]);

  console.log(status);

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {jobList.map((job) => (
        <Grid item xs={4} sm={4} md={4}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Job;
