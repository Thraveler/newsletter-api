import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

app.use((req: Request, res: Response) => {
  res.json({
    message: "Project started",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
