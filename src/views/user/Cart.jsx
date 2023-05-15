import React, { useEffect, useState } from "react";
import api from "../../api";
import MediaControlCard from "../../components/MediaControlCard";
import { Stack } from "@mui/material";
import Empty from "../../components/Empty";

const Cart = () => {
  const [books, setBooks] = useState();

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  useEffect(() => {
    api.Auth.getCart().then((response) => {
      setBooks(response);
    });
  }, []);

  if (!books) return <p>Loading...</p>;
  if (books.length === 0) return <Empty />;
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
