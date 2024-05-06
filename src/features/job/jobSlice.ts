import { createAppSlice } from "../../app/createAppSlice";
import { JobDetailsType, JobSliceState, STATUS } from "../../utils/types";
import { fetchJobs } from "./jobAPI";

const initialState: JobSliceState = {
  jobList: [],
  limit: 12,
  offset: 0,
  totalCount: 0,
  status: STATUS.IDLE,
};

export const jobSlice = createAppSlice({
  name: "job",
  initialState,
  reducers: (create) => ({
    setTotalCount: create.reducer((state, { payload }: { payload: number }) => {
      state.totalCount = payload;
    }),
    setAddJobs: create.reducer(
      (state, { payload }: { payload: JobDetailsType[] }) => {
        state.jobList = state.offset
          ? [...state.jobList, ...payload]
          : [...payload];
      }
    ),
    setStatus: create.reducer(
      (
        state,
        { payload }: { payload: (typeof STATUS)[keyof typeof STATUS] }
      ) => {
        state.status = payload;
      }
    ),
    incrementOffset: create.reducer((state) => {
      state.offset += 12;
    }),
    getJob: create.asyncThunk(async (offset: number, { dispatch }) => {
      dispatch(jobSlice.actions.setStatus(STATUS.LOADING));
      try {
        const response = await fetchJobs(offset);
        dispatch(jobSlice.actions.setAddJobs(response.jdList));
        dispatch(jobSlice.actions.incrementOffset());
        dispatch(jobSlice.actions.setTotalCount(response.totalCount));
        dispatch(jobSlice.actions.setStatus(STATUS.IDLE));
      } catch (error) {
        dispatch(jobSlice.actions.setStatus(STATUS.FAILED));
      }
    }),
  }),

  selectors: {
    selectJob: (state) => state.jobList,
    selectStatus: (state) => state.status,
    selectTotalCount: (state) => state.totalCount,
    selectOffset: (state) => state.offset,
  },
});

export const { getJob } = jobSlice.actions;

export const { selectJob, selectStatus, selectTotalCount, selectOffset } =
  jobSlice.selectors;
