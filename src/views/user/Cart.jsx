import React, { useEffect, useState } from "react";
import api from "../../api";
import MediaControlCard from "../../components/MediaControlCard";
import { Stack } from "@mui/material";

const Cart = () => {
  const [books, setBooks] = useState();

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  useEffect(() => {
    api.Auth.getCart().then((response) => {
      console.log(response);
      setBooks(response);
    });
  }, []);

  if (!books) return <p>Loading...</p>;
  return (
    <Stack spacing={3} margin={4}>
      {books.map((book) => (
        <MediaControlCard
          isCart
          key={book.id}
          book={book}
          deleteBook={deleteBook}
        />
      ))}
    </Stack>
  );
};

export default Cart;
