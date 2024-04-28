import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios, { AxiosError } from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import { TextField } from "formik-mui";
import * as Yup from "yup";

const FormModal: React.FC<FormDialogProps> = ({
  isOpen,
  selectedMovie,
  onClose,
  onSubmitSuccess,
}) => {
  const initialValues: FormValues = {
    movieId: selectedMovie?.id || 0,
    rating: 0,
    review: "",
  };

  const validationSchema = Yup.object({
    review: Yup.string().max(100, "Review must be 100 characters or less"),
  });

  const [submitError, setSubmitError] = useState<string>("");

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setSubmitError("");

          values.movieId = selectedMovie?.id;

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_ENDPOINT}/submitReview`,
              values
            );
            onSubmitSuccess(response.data.message);
            onClose();
          } catch (err: any) {
            console.error("Failed to submit form:", err);
            setSubmitError(
              err.response?.data?.message || "Failed to submit form"
            );
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <DialogTitle>Review "{selectedMovie?.title}"</DialogTitle>
            <DialogContent>
              <DialogContentText variant="h6" sx={{ mt: 2 }}>
                Rating
              </DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 0.5,
                  mt: 2,
                  gap: 1,
                }}
              >
                <Rating
                  max={10}
                  defaultValue={0}
                  value={values.rating}
                  name="rating"
                  onChange={(_, value) => setFieldValue("rating", value ?? 0)}
                />
                <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                  {values.rating}/10
                </Typography>
              </Box>
              <Field
                component={TextField}
                multiline
                rows={4}
                required
                margin="dense"
                name="review"
                label="Review"
                fullWidth
                variant="standard"
              />
              {errors.review && touched.review && (
                <p style={{ color: "red" }}>{errors.review}</p>
              )}
              {submitError && <p>Error: {submitError}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                Review
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default FormModal;
