import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface JobSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: JobSliceState = {
  value: 0,
  status: "idle",
};

export const jobSlice = createAppSlice({
  name: "job",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      state.value += 1;
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      }
    ),

    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        //TODO: add fetch
        // const response = await fetchJob(amount);
        console.log(amount);
        return 1;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value += action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectJob: (job) => job.value,
    selectStatus: (job) => job.status,
  },
});

export const { decrement, increment, incrementByAmount, incrementAsync } =
  jobSlice.actions;

export const { selectJob, selectStatus } = jobSlice.selectors;
