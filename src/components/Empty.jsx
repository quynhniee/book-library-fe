import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate("/");
  };
  return (
    <Card sx={{ minWidth: 275, marginTop: 20 }}>
      <CardContent>
        <Typography variant="h3" color="text.secondary" gutterBottom>
          Empty!
        </Typography>
        <Typography variant="body2">
          "Your cart is empty"
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHandle}>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default Empty;
