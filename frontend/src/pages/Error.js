import Grid from "@mui/joy/Grid";
import { Container, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
export default function Error() {
  return (
    <Container>
      <Grid container spacing={2} padding={3}>
        <Grid xs={12} sm={6} md={4}>
          <AspectRatio ratio={"1/1"}>
            <img
              style={{ backgroundColor: "white" }}
              src={"/assets/error.png"}
              alt=""
            />
          </AspectRatio>
        </Grid>
        <Grid xs={12} sm={6} md={8}>
          <Typography variant="overline" fontSize="lg">
            Page Not Found
          </Typography>
          <Typography
            variant="h1"
            fontSize="200px"
            color="#b2b2b2"
            fontFamily={"monospace"}
          >
            404
          </Typography>
          <Typography
            variant="h1"
            fontSize="100px"
            fontFamily={"sans-serif"}
            gutterBottom
            sx={{ lineHeight: "1" }}
          >
            Out of <br></br>
            the box.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
