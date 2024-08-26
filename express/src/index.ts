import express from "express";
import userRoutes from "../src/routes/userRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const app = express();
const port = 5000;

//!Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/api", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is ready and running on port ${port}`);
});
