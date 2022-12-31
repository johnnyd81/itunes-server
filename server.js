const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const helmet = require("helmet");
const routes = require("./routes/index");

//the middleware packages
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//the helmet package provides security for my application
app.use(helmet());

//the line below represents the routes I imported from index.js
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//the route below makes a get request to the iTunes api with the term and type specified in the URL
app.get(`/search/:term/:type`, (req, res) => {
  const term = req.params.term;
  const type = req.params.type;
  fetch(`https://itunes.apple.com/search?term=${term}&media=${type}&limit=20`)
    .then((result) => result.json())
    .then((response) =>
      res.send({ message: "Data received successfully", response })
    )
    .catch((Error) =>
      res.send({ message: "Something went wrong", error: { Error } })
    );
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
