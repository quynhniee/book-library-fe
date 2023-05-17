import React, { useEffect, useState } from "react";
import MediaControlCard from "../../components/MediaControlCard";
import api from "../../api";
import { Backdrop, CircularProgress, Stack } from "@mui/material";

const UserHome = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.Book.getAll().then((response) => {
      setBooks(response);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <div style={{ minHeight: "100vh", paddingTop: 40, paddingBottom: 30 }}>
        {books.length === 0 ? (
          <h2>Library is empty</h2>
        ) : (
          <Stack spacing={2}>
            {books.map((book) => (
              <MediaControlCard key={book.id} book={book} />
            ))}
          </Stack>
        )}
      </div>
    </>
  );
};

export default UserHome;
