import React from "react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/auth/auth";

const SpeedDialButton = () => {
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

  const actions = isAuth
    ? [
        { icon: <LogoutIcon />, name: "Logout", action: logoutHandle },
        { icon: <HomeIcon />, name: "Home", action: homeHandle },
        {
          icon: <ShoppingCartIcon />,
          name: "Cart",
          action: cartHandle,
        },
      ]
    : isAdmin
    ? [
        { icon: <LogoutIcon />, name: "Logout", action: logoutHandle },
        { icon: <HomeIcon />, name: "Home", action: homeHandle },
        {
          icon: <AddIcon />,
          name: "Add book",
          action: addBookHandle,
        },
      ]
    : [
        { icon: <LoginIcon />, name: "Login", action: loginHandle },
        { icon: <HomeIcon />, name: "Home", action: homeHandle },
      ];

  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default SpeedDialButton;
