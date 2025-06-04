import { test, expect } from "vitest"
import { initialGameState, playerWins } from "./game"
import type { Game } from "./game"

test("playerWins: when no winning state -- should return false", () => {
    //situation
    const game = initialGameState()
    const player = game.currentPlayer
    //execute function 
    const output = playerWins(game, player)
    //checking truth (what we're testing)
    expect(output).toBe(false)
})

test("playerWins: when winning state -- should return true", () => {
    //situation
    const game: Game = {
        board: [['👸', '👸', '👸'], [null, null, null], [null, null, null]],
        currentPlayer: '👸',
        id: crypto.randomUUID(),
    }
    const player = game.currentPlayer
    //execute function 
    const output = playerWins(game, player)
    //checking truth (what we're testing)
    expect(output).toBe(true)
})