import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
