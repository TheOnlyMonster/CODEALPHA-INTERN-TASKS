import { Container, Grow, Stack, Typography } from "@mui/material";
import CustomCard from "../components/CustomCard";
import Pagination from "@mui/material/Pagination";
import {
  Await,
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Suspense } from "react";
import GenericCategorySkeleton from "../skeletons/GenericCategorySkeleton";
import convertPathToTitle from "../utils/convertPathToTitle";
import { toast } from "react-toastify";
const PER_PAGE = 4;
export default function GenericCategory() {
  const navigate = useNavigate();
  const { response } = useLoaderData();
  const location = useLocation();
  return (
    <Container>
      <Suspense fallback={<GenericCategorySkeleton />}>
        <Await resolve={response}>
          {(response) => {
            if (response.data.blogs.length === 0) {
              toast.error("Sorry, we couldn't find any blog in this category", {
                autoClose: 2000,
                position: "bottom-left",
              });
              return <Navigate to="/" />;
            }
            return (
              <>
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
                      {location.pathname.includes("/search")
                        ? "Search Results"
                        : "categories"}
                    </Typography>
                    <Typography variant="h3" fontWeight={"bold"}>
                      {location.pathname.includes("/search")
                        ? location.pathname.split("/search/")[1]
                        : convertPathToTitle(
                            location.pathname,
                            location.pathname === "/my-blogs"
                          )}
                    </Typography>
                  </Stack>
                  <Typography level="body2" fontSize={"sm"}>
                    Showing {PER_PAGE * (+response.data.currentPage - 1) + 1}-
                    {PER_PAGE * (+response.data.currentPage - 1) +
                      Math.min(PER_PAGE, response.data.blogs.length)}{" "}
                    of {response.data.blogsCount} results
                  </Typography>
                </Stack>
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
                      marginTop: "20px",
                    }}
                    onChange={(e, page) => {
                      navigate(`${location.pathname}?page=${page}`);
                    }}
                    defaultPage={1}
                    page={+response.data.currentPage}
                    shape="rounded"
                  />
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}
