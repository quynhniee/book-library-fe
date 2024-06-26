import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import api from "../../api";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const role = useSelector((state) => state.auth.user?.role);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.Book.delete(id).then((response) => {
          if (!response?.error) {
            setBooks(books.filter((book) => book.id !== id));
            Swal.fire("Deleted!", "Book has been deleted.", "success");
          } else {
            Swal.fire("Oops..", response?.error?.message, "error");
          }
        });
      }
    });
  };

  useEffect(() => {
    api.Book.getAll().then((response) => {
      setBooks(response);
      setLoading(false);
      console.log(response);
    });
  }, []);

  const TableSkeleton = () => (
    <TableRow>
      <TableCell colSpan={7}>
        <Skeleton />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </TableCell>
    </TableRow>
  );

  const TableRows = () =>
    books.map((book) => (
      <TableRow
        key={book.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        hover
      >
        <TableCell component="th" scope="row">
          {book.title}
        </TableCell>
        <TableCell align="right">{book.author}</TableCell>
        <TableCell align="right">{book.category}</TableCell>
        <TableCell align="right">{book.releaseDate}</TableCell>
        <TableCell align="right">{book.pages}</TableCell>
        <TableCell align="right">{book.sold}</TableCell>
        <TableCell align="right" width="fit-content">
          {isAuth && (
            <Button size="small" onClick={() => navigate(`book/${book.id}`)}>
              View
            </Button>
          )}
          {isAuth && role === "admin" && (
            <Button
              size="small"
              color="error"
              onClick={() => deleteHandle(book.id)}
            >
              Delete
            </Button>
          )}
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", paddingTop: 40, paddingBottom: 30 }}>
        {isAuth && role === "admin" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ marginBottom: 3 }}
            onClick={() => navigate("/book/new")}
          >
            Add Book
          </Button>
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Tiêu đề</b>
                </TableCell>
                <TableCell align="right">
                  <b>Tác giả</b>
                </TableCell>
                <TableCell align="right">
                  <b>Thể loại</b>
                </TableCell>
                <TableCell align="right">
                  <b>Ngày phát hành</b>
                </TableCell>
                <TableCell align="right">
                  <b>Số trang</b>
                </TableCell>
                <TableCell align="right">
                  <b>Đã bán</b>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>

            {books.length === 0 ? (
              <Typography variant="h4" margin={3}>
                Library is empty!
              </Typography>
            ) : (
              <TableBody>
                {loading === true ? <TableSkeleton /> : <TableRows />}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Home;
