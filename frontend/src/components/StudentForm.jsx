import { forwardRef } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().max(50, "Too Long!").required("Required"),
  code: Yup.string().max(10, "Too Long!").required("Required"),
  grade: Yup.string()
    .matches(/^[2-9]|1[0-2]?$/, "Grades from 1 to 12")
    .required("Required"),
  dob: Yup.date().required("Required"),
  subjects: Yup.array().min(1, "Minimum 1 subject"),
});

export const StudentForm = forwardRef((props, ref) => {
  const student = props.student;
  const formik = useFormik({
    initialValues: {
      ...student,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.onSubmit({
        ...values,
        id: student.id,
        subject_ids: values.subjects,
      });
    },
  });
  const { isLoading, error, data } = useQuery("subjectsData", () =>
    fetch("/api/subjects").then((res) => res.json())
  );
  return (
    <div {...props} ref={ref}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ p: 2 }}
        onSubmit={formik.handleSubmit}
      >
        <Grid container justify="center" spacing={4} sx={{ px: 4 }}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="code"
              label="Code"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.code}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="grade"
              label="Grade"
              type="number"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.grade}
              error={formik.touched.grade && Boolean(formik.errors.grade)}
              helperText={formik.touched.grade && formik.errors.grade}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="dob"
              label="Date of birth"
              type="date"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.dob}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              id="progress"
              name="progress"
              label="Progress"
              onChange={formik.handleChange}
              value={formik.values.progress}
              error={formik.touched.progress && Boolean(formik.errors.progress)}
              helperText={formik.touched.progress && formik.errors.progress}
              variant="standard"
              fullWidth
            >
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="very_good">Very Good</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="fail">Fail</MenuItem>
            </TextField>
          </Grid>
          {!isLoading && (
            <Grid item xs={12}>
              <TextField
                select
                id="subjects"
                name="subjects"
                variant="standard"
                label="Subjects"
                fullWidth
                onChange={formik.handleChange}
                error={
                  formik.touched.subjects && Boolean(formik.errors.subjects)
                }
                helperText={formik.touched.subjects && formik.errors.subjects}
                SelectProps={{
                  multiple: true,
                  value: formik.values.subjects,
                }}
              >
                {data.data.map((subject) => (
                  <MenuItem value={subject.id} key={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item justifyContent="flex-end" xs={12}>
            <Grid container justifyContent="flex-end">
              <Button color="inherit" variant="outlined" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});
