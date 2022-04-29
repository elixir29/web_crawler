const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const crawlingRoute = require("./src/routes/crawler.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", crawlingRoute);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Invalid Route",
  });
});

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
