import express from "express";

import { PORT, VIEWS_DIR } from "./config/constants.js";
import { serverStart } from "./utils/tools.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", VIEWS_DIR);

app.listen(PORT, (err) => serverStart(err, PORT));
