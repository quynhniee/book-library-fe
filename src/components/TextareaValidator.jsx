import { Box, Button, FormLabel, Input, Stack } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function TextareaValidator({ reviews, setReviews }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const postReviewHandle = (e) => {
    e.preventDefault();
    api.Review.add(id, comment, rating).then((response) => {
      if (!response?.error) {
        setReviews([response, ...reviews]);
        setComment("");
        setRating(0);
      }
    });
  };

  return (
    <form fullWidth onSubmit={postReviewHandle}>
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
        <Stack direction="row" spacing={1} marginTop={2}>
          {[1, 2, 3, 4, 5].map((id) => (
            <span
              key={id}
              style={{
                marginRight: "5px",
                color: id > rating ? "#c0c0c0" : "orange",
                cursor: "pointer",
              }}
              className="fa fa-star"
              onClick={() => {
                setRating(id);
              }}
            ></span>
          ))}
        </Stack>
        <Button
          sx={{ ml: "auto", marginBottom: 5 }}
          // onClick={postReviewHandle}
          disabled={comment.trim() === ""}
          type="submit"
        >
          Send
        </Button>
      </Box>
    </form>
  );
}
