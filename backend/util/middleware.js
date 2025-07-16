import morgan from "morgan";
import { loggerError } from "./logger.js";

morgan.token("contentOfBody", function (req, res) {
  return JSON.stringify(req.body);
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :contentOfBody",
);

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  loggerError(error.message);
};

export { logger, unknownEndpoint, errorHandler };
