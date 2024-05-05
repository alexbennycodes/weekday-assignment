import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectJob, selectStatus } from "./jobSlice";

const Job = () => {
  const job = useAppSelector(selectJob);
  const status = useAppSelector(selectStatus);
  return <div>{(job, status)}</div>;
};

export default Job;
