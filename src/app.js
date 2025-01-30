import express from "express";

import { PORT } from "./config/constants.js";
import { serverStart } from "./utils/tools.js";

const app = express();

app.listen(PORT, (err) => serverStart(err, PORT));
