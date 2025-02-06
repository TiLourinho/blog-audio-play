import express from "express";

import { PORT, VIEWS_DIR, PUBLIC_DIR, POSTS_PATH } from "./config/constants.js";
import {
  serverStart,
  generateId,
  savePost,
  updatePost,
  removePost,
  paginatePosts,
  changePage,
} from "./utils/tools.js";
import { createPost } from "./middlewares/createPost.js";
import { findPost } from "./middlewares/findPost.js";
import { viewPost } from "./utils/tools.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", VIEWS_DIR);

app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(createPost);
app.use(findPost);

app.post("/", (req, res) => {
  const post = req.body;

  savePost(POSTS_PATH, post);
  res.redirect("/1");
});

app.get("/create", (_req, res) => {
  const data = { uid: generateId() };

  res.render("create", data);
});

app.get("/post/:id", (req, res) => {
  const data = viewPost(req, res);

  res.render("post", data);
});

app.get("/update/:id", (req, res) => {
  const data = viewPost(req, res);

  res.render("edit", data);
});

app.post("/update", (req, res) => {
  const post = req.body;

  updatePost(POSTS_PATH, post);
  res.redirect("/1");
});

app.get("/delete/:id", (req, res) => {
  const data = viewPost(req, res);

  res.render("delete", data);
});

app.get("/:id", (req, res) => {
  const data = {
    page: req.params.id,
    changePage,
    paginatePosts,
  };

  res.render("home", data);
});

app.post("/delete", (req, res) => {
  const post = req.body;

  removePost(POSTS_PATH, post);
  res.redirect("/1");
});

app.listen(PORT, (err) => serverStart(err, PORT));
