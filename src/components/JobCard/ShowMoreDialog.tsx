import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ShowMoreDialog({ open, handleClose, aboutUs }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle>Job Description</DialogTitle>
      </Box>
      <DialogContent>
        <DialogContentText>{aboutUs}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
