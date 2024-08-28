import { error } from "console";

//when a route is not found
const notFound = (req: any, res: any, next: any) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//overriding the default express error handler
const errorHandler = (error: Error, req: any, res: any, next: any) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  //!an id that does not exist
  if (error.name === undefined) {
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
};

export { notFound, errorHandler };

//! we export them to the index.ts and use them , and they override the default erro handler of express
//! and the in our routes we just throw new Erros
