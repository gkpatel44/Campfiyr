import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

import React from "react";
import { Button } from "@material-ui/core";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Required! What shall we call you?")
    .max(60, "Must be 60 characters or less"),
  email: yup
    .string()
    .email("That email address doesn't look right")
    .required("Email is required, how else would we reach you?"),

  message: yup
    .string()
    .required("Required!")
    .max(200, "No more than 200 characters please!"),
});

const inputFieldValues = [
  {
    name: "fullName",
    label: "Full Name",
    id: "fullName",
  },
  {
    name: "email",
    label: "Email",
    id: "email",
  },
  {
    name: "message",
    label: "Message",
    id: "message",
    multiline: true,
    rows: 10,
    inputProps: { maxLength: 150 },
  },
];

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      //   values = { ...values, ...formValues };
      //   handleUpdateState(formValues);
      alert("This form currently doesn't do anything. To be implemented");
      //   alert(JSON.stringify(formValues, null, 2));
      //   proceed();
    },
  });
  return (
    <div style={{ color: "#fff" }}>
      <form onSubmit={formik.handleSubmit}>
        {inputFieldValues.map((inputFieldValue, index) => {
          return (
            <TextField
              key={index}
              onChange={formik.handleChange}
              variant="filled"
              name={inputFieldValue.name}
              label={inputFieldValue.label}
              multiline={inputFieldValue.multiline ?? false}
              inputProps={inputFieldValue.inputProps ?? {}}
              fullWidth
              rows={inputFieldValue.rows ?? 1}
              helperText={
                formik.touched[inputFieldValue.name] &&
                formik.errors[inputFieldValue.name]
              }
              error={
                formik.touched[inputFieldValue.name] &&
                Boolean(formik.errors[inputFieldValue.name])
              }
              style={{ margin: "0.5em", color: "#fff" }}
            />
          );
        })}
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          style={{ margin: "0.5em" }}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
