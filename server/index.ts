import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "app is running" });
});

app.listen(port, () => {
  console.log(`Express server is running with typescript on port ${port}`);
});
