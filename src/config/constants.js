import path, { dirname } from "path";
import { fileURLToPath } from "url";

const configFile = fileURLToPath(import.meta.url);

export const PORT = 3000;

export const ROOT_DIR = dirname(configFile).replace("/config", "");
export const VIEWS_DIR = path.join(ROOT_DIR, "views");
export const PUBLIC_DIR = path.join(ROOT_DIR, "public");
export const DATA_DIR = path.join(ROOT_DIR, "data");

export const POSTS_PATH = path.join(DATA_DIR, "posts.json");
