import cors from "cors";
import express from "express";
import router from "./src/router.js";
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/v1", router);
app.use("/", (req, res) => {
  res.status(200).send("sdfghjk");
});
export { app };
