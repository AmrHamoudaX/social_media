import morgan from "morgan";
import { loggerError } from "./logger.js";
import { SECRET } from "./config.js";
import * as jwt from "jsonwebtoken";

morgan.token("contentOfBody", function(req, res) {
  const content = req.body;
  const status = (
    typeof res.headersSent !== `boolean`
      ? Boolean(res._header)
      : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
        ? 33 // yellow
        : status >= 300
          ? 36 // cyan
          : status >= 200
            ? 32 // green
            : 0; // no color
  return `\x1b[${color}m${JSON.stringify(content)}\x1b[0m`;
});

morgan.token(`status`, (req, res) => {
  const status = (
    typeof res.headersSent !== `boolean`
      ? Boolean(res._header)
      : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
        ? 33 // yellow
        : status >= 300
          ? 36 // cyan
          : status >= 200
            ? 32 // green
            : 0; // no color
  return `\x1b[${color}m${status}\x1b[0m`;
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms \n:contentOfBody",
);

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  loggerError(error.message);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.default.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export { logger, unknownEndpoint, errorHandler, tokenExtractor };
