import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { TextField as FormikTextField } from "formik-mui";
import * as Yup from "yup";

import { ReviewFormProps } from "../types/types";

const ReviewForm: React.FC<ReviewFormProps> = ({
  selectedMovie,
  onClose,
  onSubmitSuccess,
}) => {
  const initialValues = {
    movieId: selectedMovie?.id || 0,
    review: "",
  };

  const validationSchema = Yup.object({
    review: Yup.string()
      .required("Review is required")
      .max(100, "Review must be 100 characters or less"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/submitReview",
            values
          );
          onSubmitSuccess(response.data.message); // Call the passed success handler with the response message
          onClose();
        } catch (err: any) {
          console.error("Failed to submit form:", err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Typography variant="h6">Review "{selectedMovie?.title}"</Typography>
          <Field
            component={FormikTextField}
            name="review"
            label="What did you think of the film?"
            multiline
            rows={4}
            required
            fullWidth
            margin="dense"
            variant="standard"
          />
          {errors.review && touched.review && (
            <Typography color="error">{errors.review}</Typography>
          )}
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} color="primary">
            Submit Review
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
