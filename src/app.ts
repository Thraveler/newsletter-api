import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes";
import db from "./config/database";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"

const app = express();
const port = process.env.PORT || 8080;

const filesPath = path.join(__dirname, '../uploads');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/upload", express.static(filesPath));
app.use(express.json());
app.use("/", router);

db.initialize()
  .then(() => {
    console.log("DB running!");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
