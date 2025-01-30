import { readFile, writeFile } from "fs";

export function serverStart(error, port) {
  if (error) {
    console.log(`Error in server setup => ${err}`);
  }

  console.log(`Server listening on port ${port}`);
}

export function savePost(path, content) {
  readFile(path, (err, data) => {
    const parsedData = JSON.parse(data);
    const updatedData = [...parsedData, content];
    const stringfiedData = JSON.stringify(updatedData, null, 2);

    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    writeFile(path, stringfiedData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }

      console.log("File written successfully!");
    });
  });
}
