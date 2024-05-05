import { createAppSlice } from "../../app/createAppSlice";
import { fetchJobs } from "./jobAPI";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  FAILED: "failed",
};

interface JobDetails {
  companyName: string | null;
  jdLink: string | null;
  jdUid: string;
  jobDetailsFromCompany: string | null;
  jobRole: string | null;
  location: string | null;
  logoUrl: string | null;
  maxExp: number | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string | null;
}

export interface JobSliceState {
  jobList: JobDetails[] | [];
  limit: number;
  offset: number;
  totalCount: number;
  status: "idle" | "loading" | "failed";
}

const initialState: JobSliceState = {
  jobList: [],
  limit: 10,
  offset: 0,
  totalCount: 0,
  status: "idle",
};

export const jobSlice = createAppSlice({
  name: "job",
  initialState,
  reducers: (create) => ({
    setTotalCount: create.reducer((state, { payload }) => {
      state.totalCount = payload;
    }),
    setAddJobs: create.reducer((state, { payload }) => {
      state.jobList = state.offset
        ? [...state.jobList, ...payload]
        : [...payload];
    }),
    setStatus: create.reducer((state, { payload }) => {
      state.status = payload;
    }),
    getJob: create.asyncThunk(async (offset: number, thunkAPI) => {
      thunkAPI.dispatch(jobSlice.actions.setStatus(STATUS.LOADING));
      try {
        const response = await fetchJobs(offset);
        thunkAPI.dispatch(jobSlice.actions.setAddJobs(response.jdList));
        thunkAPI.dispatch(jobSlice.actions.setTotalCount(response.totalCount));
        thunkAPI.dispatch(jobSlice.actions.setStatus(STATUS.IDLE));
      } catch (error) {
        thunkAPI.dispatch(jobSlice.actions.setStatus(STATUS.FAILED));
      }
    }),
  }),

  selectors: {
    selectJob: (job) => job.jobList,
    selectStatus: (job) => job.status,
    selectTotalCount: (job) => job.totalCount,
  },
});

export const getJob =
  (offset: number): AppThunk =>
  async (dispatch) => {
    dispatch(jobSlice.actions.setStatus(STATUS.LOADING));
    try {
      const response = await fetchJobs(offset);
      dispatch(jobSlice.actions.setAddJobs(response.jdList));
      dispatch(jobSlice.actions.setTotalCount(response.totalCount));
      dispatch(jobSlice.actions.setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(jobSlice.actions.setStatus(STATUS.FAILED));
    }
  };

export const { selectJob, selectStatus, selectTotalCount } = jobSlice.selectors;
