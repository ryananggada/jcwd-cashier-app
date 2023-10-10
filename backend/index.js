const express = require("express");

const app = express();
app.use(express.json());

// const myRouter = require("./routes/myRoute");
// app.use("/myRoute", myRouter);

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

export const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Cashier app server runs at http://localhost:${PORT}`);
});
