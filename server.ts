//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors"
import { DbTicTacToeApi } from "./src/db/db"
import { Game } from "./src/game";
import { Server } from "socket.io";
import { GAME_UPDATED, USER_JOINED } from "./constants";

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}))

const api = new DbTicTacToeApi()

app.get("/api/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId) // the request parameters are the URL gameID
    res.json(game) // give game with that ID back
})

app.post("/api/game", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})

app.get("/api/games", async (req, res) => {
    const games = await api.getGames()
    res.json(games)
})

const PORT = parseInt(process.env.PORT || "3000")

const server = app.listen(PORT,
    () => console.log(`Server is listening at http://localhost:${PORT}`)
)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const makeRoomId = (game: Game) => `game-${game.id}`

app.post("/api/game/:gameId/move", async (req, res) => {
    console.log("Move API hit with", req.params.gameId, req.body)
    const game = await api.makeMove(req.params.gameId, req.body.row, req.body.col)
    io.to(makeRoomId(game)).emit(GAME_UPDATED, game)
    res.json(game)
})

io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);

    socket.on("join-game", async (gameId: string) => {
        const game = await api.getGame(gameId)
        if (!game) {
            console.error(`Game ${gameId} not found`)
            return
        }
        const roomId = makeRoomId(game)
        socket.join(roomId)
        console.log(`Socket ${socket.id} joined room ${roomId}`)
        io.to(roomId).emit(USER_JOINED, socket.id)
    })

})