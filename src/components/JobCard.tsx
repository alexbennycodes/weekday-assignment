import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

const JobCard = ({ job }) => {
  return (
    <Paper
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Card variant="outlined" className="job_card">
        <CardContent className="card_content" sx={{ padding: "29px 21px" }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <img src={job.logoUrl} />
            <div>
              <h3 className="company_name">{job.companyName}</h3>
              <h2 className="job_role">{job.jobRole}</h2>
              <p class="cards_sub_text">{job.location}</p>
            </div>
          </Box>
          <p class="card_salary">
            Estimated Salary: ${job.salaryCurrencyCode}
            {job.minJdSalary} - {job.maxJdSalary} LPA
          </p>
          <div className="job_desc">
            <h5>About Company:</h5>
            <p>
              {job.jobDetailsFromCompany}
              <div className="white_gradient" />
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
