import { Container, Grow } from "@mui/material";
import CustomCard from "../components/CustomCard";
import Pagination from "@mui/material/Pagination";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import GenericCategorySkeleton from "../skeletons/GenericCategorySkeleton";
const PER_PAGE = 4;
export default function GenericCategory() {
  const { response } = useLoaderData();
  return (
    <Container>
      <Suspense fallback={<GenericCategorySkeleton />}>
        <Await resolve={response}>
          {(response) => (
            <>
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
              <Pagination
                count={Math.ceil(+response.data.blogsCount / PER_PAGE)}
                color="primary"
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                defaultPage={1}
                shape="rounded"
              />
            </>
          )}
        </Await>
      </Suspense>
    </Container>
  );
}
