import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import List from "@mui/material/List";
import Typography from "@mui/joy/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Link, useLoaderData, useSubmit } from "react-router-dom";
export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const submit = useSubmit();
  const listItems = useLoaderData();
  function getResponsiveGrid(isXSmall) {
    return (
      <Grid
        xs={12}
        sm={6}
        sx={{
          display: {
            xs: isXSmall ? "block" : "none",
            sm: isXSmall ? "none" : "block",
          },
        }}
      >
        <Typography level="h3" textAlign={"center"}>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
            to="/home"
          >
            CodeAlpha Internship Blog
          </Link>
        </Typography>
      </Grid>
    );
  }
  return (
    <>
      <Container
        sx={{ paddingTop: "20px", paddingBottom: "20px", marginBottom: "20px" }}
      >
        <Grid container spacing={2}>
          {getResponsiveGrid(true)}
          <Grid xs={6} sm={3}>
            <TextField
              label="Search.."
              type="search"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              onKeyPress={(e) => {
                const searchValue = e.target.value;
                if (e.key === "Enter" && searchValue) {
                  submit(null, {
                    method: "get",
                    action: `/search/${searchValue}`,
                  });
                }
              }}
            />
          </Grid>
          {getResponsiveGrid(false)}
          <Grid xs={6} sm={3}>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={2}
              justifyContent={"flex-end"}
            >
              <a
                style={{ color: "inherit" }}
                href="https://twitter.com/RealMonsterPlay"
              >
                <TwitterIcon sx={{ fontSize: "0.7rem" }} />
              </a>
              <a
                style={{ color: "inherit" }}
                href="https://github.com/TheOnlyMonster"
              >
                <GitHubIcon sx={{ fontSize: "0.7rem" }} />
              </a>
              <a
                style={{ color: "inherit" }}
                href="https://www.linkedin.com/in/abdelrahman-adel-843428224/"
              >
                <LinkedInIcon sx={{ fontSize: "0.7rem" }} />
              </a>
              <IconButton onClick={() => setIsMenuOpen(true)} color="primary">
                <MenuIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <List>
            {listItems.map((text, index) => (
              <ListItem key={text}>
                <ListItemButton sx={{ padding: "0px" }}>
                  <Link
                    to={text.toLowerCase().replace(/\s+/g, "-")}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                      padding: "10px",
                      paddingLeft: "40px",
                    }}
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
      <Divider />
    </>
  );
}
