import cookieParser from "cookie-parser";
import express from "express";

import { notFound, errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";

const app = express();
const port = 5000;

//!Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/api", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is ready and running on port ${port}`);
});
