import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Container, Divider, Drawer, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const drawerWidth = 925;
function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [result, setResult] = React.useState([]);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        let resp = await fetch("https://fakestoreapi.com/products/");
        let result = await resp.json();
        setResult(result);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        // position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ margin: "20px" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {result.map((item, ind) => {
              return <RecipeReviewCard id={item.id} data={item} />;
            })}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Drawer
            sx={{
              // width: drawerWidth,
              flexShrink: 0,
              padding: "20px",
              flexGrow: 1,
              "& .MuiDrawer-paper": {
                // width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            PaperProps={{
              sx: { width: "50%" },
            }}
            variant="permanent"
            anchor="right"
          >
            <Grid container spacing={2} sx={{ marginTop: "40px" }}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                </Avatar>
              </Grid>
              <Divider />
              <Grid item xs={6}>
                <List sx={{ padding: "20px", marginTop: "40px" }}>
                  {["Home", "Search", "Posts", "Live"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
      </Grid>
    </Box>
  );
}
export default function Posts() {
  return (
    <div>
      <MenuAppBar />
    </div>
  );
}

export function RecipeReviewCard({ data, id }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id={id} sx={{ margin: "15px", padding: "15px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data?.title}
        subheader={data?.category}
      />
      <CardMedia
        component="img"
        height="300"
        width="500"
        image={data?.image}
        alt={data?.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data?.description}
        </Typography>
        <div>
          <Button>Like</Button>
          <Button>Share</Button>
          <Button>Comments</Button>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <HoverRating rating={data?.rating} />
      </CardActions>
    </Card>
  );
}

function HoverRating({ rating }) {
  // const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating?.rate}
        precision={0.5}
        getLabelText={getLabelText}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        readOnly
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating?.rate !== null && <Box sx={{ ml: 2 }}>{rating?.count}</Box>}
    </Box>
  );
}

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
