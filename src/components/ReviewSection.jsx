import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Review from "./Review";
import { useSelector } from "react-redux";
import api from "../api";
import { useParams } from "react-router-dom";
import TextareaValidator from "./TextareaValidator";

const ReviewSection = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.user?.id);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    api.Review.getBookReviews(id).then((response) => {
      console.log(response);
      setReviews(response);
    });
  }, []);

  if (!reviews) return <p>Loading...</p>;

  return (
    <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
      <TextareaValidator reviews={reviews} setReviews={setReviews} />
      {reviews.map((review) => (
        <Review
          review={review}
          userId={userId}
          reviews={reviews}
          setReviews={setReviews}
        />
      ))}
    </Paper>
  );
};

export default ReviewSection;