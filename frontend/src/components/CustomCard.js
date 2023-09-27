import Grid from "@mui/joy/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
export default function CustomCard({img_md, text_md, title_fontSize}) {
  return (
    <Grid container spacing={2} padding={3}>
      <Grid xs={12} md={img_md}>
        <AspectRatio sx={{ borderRadius: "lg" }} ratio={"4/3"}>
          <img
            src="https://preview.colorlib.com/theme/magdesign/images/post_lg_1.jpg.webp"
            alt=""
          />
        </AspectRatio>
      </Grid>
      <Grid xs={12} md={text_md}>
        <Stack direction={"row"} spacing={1}>
          <Typography level="h1" fontSize={"xs"}>
            Business, Travel
          </Typography>
          <Typography level="body2" fontSize={"xs"}>
            — July 2, 2020
          </Typography>
        </Stack>
        <Typography level="h2" fontSize={title_fontSize}>
          Your most unhappy customers are your greatest source of learning.
        </Typography>
        <Typography paddingTop={2}>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
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
