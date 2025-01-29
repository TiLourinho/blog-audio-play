import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in server setup => ${err}`);
  }

  console.log(`Server listening on port ${PORT}`);
});
