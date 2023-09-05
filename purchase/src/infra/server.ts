import "express-async-errors"
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import "./provider/kafka/consumer";

const server = express();

server.use(express.json());
server.use(routes);

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    const [statusCodeR, message] = error.message.split("|")
    const statusCode = Number(statusCodeR)
    return response.status(statusCode).json({ statusCode, message });
  }

  return response.status(500).json({
    statusCode: 500,
    message: `Internal Server Error. ${error}`
  });
});


server.listen(8083, () => {
  console.log("Server [purchase] running on port 8083.")
})