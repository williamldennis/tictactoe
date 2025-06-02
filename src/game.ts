// game state
// moves 
// move validation


export type Board = Row[]
export type Row = Cell[]
export type CellIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
export type Player = 'x' | 'o'
export type Cell = Player | null
export type EndState = Player | 'tie' | undefined

export type Game = {
    board: Board,
    currentPlayer: Player,
    endState?: EndState | undefined
}

export const initialGameState = (): Game => {
    const game: Game =  {
        board: [[null, null, null], [null, null, null], [null, null, null]], 
        currentPlayer: 'x'
    }
    return game
}