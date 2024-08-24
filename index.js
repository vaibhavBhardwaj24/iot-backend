import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "src/.env" });
console.log("starting");
// connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening");
  });
// });
