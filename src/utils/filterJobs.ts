import { JobDetailsType, JobFilterType, SelectOptionType } from "./types";

export const filterJobs = (
  filter: JobFilterType,
  jobList: JobDetailsType[] = []
) => {
  return jobList.filter((job) => {
    // Filter by role
    if (
      job.jobRole &&
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
      job?.minExp &&
      job?.maxExp &&
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
        !filter.remote
          .map((option: SelectOptionType) => option.value)
          .includes(locationType)
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
      job?.minJdSalary &&
      job.minJdSalary < filter.minBasePay?.value
    ) {
      return false;
    }

    // Filter by company name
    if (
      filter.searchTerm !== "" &&
      job?.companyName &&
      !job.companyName.toLowerCase().includes(filter.searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};
