import { Avatar, Chip, Grid } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import api from "../api";

const Review = ({ review, userId, reviews, setReviews }) => {
  const deleteReviewHandle = () => {
    Swal.fire({
      text: "Delete your review?",
      showCancelButton: true,
      confirmButtonColor: "#d63b30",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.Review.delete(review.id).then((response) => {
          if (!response?.error) {
            setReviews(reviews.filter((rv) => rv.id !== review.id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        marginTop={2}
        sx={{ position: "relative" }}
      >
        {userId === review.userId && (
          <Chip
            label="Delete"
            variant="outlined"
            size="small"
            sx={{ position: "absolute", top: 10, right: 4 }}
            clickable
            onClick={deleteReviewHandle}
          />
        )}
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src="https://taytou.com/wp-content/uploads/2022/08/Hinh-anh-Avatar-trang-tron-nen-xam-don-gian.png"
          />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <div>
            <span
              style={{
                marginRight: 5,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              {userId === review.userId ? "You" : "User****"}
            </span>
            <Chip label={review.rating + " / 5"} size="small" />
          </div>
          <div style={{ textAlign: "left" }}>{review.comment}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
