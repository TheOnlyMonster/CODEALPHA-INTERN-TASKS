import Container from "@mui/material/Container";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import * as yup from "yup";
import GenericForm from "../components/GenericForm";
import GenericTextField from "../components/GenericTextField";
import Select from "react-select";
import { Field } from "formik";
import "./PostBlog.css"
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const options = [
  { value: "Travel", label: "Travel" },
  { value: "Food", label: "Food" },
  { value: "Technology", label: "Technology" },
  { value: "Business", label: "Business" },
];
function BlogPost() {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters long")
      .max(60, "Title must be at most 60 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(300, "Description must be at most 300 characters"),
    type: yup
      .array()
      .required("Category is required")
      .min(1, "Please select at least one category"),
    image: yup
      .mixed()
      .required("Image is required")
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .png",
        (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      ),
    content: yup.string().required("Content is required"),
  });
  return (
    <>
    <Container sx={{ paddingTop: "20px" }}>
      <Typography
        level="h2"
        paddingBottom={3}
        textAlign={{ xs: "center", md: "left" }}
      >
        Write a blog
      </Typography>
      <GenericForm
        schema={schema}
        formNames={["title", "description", "image", "content", "type"]}
        type="mixed"
        submitText={"Publish"}
        action="/post-blog"
      >
        <Grid container rowSpacing={3}>
          <Grid xs={12}>
            <GenericTextField label="Title" name="title" type={"text"} />
          </Grid>
          <Grid xs={12}>
            <Grid xs={12}>
              <Field name="type">
                {({ field, meta }) => (
                  <>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={options}
                      placeholder="Select categories"
                      value={field.value}
                      onChange={(selectedOptions) => {
                        field.onChange({
                          target: {
                            name: "type",
                            value: selectedOptions,
                          },
                        });
                      }}
                    />
                    {meta.touched && meta.error && (
                      <Typography variant="body2" color="error">
                        {meta.error}
                      </Typography>
                    )}
                  </>
                )}
              </Field>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <GenericTextField
              label="Description"
              name="description"
              type={"text"}
              multiline={true}
            />
          </Grid>
          <Grid xs={12}>
            <Field name="content">
              {({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange(field.name)}
                />
              )}
            </Field>
          </Grid>
        </Grid>
      </GenericForm>
      </Container>
      
    </>
  );
}

export default BlogPost;
