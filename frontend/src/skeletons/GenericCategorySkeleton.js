import Grid from "@mui/joy/Grid";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
export default function GenericCategorySkeleton() {
  return [...Array(4)].map((_, index) => (
    <Grid key={index} container spacing={2} padding={4}>
      <Grid xs={12} sm={6} md={4}>
        <Skeleton
          key={index}
          animation="wave"
          variant="rectangular"
          sx={{ borderRadius: "20px" }}
          height={200}
        />
      </Grid>
      <Grid xs={12} sm={6} md={8}>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" sx={{ height: "35px" }} />
        <Skeleton animation="wave" variant="text" sx={{ height: "100px" }} />
        <Stack direction={"row"} spacing={2}>
          <Skeleton animation="wave" variant="circular" width={30} height={30} />
          <Skeleton animation="wave" variant="text" sx={{ width: "100px" }} />
        </Stack>
      </Grid>
    </Grid>
  ));
}
