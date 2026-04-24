import "dotenv/config";
import express from "express";
import { indexRouter } from "./route/index.js";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App successfully running on port ${PORT}`);
});
