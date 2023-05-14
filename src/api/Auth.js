import axios from "axios";
import request from "./request";

const routes = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  PROFILE: "/auth/profile",
  CART: "/auth/cart",
};

const Auth = {
  // Set header authorization
  setHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  // Existing user login
  login: (username, password) =>
    request.post(routes.LOGIN, { username, password }),

  // Register a new user
  signup: (name, username, password) =>
    request.post(routes.SIGNUP, { name, username, password }),

  // Get current user
  getProfile: () => request.get(routes.PROFILE),

  // Get user's cart
  getCart: () => request.get(routes.CART),

  // Update current user
  // update: (user) => request.put("/user", { user }),
};

export default Auth;
