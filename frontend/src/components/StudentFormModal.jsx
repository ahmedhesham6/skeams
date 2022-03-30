import Modal from "@mui/material/Modal";
import { StudentForm } from "./StudentForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
};

export default function StudentFormModal({
  open,
  handleClose,
  label,
  student,
  handleSubmit,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container sx={{ borderBottom: 1.5, boxShadow: 1 }}>
          <Grid item xs={10}>
            <Box sx={{ display: "flex", px: 3 }}>
              <h3>{label}</h3>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 1,
              }}
            >
              <IconButton
                onClick={handleClose}
                aria-label="close"
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <StudentForm student={student} onSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
}
