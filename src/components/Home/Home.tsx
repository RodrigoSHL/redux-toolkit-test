import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";
import { Drawer as MUIDrawer } from "@mui/material/";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Navigation from "../../routes/Navigation";
import Navbar from "./NavBar/NavBar";
import Snackbar from "../Middleware/Snackbar";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



const Home = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const itemsList = [
    {
      text: "Home",
      icon: <InboxIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "About",
      icon: <MailIcon />,
      onClick: () => navigate("/balance"),
    },
    {
      text: "Contact",
      icon: <InboxIcon />,
      onClick: () => navigate("/resume"),
    },
    {
      text: "Maintainer",
      icon: <MailIcon />,
      onClick: () => navigate("/maintainers"),
    },
    {
      text: "Users",
      icon: <InboxIcon />,
      onClick: () => navigate("/user"),
    },
    {
      text: "Profile",
      icon: <MailIcon />,
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <Box>
      <Navbar drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer open={open} variant="permanent">
        
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Navigation/>
        <Snackbar/>
      </Box>
    </Box>
  );
};

export default Home;
