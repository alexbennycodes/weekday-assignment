import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  styled,
} from "@mui/material";

function capitalize(string: string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

import "./style.css";
import ShowMoreDialog from "./ShowMoreDialog";
import { useState } from "react";

const ApplyButton = styled(Button)(() => ({
  backgroundColor: "#55EFC4",
  color: "#000000",
  fontSize: "16px",
  fontWeight: 400,
  borderRadius: 7,
  width: "100%",
  boxShadow: "none",
  textTransform: "unset",
  "&:hover": {
    backgroundColor: "#55EFC4",
    boxShadow: "none",
  },
}));

const ReferralButton = styled(Button)(() => ({
  backgroundColor: "rgb(73, 67, 218)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 400,
  borderRadius: 7,
  width: "100%",
  boxShadow: "none",
  textTransform: "unset",
  marginTop: "8px",
  display: "inline-flex",
  gap: 8,
  "&:hover": {
    backgroundColor: "rgb(73, 67, 218)",
    boxShadow: "none",
  },
}));

const StyledCard = styled(Card)(() => ({
  borderRadius: 20,
  padding: 0,
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
  "&:hover": {
    transition: "all 0.2s ease-in-out",
    transform: "scale(1.01)",
  },
}));

const JobCard = ({
  companyName,
  jobDetailsFromCompany,
  jobRole,
  location,
  logoUrl,
  maxJdSalary,
  minExp,
  minJdSalary,
  salaryCurrencyCode,
}: {
  companyName: string | null;
  jobDetailsFromCompany: string | null;
  jobRole: string | null;
  location: string | null;
  logoUrl: string | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string | null;
}) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <StyledCard variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={logoUrl}
            variant="square"
          />
        }
        title={
          <Typography sx={{ color: "#8b8b8b", fontSize: 13, fontWeight: 600 }}>
            {companyName}
          </Typography>
        }
        subheader={
          <>
            {jobRole && (
              <Typography sx={{ fontSize: 13 }}>
                {capitalize(jobRole)}
              </Typography>
            )}
            {location && (
              <Typography sx={{ fontSize: 11 }}>
                {capitalize(location)}
              </Typography>
            )}
          </>
        }
      />

      <CardContent sx={{ paddingY: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Estimated Salary: {salaryCurrencyCode === "USD" ? "$" : "₹"}
          {minJdSalary || 0} - {maxJdSalary}
          {salaryCurrencyCode === "₹" ? "LPA" : "K"}
        </Typography>
        <div className="job_desc">
          <h5>About Company:</h5>
          <p>
            {jobDetailsFromCompany}
            <span className="white_gradient" />
          </p>
          <button type="button" onClick={handleDialogOpen}>
            Show more
          </button>
        </div>
        <CardContent sx={{ paddingX: 0 }}>
          <Typography
            sx={{ fontSize: 14, color: "#8b8b8b", fontWeight: [600] }}
          >
            Minimum Experience
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {minExp ? minExp + " Years" : "Fresher"}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingBottom: 0, paddingX: 0 }}>
          <Box sx={{ width: "100%" }}>
            <ApplyButton variant="contained">⚡ Easy Apply</ApplyButton>
            <ReferralButton variant="contained">
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={"/avatar-fallback.svg"}
              />
              Ask for referral
            </ReferralButton>
          </Box>
        </CardActions>
      </CardContent>
      <ShowMoreDialog
        open={open}
        handleClose={handleDialogClose}
        aboutUs={jobDetailsFromCompany}
      />
    </StyledCard>
  );
};

export default JobCard;
