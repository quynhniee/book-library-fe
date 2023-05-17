import { Container, Stack } from "@mui/material";
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import path from "./path";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { authAction } from "./redux/auth/auth";
import api from "./api";
import SpeedDialButton from "./components/SpeedDialButton";

const Login = lazy(() => import("./views/Login"));
const Signup = lazy(() => import("./views/Signup"));
const Home = lazy(() => import("./views/admin/Home"));
const BookDetail = lazy(() => import("./components/BookDetail"));
const UserHome = lazy(() => import("./views/user/UserHome"));
const Cart = lazy(() => import("./views/user/Cart"));

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";

  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    console.log(token, isExpired);
    if (token && !isExpired) {
      api.Auth.setHeader(token);
      dispatch(authAction.login());
      api.Auth.getProfile().then((data) => dispatch(authAction.setUser(data)));
    } else {
      dispatch(authAction.logout());
    }
  }, [dispatch, isExpired, token]);

  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          transition: "0.7s all ease",
        }}
        // justifyContent="center"
        bgcolor="#e3e3ff"
        paddingTop={7}
      >
        <Container maxWidth="lg">
          <Suspense>
            <BrowserRouter>
              <SpeedDialButton />
              <Routes>
                {isAuth && !isAdmin && (
                  <Route index path={path.HOME} element={<UserHome />} />
                )}
                <Route index path={path.HOME} element={<Home />} />

                {isAuth && <Route path={path.BOOK} element={<BookDetail />} />}

                {isAuth && <Route path={path.CART} element={<Cart />} />}

                {isAuth && (
                  <Route
                    path="*"
                    element={<Navigate to={path.HOME} replace />}
                  />
                )}

                {!isAuth && isAuth !== null && (
                  <Route
                    path="*"
                    element={<Navigate to={path.LOGIN} replace />}
                  />
                )}

                {!isAuth && isAuth !== null && (
                  <Route path={path.LOGIN} element={<Login />} />
                )}
                {!isAuth && isAuth !== null && (
                  <Route path={path.SIGNUP} element={<Signup />} />
                )}
              </Routes>
            </BrowserRouter>
          </Suspense>
        </Container>
      </Stack>
    </>
  );
};

export default App;
