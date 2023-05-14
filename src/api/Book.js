import request from "./request";

const routes = {
  ADD: "/book",
  ALL: "/book",
  BY_ID: (id) => `/book/${id}`,
};

const Book = {
  // Get all book in library
  getAll: () => request.get(routes.ALL),

  // Get a book by id
  getById: (id) => request.get(routes.BY_ID(id)),

  // Delete by id
  delete: (id) => request.delete(routes.BY_ID(id)),

  // Update by id
  update: (id, formData) => request.putForm(routes.BY_ID(id), formData),

  // Add new book
  post: (formData) => request.postForm(routes.ADD, formData),
};

export default Book;
