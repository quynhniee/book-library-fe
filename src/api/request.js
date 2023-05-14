import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/";

const request = {
  get: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },

  post: async (url, body) => {
    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },

  postForm: async (url, formData) => {
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },

  put: async (url, body) => {
    try {
      const response = await axios.put(url, body);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },

  putForm: async (url, formData) => {
    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
};

export default request;
