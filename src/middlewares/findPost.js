import { readPost } from "../utils/tools.js";
import { POSTS_PATH } from "../config/constants.js";

export function findPost(_req, res, next) {
  const locals = res.locals;

  try {
    const data = readPost(POSTS_PATH);
    const parsedData = JSON.parse(data);

    locals["posts"] = parsedData;
  } catch (error) {
    console.error(error);
  }

  next();
}
