import cookieParser from "cookie-parser";
import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import path from "path";

const app = express();
const port = 5000;
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//!Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const Books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "/images/gatsby.jpg",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverImage: "/images/1984.jpg",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "/images/mockingbird.jpg",
    },
  ];
  res.render("home", { Books });
});

app.get("/books", (req, res) => {
  const allBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
    },
    { id: 2, title: "1984", author: "George Orwell", price: 8.99 },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 7.99,
    },
    { id: 4, title: "Moby Dick", author: "Herman Melville", price: 12.99 },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", price: 6.99 },
  ];
  res.render("books", { allBooks });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/hey", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/api", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is ready and running on port ${port}`);
});
