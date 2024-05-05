import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  JobDetailsType,
  getJob,
  selectJob,
  selectOffset,
  selectStatus,
  selectTotalCount,
} from "./jobSlice";

import JobCard from "../../components/JobCard";
import "./job.css";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

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
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {jobList.map((job: JobDetailsType) => (
        <Grid item xs={4} sm={4} md={4}>
          <JobCard job={job} />
        </Grid>
      ))}
      <div ref={observerTarget}></div>
      {status === "loading" && <div>Loading...</div>}
    </Grid>
  );
};

export default Job;
