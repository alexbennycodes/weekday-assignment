import { Box, Button, Card, CardContent, Paper } from "@mui/material";
import { JobDetailsType } from "../../features/job/jobSlice";

import "./style.css";

const JobCard = ({ job }: { job: JobDetailsType }) => {
  return (
    <Paper
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        height: "100%",
      }}
    >
      <Card variant="outlined" className="job_card">
        <CardContent className="card_content" sx={{ padding: "29px 21px" }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {job.logoUrl && <img src={job.logoUrl} />}
            <div>
              <h3 className="company_name">{job.companyName}</h3>
              <h2 className="job_role">{job.jobRole}</h2>
              <p className="cards_sub_text">{job.location}</p>
            </div>
          </Box>
          <p className="card_salary">
            Estimated Salary: ${job.salaryCurrencyCode}
            {job.minJdSalary} - {job.maxJdSalary} LPA
          </p>
          <div className="job_desc">
            <h5>About Company:</h5>
            <p>
              {job.jobDetailsFromCompany}
              <span className="white_gradient" />
            </p>
            <button type="button">Show more</button>
          </div>
          <div className="job_exp_container">
            <h3>Minimum Experience</h3>
            <h2>{job.minExp} years</h2>
          </div>
          <Button
            variant="contained"
            style={{ width: "100%", margin: "13px 0 5px 0" }}
          >
            Easy Apply
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default JobCard;
