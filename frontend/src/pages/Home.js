import Container from "@mui/material/Container";
import CustomCard from "../components/CustomCard";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { Box, Grow } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import GenericCategorySkeleton from "../skeletons/GenericCategorySkeleton";
export default function Home() {
  const { response } = useLoaderData();
  return (
    <>
      <Container>
        <Suspense fallback={<GenericCategorySkeleton />}>
          <Await resolve={response}>
            {(response) =>
              response.data.blogs.length === 0 ? (
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  padding={3}
                >
                  No blogs found
                </Typography>
              ) : (
                <>
                  <Grow in={true}>
                    <div>
                      <Carousel>
                        {response.data.blogs
                          .slice(0, -Math.min(6, response.data.blogs.length))
                          .map((blog) => (
                            <CustomCard
                              img_md={4}
                              text_md={8}
                              content={blog}
                              key={blog._id}
                            />
                          ))}
                      </Carousel>
                    </div>
                  </Grow>
                  <Typography
                    level="h1"
                    fontSize="2xl"
                    textAlign="center"
                    padding={3}
                  >
                    Recent
                  </Typography>
                  <Grid container spacing={2} padding={3}>
                    {response.data.blogs
                      .slice(Math.max(0, response.data.blogs.length - 6))
                      .map((blog) => (
                        <Grid md={4} key={blog._id}>
                          <CustomCard
                            img_md={12}
                            text_md={12}
                            title_fontSize="lg"
                            content={blog}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </>
              )
            }
          </Await>
        </Suspense>
      </Container>
      <Box sx={{ backgroundColor: "#f8f9fa" }}>
        <Container sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Typography
            level="h2"
            paddingBottom={3}
            textAlign={{ xs: "center", md: "left" }}
          >
            Subscribe to newsletter
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={9}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
