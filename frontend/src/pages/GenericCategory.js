import { Container } from "@mui/material";
import CustomCard from "../components/CustomCard";
import Pagination from "@mui/material/Pagination";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
const PER_PAGE = 4;
export default function GenericCategory() {
  const { response } = useLoaderData();
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={response}>
          {(response) => (
            <>
              {response.data.blogs.map((blog) => (
                <CustomCard
                  key={blog._id}
                  content={blog}
                  img_md={3}
                  text_md={9}
                  title_fontSize={"sm"}
                  description_fontSize={"xs"}
                  img_sm={4}
                  text_sm={8}
                />
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
