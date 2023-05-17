import { Button, FormControl, Input, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../path.js";
import api from "../api/index.js";

const Signup = () => {
  const navigate = useNavigate();
  const helperText = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const cfPasswordRef = useRef();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const name = nameRef.current.childNodes[0].value;
      const username = usernameRef.current.childNodes[0].value;
      const password = passwordRef.current.childNodes[0].value;
      const cfPassword = cfPasswordRef.current.childNodes[0].value;

      if (name.trim() === "") {
        helperText.current.textContent = "Name cannot be blank";
        return;
      }

      if (username.trim() === "") {
        helperText.current.textContent = "Username cannot be blank";
        return;
      }

      if (password.trim() === "") {
        helperText.current.textContent = "Password cannot be blank";
        return;
      }

      if (password !== cfPassword) {
        helperText.current.textContent = "Confirm password does not match";
      } else {
        const response = await api.Auth.signup(name, username, password);
        console.log(response);
        if (!response.error) {
          navigate("/login");
        }
        helperText.current.textContent = response?.error?.message;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Stack alignItems="center">
        <Typography fontSize={25} fontWeight="bold" mt={2} mb={4}>
          Create Account
        </Typography>
        <form
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          onSubmit={submitHandle}
        >
          <Stack
            px={3}
            py={4}
            spacing={3}
            borderRadius={2}
            boxShadow={3}
            width={"100%"}
            maxWidth={350}
            bgcolor="#ffffff90"
          >
            <FormControl>
              <Typography fontWeight="bold" textTransform="uppercase">
                Full Name
              </Typography>
              <Input type="text" placeholder="" ref={nameRef} />
            </FormControl>
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
              <Input type="password" ref={passwordRef} />
            </FormControl>
            <FormControl>
              <Typography fontWeight="bold" textTransform="uppercase">
                Confirm Password
              </Typography>
              <Input type="password" ref={cfPasswordRef} />

              <Typography
                ref={helperText}
                color="error"
                mt={1}
                ml={1}
              ></Typography>
            </FormControl>

            <Button variant="contained" sx={{ py: 1.5 }} type="submit">
              Sign up with username
            </Button>
          </Stack>
        </form>
        <Typography mt={3} mb={1} fontWeight="light">
          Already have an account?
        </Typography>
        <Link to={path.LOGIN}>
          <Typography fontWeight="bold">Log in</Typography>
        </Link>
      </Stack>
    </>
  );
};

export default Signup;
