import AspectRatio from "@mui/joy/AspectRatio";
import Grid from "@mui/joy/Grid";
import { Button, Container, Slide, Stack, Typography } from "@mui/material";
import GenericTextField from "../components/GenericTextField";
import GenericForm from "../components/GenericForm";
import * as yup from "yup";
import { Link } from "react-router-dom";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export default function SignUp() {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters long")
      .max(20, "First name must be at most 20 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters long")
      .max(20, "Last name must be at most 20 characters"),
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
  });
  return (
    <Container>
      <Slide in={true} direction="left">
        <div>
          <Grid container marginTop={4} spacing={2}>
            <Grid xs={12} md={7} padding={3}>
              <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
                Sign Up
              </Typography>
              <Typography textAlign={"center"} variant="body1" margin={2}>
                Yo yo yo, nice to see u! enter your details to post awesome blog
              </Typography>
              <GenericForm
                schema={schema}
                formNames={[
                  "email",
                  "password",
                  "confirmPassword",
                  "firstName",
                  "lastName",
                  "image",
                ]}
                type="mixed"
                submitText={"Sign Up"}
                action="/sign-up"
              >
                <Stack spacing={2}>
                  <GenericTextField name="firstName" label="First Name" />
                  <GenericTextField name="lastName" label="Last Name" />
                  <GenericTextField name="email" label="Email" type="email" />
                  <GenericTextField
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <GenericTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                  <Button>
                    <Link
                      to="/sign-in"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Button>
                </Stack>
              </GenericForm>
            </Grid>
            <Grid xs={12} md={5}>
              <AspectRatio ratio={"4/4"} sx={{ borderRadius: "20px" }}>
                <img
                  style={{ backgroundColor: "white" }}
                  src={"/assets/auth.png"}
                  alt="Sign Up"
                />
              </AspectRatio>
            </Grid>
          </Grid>
        </div>
      </Slide>
    </Container>
  );
}
