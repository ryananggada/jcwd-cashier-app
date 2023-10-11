const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

// 404 Not Found route
app.use((req, res) => {
  console.error(`Not found: ${req.path}`);
  res.status(404).json({
    ok: false,
    message: "Route not found",
  });
});

// Middleware error
app.use((err, req, res, next) => {
  console.error(`FATAL ERROR: ${req.path}`);
  console.error(err);

  res.status(500).json({
    ok: false,
    message: "FATAL ERROR",
    error: String(err),
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Cashier app server runs at http://localhost:${PORT}`);
});
