import { TextField, Typography } from "@mui/material";
import { useField } from "formik";

export default function GenericTextField({
  label,
  type,
  name,
  setFieldValue = null,
  disabled = false,
  value = null,
  size = "small",
  width = "100%",
  multiline=false,
}) {
  const [field, meta] = useField(name);
  if (type === "file") {
    return (
      <>
        <TextField
          sx={{ width }}
          size={size}
          onChange={(e) => {
            setFieldValue(name, e.target.files[0]);
          }}
          label={type === "file" ? "" : label}
          variant="outlined"
          type={type}
          error={meta.touched && Boolean(meta.error)}
          name={name}
        />
        {meta.touched && meta.error && (
          <Typography variant="body2" color="error">
            {meta.error}
          </Typography>
        )}
      </>
    );
  }
  return (
    <>
      <TextField
        sx={{ width }}
        size={size}
        {...field}
        label={type === "file" ? "" : label}
        variant="outlined"
        multiline={multiline}
        rows={4}
        type={type}
        error={meta.touched && Boolean(meta.error)}
        name={name}
        disabled={disabled}
        value={value || field.value}
      />
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error">
          {meta.error}
        </Typography>
      )}
    </>
  );
}
