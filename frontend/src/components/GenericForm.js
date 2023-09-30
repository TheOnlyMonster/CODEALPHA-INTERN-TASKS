import { Formik } from "formik";
import { useFetcher } from "react-router-dom";
import GenericTextField from "./GenericTextField";
import { Box, Button } from "@mui/material";

export default function GenericForm({
  formNames = [],
  type = null,
  onClose = null,
  initialValues = false,
  schema,
  children,
  submitText,
  enableReinitialize = true,
  method = "post",
  action,
}) {
  const fetcher = useFetcher();
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
    } else {
      data = values;
    }
    fetcher.submit(data, {
      method,
      action,
      encType: type === "mixed" ? "multipart/form-data" : "",
    });
  }
  if (!initialValues) {
    initialValues = {};
    for (const formName of formNames) {
      initialValues[formName] = "";
    }
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
          {
            <Box marginTop={"20px"} display={"flex"} gap={"10px"} >
              <Button type="submit" variant="contained">
                {submitText}
              </Button>
              {onClose && (
                <Button variant="outlined" onClick={() => onClose(false)}>
                  Cancel
                </Button>
              )}
            </Box>
          }
        </fetcher.Form>
      )}
    </Formik>
  );
}
