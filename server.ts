//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { InMemoryTicTacToeApi } from "./src/api"

const app = express();

app.get("/message", (_, res) => res.send("Hello express guys!"));

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
