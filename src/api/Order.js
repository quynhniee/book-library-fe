import request from "./request";

const Order = {
  // Order book
  order: (quantity, bookId) => request.post("/order", { quantity, bookId }),

  // Cancel order
  cancel: (bookId) => request.delete(`/order/${bookId}`),
};

export default Order;
