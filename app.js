// require("dotenv").config();
const express = require("express");
const app = express();
const noRouter = require("./middlewares/noRouter.js");
const errorHandler = require("./middlewares/errorHandler.js");
const cors = require("cors");

// - ENV
// const port = process.env.HOST_PORT;
const port = "3000";
// const domain = process.env.HOST_DOMAIN;
const domain = "http://localhost:";

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);

// - Importo le rotte di "posts"
const postsRouter = require("./routers/postsRouter");
app.use("/posts", postsRouter);

app.use(noRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening AT ${domain}${port}`);
});
