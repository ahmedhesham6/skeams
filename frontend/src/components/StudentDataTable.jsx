import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { useMutation, useQueryClient } from "react-query";

const mapProgress = {
  excellent: "Excellent",
  very_good: "Very Good",
  good: "Good",
  fair: "Fair",
  fail: "Fail",
};

export default function StudentDataTable({
  rows,
  isLoading,
  editStudentDetails,
}) {
  const queryClient = useQueryClient();
  const deleteStudent = useMutation(
    (id) => {
      return fetch(`/api/students/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
      );
    },
    {
      onSuccess: (data, variables, context) => {
        console.log({ data });
        queryClient.invalidateQueries("studentsData");
      },
    }
  );

  let body;
  if (isLoading) {
    body = [...Array(10).keys()].map((num) => (
      <TableRow
        key={num}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    ));
  } else {
    body = rows.map((row) => (
      <TableRow
        key={row.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.code}</TableCell>
        <TableCell align="center">{row.grade}</TableCell>
        <TableCell align="center">{row.dob}</TableCell>
        <TableCell align="center">{mapProgress[row.progress]}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="edit"
            color="inherit"
            onClick={() => {
              editStudentDetails(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="inherit"
            onClick={() => {
              deleteStudent.mutate(row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <div style={{ margin: "50px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
