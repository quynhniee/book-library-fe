import { Button, FormControl, Input, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../path";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/auth/auth";
import api from "../api";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const helperText = useRef("");
  const dispatch = useDispatch("");

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const username = usernameRef.current.childNodes[0].value;
      const password = passwordRef.current.childNodes[0].value;
      const response = await api.Auth.login(username, password);

      if (!response?.error) {
        api.Auth.setHeader(response.token);
        localStorage.setItem("token", response.token);
        dispatch(authAction.login());
        api.Auth.getProfile().then((data) =>
          dispatch(authAction.setUser(data))
        );
        navigate("/");
      }
      helperText.current.textContent = response?.error?.message;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack alignItems="center" justifyContent="center">
        <Typography fontSize={25} fontWeight="bold" mt={2} mb={2}>
          Login
        </Typography>
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onSubmit={submitHandle}
        >
          <Stack
            px={3}
            py={4}
            spacing={3}
            borderRadius={2}
            width={"100%"}
            maxWidth={350}
            boxShadow={2}
            bgcolor="#ffffff90"
          >
            <FormControl>
              <Typography fontWeight="bold" textTransform="uppercase">
                Username
              </Typography>
              <Input
                type="text"
                placeholder="username.example"
                ref={usernameRef}
              />
            </FormControl>
            <FormControl>
              <Typography fontWeight="bold" textTransform="uppercase">
                Password
              </Typography>
              <Input ref={passwordRef} type="password" />
              <Typography
                ref={helperText}
                color="error"
                mt={1}
                ml={1}
              ></Typography>
            </FormControl>
            <Button variant="contained" sx={{ py: 1.5 }} type={"submit"}>
              Log in with username
            </Button>
          </Stack>
        </form>
        <Typography mt={3} mb={1} fontWeight="light">
          Do not have an account?
        </Typography>
        <Link to={path.SIGNUP}>
          <Typography fontWeight="bold">Create account</Typography>
        </Link>
      </Stack>
    </>
  );
};

export default Login;
