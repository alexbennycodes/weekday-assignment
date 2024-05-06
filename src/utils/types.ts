export type SelectOptionType = {
  value: string;
  label: string;
};

export interface JobFilterType {
  roles: SelectOptionType[];
  noOfEmployees: SelectOptionType[];
  experience: { value: number; label: string } | null;
  remote: SelectOptionType[];
  techStack: SelectOptionType[];
  minBasePay: { value: number; label: string } | null;
  searchTerm: string;
}

export const STATUS = {
  IDLE: "idle" as const,
  LOADING: "loading" as const,
  FAILED: "failed" as const,
};

export interface JobDetailsType {
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
  jobList: JobDetailsType[] | [];
  limit: number;
  offset: number;
  totalCount: number;
  status: (typeof STATUS)[keyof typeof STATUS];
}
