import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/joy/Grid";
import List from "@mui/material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/joy/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Container
        sx={{ paddingTop: "20px", paddingBottom: "20px", marginBottom: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} sx={{ display: { xs: "block", sm: "none" } }}>
            <Typography level="h3" textAlign={"center"}>
              CodeAlpha Blog
            </Typography>
          </Grid>
          <Grid xs={6} sm={3}>
            <TextField
              label="Search.."
              type="search"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography level="h3" textAlign={"center"}>
              CodeAlpha Blog
            </Typography>
          </Grid>
          <Grid xs={6} sm={3}>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={2}
              justifyContent={"flex-end"}
            >
              <TwitterIcon sx={{ fontSize: "0.7rem" }} />
              <GitHubIcon sx={{ fontSize: "0.7rem" }} />
              <LinkedInIcon sx={{ fontSize: "0.7rem" }} />
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
            {[
              "Sign In",
              "Post Blog",
              "My Blogs",
              "My Profile",
              "Sign New Admin",
              "All Categories",
              "Travel",
              "Food",
              "Technology",
              "Business",
            ].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  {index === 0 && (
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                  )}
                  <Link to={text.toLowerCase().replace(/\s+/g, "-")} style={{ textDecoration: "none", color: "black" }}>
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
