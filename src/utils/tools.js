import { readFile, readFileSync, writeFile } from "fs";
import ShortUniqueId from "short-unique-id";

export function serverStart(error, port) {
  if (error) {
    console.log(`Error in server setup => ${error}`);
  }

  console.log(`Server listening on port ${port}`);
}

export function generateId() {
  const uid = new ShortUniqueId({ length: 4 });

  return uid.rnd();
}

export function savePost(path, content) {
  readFile(path, (error, data) => {
    const parsedData = JSON.parse(data);
    const updatedData = [...parsedData, content];
    const stringfiedData = JSON.stringify(updatedData, null, 2);

    if (error) {
      console.error("Error reading file while saving post:", error);
      return;
    }

    writeFile(path, stringfiedData, (error) => {
      if (error) {
        console.error("Error writing file while saving post:", error);
      }

      console.log("File saved successfully!");
    });
  });
}

export function readPost(path) {
  try {
    const data = readFileSync(path);
    const parsedData = JSON.parse(data.toString());
    const stringfiedData = JSON.stringify(parsedData);

    return stringfiedData;
  } catch (error) {
    console.error("Error reading post:", error);

    throw error;
  }
}

export function viewPost(req, res) {
  const postId = req.params.id;
  const allPosts = res.locals.posts;
  const post = allPosts.filter(({ id }) => id === Number(postId));
  const data = {
    post: post[0],
  };

  return data;
}

export function updatePost(path, body) {
  readFile(path, (error, data) => {
    const parsedData = JSON.parse(data);

    if (error) {
      console.error("Error reading file while updating post:", error);
      return;
    }

    parsedData.map((item) => {
      if (item.id === Number(body.id)) {
        item.id = item.id;
        item.title = body.title;
        item.content = body.content;
      }
    });

    const updatedData = [...parsedData];
    const stringfiedData = JSON.stringify(updatedData, null, 2);

    writeFile(path, stringfiedData, (error) => {
      if (error) {
        console.error("Error writing file while updating post:", error);
      }

      console.log("File updated successfully!");
    });
  });
}

export function removePost(path, body) {
  readFile(path, (error, data) => {
    const parsedData = JSON.parse(data);

    if (error) {
      console.error("Error reading file while removing post:", error);
      return;
    }

    const reducedData = parsedData.filter(({ id }) => id !== Number(body.id));

    const updatedData = [...reducedData];
    const stringfiedData = JSON.stringify(updatedData, null, 2);

    writeFile(path, stringfiedData, (error) => {
      if (error) {
        console.error("Error writing file while removing post:", error);
      }

      console.log("File removed successfully!");
    });
  });
}
