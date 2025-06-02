// game state
// moves 
// move validation


export type Board = Row[]
export type Row = Cell[]
export type Player = '👸' | '🤴'
export type Cell = Player | null
export type EndState = Player | 'tie' | undefined
export type CellIndex = [number, number]

export type Game = {
    board: Board,
    currentPlayer: Player,
    endState?: EndState | undefined
}

export const initialGameState = (): Game => {
    const game: Game = {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        currentPlayer: '👸'
    }
    return game
}

const winningStates: CellIndex[][] = [
    [[0, 0], [0, 1], [0, 2]], // top row
    [[1, 0], [1, 1], [1, 2]], // middle row
    [[2, 0], [2, 1], [2, 2]], // bottom row
    [[0, 0], [1, 0], [2, 0]], // left col
    [[0, 1], [1, 1], [2, 1]], // center col
    [[0, 2], [1, 2], [2, 2]], // right col
    [[0, 0], [1, 1], [2, 2]], // diag 1
    [[2, 2], [1, 1], [0, 2]], // diag 2
]

const playerWins = (game: Game, player: Player) => {
    return winningStates.some((winState) => winState.every(([rowIndex, colIndex]) => game.board[rowIndex][colIndex] === player))
}

const xWins = (game: Game) => playerWins(game, '👸')
const oWins = (game: Game) => playerWins(game, '🤴')

function calculateEndState(game: Game): EndState {
    // x win, o win, or tie
    if (xWins(game)) return "👸"
    if (oWins(game)) return '🤴'
    if (game.board.every((row => row.every(cell => cell !== null)))) return 'tie'


    return undefined
}

export const move = (game: Game, rowIndex: number, colIndex: number): Game => {
    if (game.board[rowIndex][colIndex] != null) {
        console.log('that move is already taken!');
        return game
    }
    const nextGame = structuredClone(game)
    nextGame.board[rowIndex][colIndex] = game.currentPlayer
    nextGame.currentPlayer = nextGame.currentPlayer === '👸' ? '🤴' : '👸'
    console.log("move");
    nextGame.endState = calculateEndState(nextGame)

    return nextGame
}