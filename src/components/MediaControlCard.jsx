import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";

export default function MediaControlCard({ book, deleteBook, isCart }) {
  const navigate = useNavigate();

  const addToCartHandle = () => {
    Swal.fire({
      title: "Confirm book quantity",
      input: "number",
      inputAttributes: {
        min: 1,
        step: 1,
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Input is required'
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        api.Order.order(+result.value, book.id).then((response) => {
          console.log(response);
          if (!response?.error) {
            Swal.fire({
              icon: "success",
              title: "Book has been added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: response?.error?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const cancelOrderHandle = () => {
    console.log(book);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete order",
    }).then((result) => {
      if (result.isConfirmed) {
        api.Order.cancel(book.id).then((response) => {
          if (!response?.error) {
            deleteBook(book.id);
            Swal.fire("Deleted!", "Your order has been deleted.", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response?.error?.message,
            });
          }
        });
      }
    });
  };

  return (
    <Card sx={{ display: "flex", height: { sm: 200, lg: 170 } }}>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={
          book?.cover
            ? "http://localhost:5000/" + book.cover
            : "https://thebiologist.rsb.org.uk/images/biologist/Cats_genetics.jpg"
        }
        alt="Book from library"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {book.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {book.author}
          </Typography>
          {isCart && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Quantity: {book?.order?.quantity}
            </Typography>
          )}
        </CardContent>
        <Box
          sx={{ display: "flex", alignItems: "center", pl: 2, pb: 2, gap: 4 }}
        >
          {!isCart && (
            <Button
              startIcon={<AddShoppingCartIcon />}
              onClick={addToCartHandle}
            >
              Add to cart
            </Button>
          )}

          {isCart && (
            <Button color="error" onClick={cancelOrderHandle}>
              Cancel order
            </Button>
          )}

          <Button
            startIcon={<VisibilityIcon />}
            color="secondary"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            View
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
