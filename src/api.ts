import { type Game, initialGameState as createGameState, move as makeGameMove } from "./game"

export interface TicTacToeApi {
    createGame(): Promise<Game>
    makeMove(gameId: string, row: number, col: number): Promise<Game>
    getGame(gameId: string): Promise<Game>
    getGames(gameId: string): Promise<Game[]>
    createRematch(): Promise<Game>
}

// export class InMemoryTicTacToeApi implements TicTacToeApi {
//     private games: Map<string, Game> = new Map()

//     async createGame(): Promise<Game> {
//         const game = createGameState()
//         this.games.set(game.id, game)
//         return game
//     }

//     async getGame(gameId: string): Promise<Game> {
//         const game = this.games.get(gameId)
//         if (!game) {
//             throw new Error("Game not found")
//         }
//         return game
//     }

//     async makeMove(gameId: string, row: number, col: number): Promise<Game> {
//         const game = await this.getGame(gameId)
//         const newGame = makeGameMove(game, row, col)
//         this.games.set(gameId, newGame)
//         return newGame
//     }
// }

const BASE_URL = "http://localhost:3000"

export class TicTacToeApiClient implements TicTacToeApi {
    async createGame(): Promise<Game> {
        const response = await fetch(`${BASE_URL}/api/game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }

    async getGame(gameId: string): Promise<Game> {
        const response = await fetch(`${BASE_URL}/api/game/${gameId}`)
        const game = await response.json()
        return game
    }

    async getGames(): Promise<Game[]> {
        const response = await fetch(`${BASE_URL}/api/games`)
        const games = await response.json()
        return games
    }

    async makeMove(gameId: string, row: number, col: number): Promise<Game> {
        const response = await fetch(`${BASE_URL}/api/game/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ row, col })
        })
        const game = await response.json()
        return game
    }

    async createRematch(): Promise<Game> {
        const response = await fetch(`${BASE_URL}/api/game/rematch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const game = await response.json()
        return game
    }
}