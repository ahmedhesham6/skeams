import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export default function Header({ handleOpen }) {
  return (
    <Grid container sx={{ borderBottom: 1.5, boxShadow: 1 }}>
      <Grid item xs={10}>
        <Box sx={{ display: "flex", px: 3 }}>
          <h1>Students</h1>
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
            onClick={handleOpen}
            aria-label="create"
            color="inherit"
            size="large"
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
