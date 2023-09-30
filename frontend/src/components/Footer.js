import Container from "@mui/material/Container";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
export default function Footer() {
  return (
    <Container>
      <Typography level="body-xs" textAlign={"center"} padding={5}>
        Copyright ©2023 All rights reserved | This template is made with{" "}
        <FavoriteIcon fontSize="2px" /> by{" "}
        <a
          style={{ color: "inherit" }}
          href="https://www.linkedin.com/in/abdelrahman-adel-843428224/"
        >
          Abdelrahman Adel
        </a>
      </Typography>
    </Container>
  );
}
