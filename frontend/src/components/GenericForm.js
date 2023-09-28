import { Formik } from "formik";
import { useFetcher, useSubmit } from "react-router-dom";
import GenericTextField from "./GenericTextField";
import { Box } from "@mui/material";
import styles from "./GenericForm.module.css";
export default function GenericForm({
  formNames = [],
  type = null,
  item = null,
  schema,
  children,
  submitText,
  enableReinitialize = true,
  action,
  token = null,
}) {
  const fetcher = useFetcher();
  const submit = useSubmit();
  function formSubmitHandler(values) {
    let data;
    if (type === "mixed") {
      data = new FormData();
      formNames.forEach((name) => {
        if (Array.isArray(values[name])) {
          const valuesArray = values[name].map((value) => value.value);
          data.append(name, valuesArray);
        } else {
          data.append(name, values[name]);
        }
      });
    } else if (type === "json") {
      data = JSON.stringify(values);
    } else {
      data = item;
    }
    submit(data, { method: "post", action, encType: "multipart/form-data" });
  }
  const initialValues = {};
  for (const formName of formNames) {
    initialValues[formName] = "";
  }
  return (
    <Formik
      onSubmit={formSubmitHandler}
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize={enableReinitialize}
    >
      {({ handleSubmit, setFieldValue }) => (
        <fetcher.Form onSubmit={handleSubmit} method="post">
          {type === "mixed" && (
            <Box sx={{ marginBottom: "20px" }}>
              <GenericTextField
                label="Image"
                type="file"
                helperText="Image"
                name="image"
                setFieldValue={setFieldValue}
              />
            </Box>
          )}
          {children}
          <button type="submit" className={styles.btn}>
            {submitText}
          </button>
        </fetcher.Form>
      )}
    </Formik>
  );
}
