import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import pg from "pg"; // Default import for CommonJS module
const { Client } = pg;
import router from "../src/router.js";
dotenv.config({ path: ".env" });
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
console.log(process.env.SUPABASE_URL);

const client = new Client({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }, // Allows self-signed certificates
});

client
  .connect()
  .then(() => console.log("Connected to Supabase"))
  .catch((err) => console.error("Connection error", err.stack));

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/v1", router);
app.use("/", (req, res) => {
  res.status(200).send("sdfghjk");
});
export { app };
