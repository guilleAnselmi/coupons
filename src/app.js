import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import { router } from "./routes";
import path from "path";
const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", router);
app.use(express.static(path.join(__dirname + "/web")))
app.use("/", (req, res) =>{
  res.sendFile(path.join(__dirname + "/web/index.html"))
})


export { app, server };
