import * as express from "express";
import * as dotenv from "dotenv";
import { dist_dir } from "../dist/index";
import * as cors from "cors";
import { db } from "./db";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static("dist"));

app.get("/prueba", async (req, res) => {
  const querySnapshot = await db.collection("users").get();
  console.log(querySnapshot.docs[0].data());
});
app.get("/env", (req, res) => {
  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  res.send(process.env.NODE_ENV);
});

app.use("*", (req, res) => {
  res.sendFile(dist_dir + "/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
