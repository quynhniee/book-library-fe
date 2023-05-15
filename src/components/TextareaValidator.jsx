import { Box, Button, FormLabel, Input } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function TextareaValidator({ reviews, setReviews }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const postReviewHandle = () => {
    api.Review.add(id, comment, rating).then((response) => {
      if (!response?.error) {
        setReviews([...reviews, response]);
        setComment("");
        setRating(0);
      }
    });
  };

  return (
    <form fullWidth>
      <FormLabel>Your comment</FormLabel>
      <Input
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Box
        sx={{
          display: "flex",
          gap: "var(--Textarea-paddingBlock)",
          pt: "var(--Textarea-paddingBlock)",
          borderTop: "1px solid",
          borderColor: "divider",
          flex: "auto",
        }}
      >
        <div>
          Rate:
          <Input
            inputProps={{ min: "0", max: "10", step: "0.5", type: "number" }}
            disableUnderline
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{ marginLeft: 2 }}
          />{" "}
          / 5
        </div>
        <Button
          sx={{ ml: "auto", marginBottom: 5 }}
          onClick={postReviewHandle}
          disabled={comment.trim() === ""}
        >
          Send
        </Button>
      </Box>
    </form>
  );
}
