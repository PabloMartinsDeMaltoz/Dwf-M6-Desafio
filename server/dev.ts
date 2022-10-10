import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { db } from "./db";
import * as path from "path";

const rutaRelativa = path.resolve(__dirname, "../dist", "index.html");

console.log(rutaRelativa);

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
  res.sendFile(rutaRelativa);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
