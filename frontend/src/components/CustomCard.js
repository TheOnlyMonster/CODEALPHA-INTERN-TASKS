import Grid from "@mui/joy/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import getImageSrc from "../utils/getImageSrc";
import formatDate from "../utils/formatDate";
export default function CustomCard({
  img_md,
  text_md,
  title_fontSize,
  description_fontSize,
  img_sm,
  text_sm,
  content,
}) {
  return (
    <Grid
      container
      spacing={2}
      padding={3}
      sx={{
        ":hover": { cursor: "pointer", transform: "scale(1.03)" },
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
        <Typography paddingTop={2} fontSize={description_fontSize}>
          {content.description}
        </Typography>
        <Stack direction={"row"} spacing={2} paddingTop={2}>
          <AspectRatio
            sx={{ borderRadius: "50%", width: "30px" }}
            ratio={"1/1"}
          >
            <img
              src="https://preview.colorlib.com/theme/magdesign/images/person_1.jpg.webp"
              alt=""
            />
          </AspectRatio>
          <Stack direction={"column"}>
            <Typography level="h1" fontSize={"xs"}>
              Sergy Campbell
            </Typography>
            <Typography level="body2" fontSize={"xs"}>
              Author, 26 published post
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
