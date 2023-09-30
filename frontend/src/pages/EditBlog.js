import * as yup from "yup";
import GenericForm from "../components/GenericForm";
import { Container, Stack } from "@mui/material";
import Grid from "@mui/joy/Grid";
import { Field } from "formik";
import ReactQuill from "react-quill";
import GenericTextField from "../components/GenericTextField";
export default function EditBlog({ data, setEditBlog }) {
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
    content: yup.string().required("Content is required"),
  });
  return (
    <Container>
      <Stack
        bgcolor={"#f8f9fa"}
        borderRadius={"20px"}
        marginTop={"120px"}
        padding={5}
      >
        <GenericForm
          method="put"
          schema={schema}
          formNames={["title", "description", "content"]}
          type="json"
          submitText={"Update"}
          action={`/update-blog/${data._id}`}
          enableReinitialize={false}
          initialValues={{
            title: data.title,
            description: data.description,
            content: data.content,
          }}
          onClose={setEditBlog}
        >
          <Grid container spacing={3}>
            <Grid xs={12}>
              <GenericTextField label="Title" name="title" type={"text"} />
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
                    defaultValue={data.content}
                    onChange={field.onChange(field.name)}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
        </GenericForm>
        
      </Stack>
    </Container>
  );
}
