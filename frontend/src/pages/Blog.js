import { Suspense } from "react";
import { Await, Navigate, useLoaderData } from "react-router-dom";
import GenericCategorySkeleton from "../skeletons/GenericCategorySkeleton";
import { Container, Grow } from "@mui/material";
import CustomCard from "../components/CustomCard";
import { AxiosError } from "axios";
export default function Blog() {
  const { response } = useLoaderData();
  return (
    <Container>
      <Suspense fallback={<GenericCategorySkeleton />}>
        <Await resolve={response}>
          {(resolvedResponse) => {
            return resolvedResponse instanceof AxiosError ? (
              <Navigate to="/" />
            ) : (
              <Grow in={true}>
                <div>
                  <CustomCard
                    content={resolvedResponse.data}
                    img_md={8}
                    text_md={12}
                    isLink={false}
                  />
                  <p
                    style={{
                      padding: "1rem",
                      paddingLeft: "1.5rem",
                      lineBreak: "anywhere",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "20px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: resolvedResponse.data.content,
                    }}
                  />
                </div>
              </Grow>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}
