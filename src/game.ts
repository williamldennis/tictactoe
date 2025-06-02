// game state
// moves 
// move validation


export type Board = Row[]
export type Row = Cell[]
export type Player = 'x' | 'o'
export type Cell = Player | null
export type EndState = Player | 'tie' | undefined

export type Game = {
    board: Board,
    currentPlayer: Player,
    endState?: EndState | undefined
}

export const initialGameState = (): Game => {
    const game: Game = {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        currentPlayer: 'x'
    }
    return game
}


export const move = (game: Game, rowIndex: number, colIndex: number): Game => {
    const nextGame = structuredClone(game)
    nextGame.board[rowIndex][colIndex] = game.currentPlayer
    nextGame.currentPlayer = nextGame.currentPlayer === 'x' ? 'o' : 'x'
    console.log("click");

    return nextGame
}