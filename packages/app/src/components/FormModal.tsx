import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { TextField } from "formik-mui";
import * as Yup from "yup";

import { FormDialogProps, FormValues } from "../types/types";

const FormModal: React.FC<FormDialogProps> = ({
  isOpen,
  selectedMovie,
  onClose,
  onSubmitSuccess,
}) => {
  const initialValues: FormValues = {
    movieId: selectedMovie?.id || 0,
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
              'http://localhost:3000/submitReview',
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
            <DialogContent>
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
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default FormModal;
