const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

// routes
const authRouter = require("./routes/authRoutes");
const commodityRouter = require("./routes/commodityRoutes");

app.use(cors());
app.options("*", cors());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRouter);
app.use("/api/product", commodityRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server, 404`));
});

app.use(globalErrorHandler);

module.exports = app;
