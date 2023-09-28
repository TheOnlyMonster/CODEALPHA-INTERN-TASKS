import { Container, Grow, Stack, Typography } from "@mui/material";
import CustomCard from "../components/CustomCard";
import Pagination from "@mui/material/Pagination";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import GenericCategorySkeleton from "../skeletons/GenericCategorySkeleton";
import convertPathToTitle from "../utils/convertPathToTitle";
const PER_PAGE = 4;
export default function GenericCategory({ url }) {
  const navigate = useNavigate();
  const { response } = useLoaderData();
  return (
    <Container>
      <Suspense fallback={<GenericCategorySkeleton />}>
        <Await resolve={response}>
          {(response) => (
            <>
              {response.data.blogs.length === 0 ? (
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  textAlign={"center"}
                  padding={3}
                >
                  No blogs found
                </Typography>
              ) : (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  padding={3}
                >
                  <Stack direction={"column"}>
                    <Typography
                      variant="overline"
                      gutterBottom
                      color={"#888c93"}
                    >
                      categories
                    </Typography>
                    <Typography variant="h3" fontWeight={"bold"}>
                      '{convertPathToTitle(url)}'
                    </Typography>
                  </Stack>
                  <Typography level="body2" fontSize={"sm"}>
                    Showing {PER_PAGE * (+response.data.currentPage - 1) + 1}-
                    {PER_PAGE * (+response.data.currentPage - 1) +
                      Math.min(PER_PAGE, response.data.blogs.length)}{" "}
                    of {response.data.blogsCount} results
                  </Typography>
                </Stack>
              )}
              {response.data.blogs.map((blog) => (
                <Grow in={true} key={blog._id}>
                  <div>
                    <CustomCard
                      content={blog}
                      img_md={3}
                      text_md={9}
                      title_fontSize={"sm"}
                      description_fontSize={"xs"}
                      img_sm={4}
                      text_sm={8}
                    />
                  </div>
                </Grow>
              ))}
              {response.data.blogs.length !== 0 && (
                <Pagination
                  count={Math.ceil(+response.data.blogsCount / PER_PAGE)}
                  color="primary"
                  variant="outlined"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onChange={(e, page) => {
                    navigate(`${url}?page=${page}`);
                  }}
                  defaultPage={1}
                  page={+response.data.currentPage}
                  shape="rounded"
                />
              )}
            </>
          )}
        </Await>
      </Suspense>
    </Container>
  );
}
