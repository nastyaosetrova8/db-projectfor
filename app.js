const express = require("express");
const logger = require("morgan");
// const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const bodyParser = require("body-parser");

const authRouter = require("./routes/api/auth");
const customersRouter = require("./routes/api/customers");
const productsRouter = require("./routes/api/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
