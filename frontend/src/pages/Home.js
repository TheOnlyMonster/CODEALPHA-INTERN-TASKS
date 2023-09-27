import Container from "@mui/material/Container";
import CustomCard from "../components/CustomCard";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
export default function Home() {
  return (
    <>
      <Container>
        <Typography
          level="h1"
          fontSize={"2xl"}
          textAlign={"center"}
          padding={5}
        >
          Home
        </Typography>
        <CustomCard img_md={4} text_md={8} />
        <Grid container spacing={2} padding={3}>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
          <Grid md={4}>
            <CustomCard img_md={12} text_md={12} title_fontSize={"lg"} />
          </Grid>
        </Grid>
      </Container>
      <Box sx={{backgroundColor: "#f8f9fa"}}>
        <Container sx={{paddingTop: "20px", paddingBottom: "20px"}}>
          <Typography
            level="h2"
            paddingBottom={3}
            textAlign={"left"}
          >
            Subscribe to newsletter
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            sx={{ width: "68%", marginRight: "2%" }}
            
          />
          <Button
            variant="contained"
            // color="#f9b65a"
            color="primary"
            sx={{width: "30%"}}
          >
            Subscribe
          </Button>
        </Container>
      </Box>
    </>
  );
}
