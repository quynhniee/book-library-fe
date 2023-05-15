import request from "./request";

const Review = {
  // Get book reviews
  getBookReviews: (bookId) => request.get(`/review/${bookId}`),

  // Add review
  add: (bookId, comment, rating) =>
    request.post(`/review`, { bookId, comment, rating }),

  // Delete reviews
  delete: (id) => request.delete(`/review/${id}`),

  // Update review
  update: (id, comment, rating) =>
    request.put(`/review/${id}`, { comment, rating }),
};

export default Review;
