import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ReviewSection from "./ReviewSection";

const categories = [
  { value: "action", label: "Action" },
  { value: "romance", label: "Romance" },
  { value: "fantasy", label: "Fantasy" },
  { value: "mystery", label: "Mystery" },
  { value: "scifi", label: "Sci-Fi" },
  { value: "historical", label: "Historical" },
];

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";
  const [readOnly, setReadOnly] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [pages, setPages] = useState("");
  const [category, setCategory] = useState("romance");
  const [cover, setCover] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const editHandle = () => {
    setReadOnly(false);
  };

  const getFormData = () => {
    let formData = new FormData();
    title && formData.append("title", title ?? null);
    author && formData.append("author", author ?? null);
    description && formData.append("description", description ?? null);
    category && formData.append("category", category ?? null);
    pages && formData.append("pages", pages ?? null);
    releaseDate && formData.append("releaseDate", releaseDate ?? null);
    selectedFile && formData.append("cover", selectedFile ?? null);
    return formData;
  };

  const addBookHandle = () => {
    const formData = getFormData();

    api.Book.post(formData).then((response) => {
      if (!response?.error) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(`/book/${response.id}`);
        setReadOnly(true);
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.message,
        });
    });
  };

  const saveBookHandle = () => {
    const formData = getFormData();
    api.Book.update(id, formData).then((response) => {
      if (!response?.error) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(`/book/${response.id}`);
        setReadOnly(true);
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.message,
        });
    });
  };

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
      console.log(result);
      if (result.isConfirmed) {
        api.Order.order(+result.value, id).then((response) => {
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

  useEffect(() => {
    if (id === "new") {
      setReadOnly(false);
      return;
    }
    api.Book.getById(id).then((data) => {
      console.log(data);
      setTitle(data.title);
      setAuthor(data.author);
      setDescription(data.description);
      setReleaseDate(data.releaseDate);
      setPages(data.pages);
      setCategory(data.category);
      setCover(data.cover && "http://localhost:5000/" + data.cover);
      setSelectedFile(data.cover);
    });
  }, []);

  return (
    <Stack marginY={5}>
      <Box component="form">
        <Card>
          <Stack direction="row" spacing={3} padding={3} paddingBottom={5}>
            <Stack spacing={3} width="100%">
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="title">Tiêu đề</InputLabel>
                  <Input
                    id="title"
                    readOnly={readOnly}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="author">Tác giả</InputLabel>
                  <Input
                    id="author"
                    readOnly={readOnly}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="description">Mô tả về sách</InputLabel>
                  <Input
                    id="description"
                    readOnly={readOnly}
                    value={description}
                    multiline
                    rows={6}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="releaseDate">Ngày phát hành</InputLabel>
                  <Input
                    type="date"
                    id="releaseDate"
                    readOnly={readOnly}
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="pages">Số trang</InputLabel>
                  <Input
                    type="number"
                    readOnly={readOnly}
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    id="pages"
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Select
                  id="category"
                  label="Thể loại"
                  variant="standard"
                  value={category}
                  readOnly={readOnly}
                  fullWidth
                  onChange={(e) => {
                    setCategory(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Stack>

            <Stack width="100%" alignItems="center" spacing={3}>
              <div>
                <Button
                  variant="contained"
                  component="label"
                  disabled={readOnly}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                      setCover(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Button>
              </div>

              <Card>
                <CardActionArea sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" src={cover} width={300} />
                </CardActionArea>
              </Card>
            </Stack>
          </Stack>

          <Stack justifyContent="center" direction="row" margin={3} spacing={2}>
            {isAuth && isAdmin && id === "new" && (
              <Button variant="contained" onClick={addBookHandle}>
                Add
              </Button>
            )}
            {isAuth && isAdmin && id !== "new" && readOnly && (
              <Button variant="contained" onClick={editHandle}>
                Edit
              </Button>
            )}
            {isAuth && isAdmin && id !== "new" && !readOnly && (
              <Button variant="contained" onClick={saveBookHandle}>
                Save
              </Button>
            )}
            {isAuth && !isAdmin && (
              <Button variant="contained" onClick={addToCartHandle}>
                Add to cart
              </Button>
            )}
          </Stack>
        </Card>
      </Box>
      <ReviewSection />
    </Stack>
  );
};

export default BookDetail;