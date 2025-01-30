import express from "express";

import { PORT, VIEWS_DIR, PUBLIC_DIR, POSTS_PATH } from "./config/constants.js";
import { serverStart, savePost } from "./utils/tools.js";
import { createPost } from "./middlewares/createPost.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", VIEWS_DIR);

app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(createPost);

app.get("/", (_req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  const post = req.body;

  savePost(POSTS_PATH, post);
  res.render("home");
});

app.get("/create", (_req, res) => {
  res.render("create");
});

app.listen(PORT, (err) => serverStart(err, PORT));
