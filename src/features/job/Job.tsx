import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getJob, selectJob, selectStatus, selectTotalCount } from "./jobSlice";

const Job = () => {
  const jobList = useAppSelector(selectJob);
  const status = useAppSelector(selectStatus);
  const totalCount = useAppSelector(selectTotalCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJob(1));
  }, [dispatch]);

  return (
    <div>
      {JSON.stringify({ status })}
      {jobList.map((job) => job.jdUid)}
      {totalCount}
    </div>
  );
};

export default Job;
