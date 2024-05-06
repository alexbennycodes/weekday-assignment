import { post } from "../../api/methods";
import { JobDetailsType } from "../../utils/types";

type FetchJobsResponseType = {
  jdList: JobDetailsType[] | [];
  totalCount: number;
};

export const fetchJobs = async (
  offset: number
): Promise<FetchJobsResponseType> => {
  try {
    const response = await post<FetchJobsResponseType>(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      { limit: 12, offset }
    );
    return response;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
