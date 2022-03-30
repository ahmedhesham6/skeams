import StudentDataTable from "../components/StudentDataTable";
import StudentFormModal from "../components/StudentFormModal";
import { forwardRef, useState } from "react";
import Header from "../components/Header";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultStudent = {
  name: "",
  code: "",
  grade: "",
  dob: "",
  progress: "",
  subjects: [],
};

export default function Home() {
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [student, setStudent] = useState(defaultStudent);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery("studentsData", () =>
    fetch("/api/students").then((res) => res.json())
  );

  const addStudent = useMutation(
    async (student) => {
      return await apiClient.post("/students", student);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("studentsData");
        handleCloseAddStudent();
      },
      onError: (error, variables, context) => {
        setErrorMessage(error.response.data.message);
        setOpenToast(true);
      },
    }
  );

  const updateStudent = useMutation(
    async (student) => {
      return await apiClient.patch(`/students/${student.id}`, student);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("studentsData");
        handleCloseEditStudent();
      },
      onError: (error, variables, context) => {
        setErrorMessage(error.response.data.message);
        setOpenToast(true);
      },
    }
  );

  const handleOpenAddStudent = () => setOpenAddStudent(true);
  const handleOpenEditStudent = () => setOpenEditStudent(true);

  const handleCloseAddStudent = () => {
    setOpenAddStudent(false);
    setStudent(defaultStudent);
  };
  const handleCloseEditStudent = () => {
    setOpenEditStudent(false);
    setStudent(defaultStudent);
  };

  const editStudent = (studentDetails) => {
    studentDetails.subjects = studentDetails.subjects.map((sub) => sub.id);
    setStudent(studentDetails);
    handleOpenEditStudent();
  };

  const submitAddStudent = (studentDetails) => {
    addStudent.mutate(studentDetails);
  };
  const submitEditStudent = (studentDetails) => {
    updateStudent.mutate(studentDetails);
  };

  return (
    <>
      <Header handleOpen={handleOpenAddStudent} />

      <StudentDataTable
        rows={data?.data}
        isLoading={isLoading}
        editStudentDetails={editStudent}
      />

      <StudentFormModal
        open={openAddStudent}
        label={"Add Student"}
        handleClose={handleCloseAddStudent}
        handleSubmit={submitAddStudent}
        student={student}
      />

      <StudentFormModal
        open={openEditStudent}
        label={"Edit Student"}
        handleClose={handleCloseEditStudent}
        handleSubmit={submitEditStudent}
        student={student}
      />

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={() => setOpenToast(false)}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
