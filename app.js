import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ConnectDatabase } from "./database.js";
import router from "./router.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

ConnectDatabase();

const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:2300",
  "http://localhost:4567",
  "http://localhost:5000",
  "http://localhost:4500",
];

// const config = {
//   origin: function (origin, cb) {
//     if (whiteList.indexOf(origin) !== -1) {
//       cb(null, true);
//     } else {
//       cb(new Error("NOT ALLOWED").message);
//     }
//   },
//   credentials: true,
// };

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("build"));
app.use(express.static(path.join(__dirname, "build")));
app.use(morgan("dev"));
app
  .get("/", (req, res) => res.send("Hello from the server"))
  .use(router)
  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

//.use("*", (req, res) => res.status(404).send("Route not found"));

app.listen(4500, () => {
  console.log("Server is on now");
});
