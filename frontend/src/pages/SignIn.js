import AspectRatio from "@mui/joy/AspectRatio";
import Grid from "@mui/joy/Grid";
import { Button, Container, Slide, Stack, Typography } from "@mui/material";
import GenericTextField from "../components/GenericTextField";
import GenericForm from "../components/GenericForm";
import * as yup from "yup";
import { Link } from "react-router-dom";
export default function SignIn() {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
  });
  return (
    <Container>
      <Slide in={true} direction="right">
        <div>
          <Grid container marginTop={4} spacing={2}>
            <Grid xs={12} md={5}>
              <AspectRatio ratio={"4/3"} sx={{ borderRadius: "20px" }}>
                <img
                  style={{ backgroundColor: "white" }}
                  src={"/assets/auth.jpg"}
                  alt="Sign In"
                />
              </AspectRatio>
            </Grid>
            <Grid xs={12} md={7} padding={3}>
              <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
                Sign In
              </Typography>
              <Typography textAlign={"center"} variant="body1" margin={2}>
                Yo, enter your details here
              </Typography>
              <GenericForm
                schema={schema}
                formNames={["email", "password"]}
                type="json"
                submitText={"Sign In"}
                action="/sign-in"
              >
                <Stack spacing={2}>
                  <GenericTextField name="email" label="Email" type="email" />
                  <GenericTextField
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Button>
                    <Link
                      to="/sign-up"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      Don't have an account? Sign up
                    </Link>
                  </Button>
                </Stack>
              </GenericForm>
            </Grid>
          </Grid>
        </div>
      </Slide>
    </Container>
  );
}
