import Grid from "@mui/joy/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import getImageSrc from "../utils/getImageSrc";
import formatDate from "../utils/formatDate";
import { Link, useFetcher } from "react-router-dom";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import EditBlog from "../pages/EditBlog";
import { Button, Container, Modal } from "@mui/material";
import { useState } from "react";
export default function CustomCard({
  img_md,
  text_md,
  title_fontSize,
  description_fontSize,
  img_sm,
  text_sm,
  content,
  isLink = true,
}) {
  const fetcher = useFetcher();
  const [editBlog, setEditBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const actions = (
    <Stack direction={"row"} justifyContent={"flex-end"} padding={2}>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "outlined", color: "neutral" },
          }}
          size="sm"
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end">
          <MenuItem onClick={() => setEditBlog(true)}>
            <ListItemDecorator>
              <Edit />
            </ListItemDecorator>{" "}
            Edit post
          </MenuItem>
          <ListDivider />
          <MenuItem
            onClick={() => setDeleteBlog(true)}
            variant="soft"
            color="danger"
          >
            <ListItemDecorator sx={{ color: "inherit" }}>
              <DeleteForever />
            </ListItemDecorator>{" "}
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    </Stack>
  );
  const card = (
    <>
      <Grid
        container
        spacing={2}
        padding={3}
        sx={{
          ":hover": {
            cursor: isLink ? "pointer" : "default",
            transform: isLink ? "scale(1.03)" : "none",
            backgroundColor: isLink ? "#f8f9fa" : "none",
          },
          borderRadius: "20px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Grid xs={12} sm={img_sm} md={img_md}>
          <AspectRatio sx={{ borderRadius: "lg" }} ratio={"4/3"}>
            <img src={getImageSrc(content.image)} alt={content.title} />
          </AspectRatio>
        </Grid>
        <Grid xs={12} sm={text_sm} md={text_md}>
          <Stack direction={"row"} spacing={1}>
            <Typography level="h1" fontSize={"xs"}>
              {content.type.join(", ")}
            </Typography>
            <Typography level="body2" fontSize={"xs"}>
              — {formatDate(content.createdAt)}
            </Typography>
          </Stack>
          <Typography level="h2" fontSize={title_fontSize}>
            {content.title}
          </Typography>
          <Typography
            paddingTop={2}
            sx={{ lineBreak: "anywhere" }}
            fontSize={description_fontSize}
          >
            {content.description}
          </Typography>
          <Stack direction={"row"} spacing={2} paddingTop={2}>
            <AspectRatio
              sx={{ borderRadius: "50%", width: "30px" }}
              ratio={"1/1"}
            >
              <img
                src={getImageSrc(content.userId.image)}
                alt={content.userId.Fname}
              />
            </AspectRatio>
            <Stack direction={"column"}>
              <Typography level="h1" fontSize={"xs"}>
                {content.userId.Fname} {content.userId.Lname}
              </Typography>
              <Typography level="body2" fontSize={"xs"}>
                Author, {content.userId.publishedPost} published post
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );

  return isLink ? (
    <Link
      style={{ textDecoration: "inherit", color: "inherit" }}
      to={`/blog/${content._id}`}
    >
      {card}
    </Link>
  ) : (
    <>
      {content.userId._id === localStorage.getItem("userId") && actions}
      {editBlog && (
        <Modal open={editBlog} onClose={() => setEditBlog(false)}>
          <div>
            <EditBlog data={content} setEditBlog={setEditBlog} />
          </div>
        </Modal>
      )}
      {deleteBlog && (
        <Modal open={deleteBlog} onClose={() => setDeleteBlog(false)}>
          <Container
            maxWidth="sm"
            sx={{
              textAlign: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "20px",
              marginTop: "300px",
            }}
          >
            <Typography padding={3} level="h2">
              Are you sure you want to delete this post?
            </Typography>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent={"center"}
              padding={2}
            >
              <Button variant="outlined" onClick={() => setDeleteBlog(false)}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() =>
                  fetcher.submit(null, {
                    method: "delete",
                    action: `/delete-blog/${content._id}`,
                  })
                }
              >
                Delete
              </Button>
            </Stack>
          </Container>
        </Modal>
      )}
      {card}
    </>
  );
}
