import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../redux/auth/auth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Stack, Tooltip } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth?.user?.role) === "admin";

  const loginHandle = () => {
    navigate("/login");
  };

  const logoutHandle = () => {
    dispatch(authAction.logout());
    navigate("/login");
    localStorage.removeItem("token");
  };

  const addBookHandle = () => {
    navigate("/book/new");
  };

  const homeHandle = () => {
    navigate("/");
  };

  const cartHandle = () => {
    navigate("/cart");
  };

  const actions = isAdmin
    ? [
        {
          icon: <AddIcon />,
          name: "Add book",
          action: addBookHandle,
        },
        { icon: <HomeIcon />, name: "Home", action: homeHandle },

        { icon: <LogoutIcon />, name: "Logout", action: logoutHandle },
      ]
    : isAuth
    ? [
        { icon: <HomeIcon />, name: "Home", action: homeHandle },

        {
          icon: <ShoppingCartIcon />,
          name: "Cart",
          action: cartHandle,
        },
        { icon: <LogoutIcon />, name: "Logout", action: logoutHandle },
      ]
    : [
        { icon: <HomeIcon />, name: "Home", action: homeHandle },
        { icon: <LoginIcon />, name: "Login", action: loginHandle },
      ];

  return (
    <Box sx={{ flexGrow: 1, position: "absolute", top: 0, left: 0, right: 0 }}>
      <AppBar position="static">
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
            Library
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Stack spacing={2} direction="row">
            {actions.map((action) => (
              <Tooltip title={action.name}>
                <IconButton sx={{ color: "#fff" }} onClick={action.action}>
                  {action.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
