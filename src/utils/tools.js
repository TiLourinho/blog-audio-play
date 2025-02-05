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
  const post = allPosts.filter(({ id }) => id === postId);
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
      if (item.id === body.id) {
        item.id = item.id;
        item.artist = body.artist;
        item.title = body.title;
        item.coverUrl = body.coverUrl;
        item.description = body.description;
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

    const reducedData = parsedData.filter(({ id }) => id !== body.id);

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

export function paginatePosts(index, page, totalPosts) {
  const pageNumber = Number(page);
  const postsPerPage = 5;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (pageNumber < 1 || pageNumber > totalPages) return false;

  const startIndex = (pageNumber - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return index >= startIndex && index < endIndex;
}

export function changePage(page, direction, totalPosts) {
  const pageNumber = Number(page);
  const postsPerPage = 5;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (direction === "up" && pageNumber < totalPages) return pageNumber + 1;
  if (direction === "down" && pageNumber > 1) return pageNumber - 1;

  return pageNumber;
}
