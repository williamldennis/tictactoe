import { drizzle } from 'drizzle-orm/postgres-js'
import type { TicTacToeApi } from '../api';
import { initialGameState, type Game, move as makeMoveState, type Player, type Board, type EndState } from '../game';
import { gamesTable } from './schema';
import { eq } from 'drizzle-orm';
const db = drizzle(process.env.DATABASE_URL!)

export class DbTicTacToeApi implements TicTacToeApi {

    async createGame(): Promise<Game> {
        const game = initialGameState()
        const values: typeof gamesTable.$inferInsert = game
        await db.insert(gamesTable).values(values)
        return game
    }


    async makeMove(gameId: string, row: number, col: number): Promise<Game> {
        const game = await this.getGame(gameId)
        const newGame = makeMoveState(game, row, col)
        const values: typeof gamesTable.$inferInsert = newGame
        console.log(values)
        await db.update(gamesTable).set(values).where(eq(gamesTable.id, gameId))
        console.log("✅ [makeMove] Successfully updated DB")

        return newGame
    }

    async getGame(gameId: string): Promise<Game> {
        const results = await db.select().from(gamesTable).where(eq(gamesTable.id, gameId))
        if (results.length === 0) {
            throw new Error('Game not found')
        }
        const game = results[0]
        return {
            id: game.id,
            currentPlayer: game.currentPlayer as Player,
            board: game.board as Board,
            endState: game.endState as EndState
        }
    }

    async getGames(): Promise<Game[]> {
        const results = await db.select().from(gamesTable)
        return results.map(game => ({
            id: game.id,
            currentPlayer: game.currentPlayer as Player,
            board: game.board as Board,
            endState: game.endState as EndState
        }))
    }
}
