import { useState } from 'react'
import './App.css'
import { initialGameState, move, type Cell, type Game, type Row } from './game'

type CellProps = {
  cell: Cell,
  cellIndex: number,
  rowIndex: number,
  cellClick?: () => void
}
function Cell({ cell, cellIndex, cellClick, rowIndex }: CellProps) {
  const isLastRow = rowIndex === 2
  const isLastCol = cellIndex === 2

  const borderClass = [
    'border-5',
    !isLastRow && 'border-b',
    !isLastCol && 'border-r',
    'border-black'
  ].filter(Boolean).join(' ')

  return (
    <div
      key={cellIndex}
      className={`w-32 h-32 flex items-center justify-center text-3xl ${borderClass} ${cell === '👸' ? "bg-green-700" : ""} ${cell === '🤴' ? "bg-blue-700" : ""}`}
      onClick={cellClick}
    >
      {cell}
    </div>)
}

type RowProps = {
  row: Row
  rowIndex: number
  handleMove: (rowIndex: number, colIndex: number) => void
}

function Row({ row, rowIndex, handleMove }: RowProps) {
  return (
    <div key={rowIndex} className='flex justify-center'>
      {row.map((cell, cellIndex) => <Cell
        rowIndex={rowIndex}
        cell={cell}
        cellIndex={cellIndex}
        cellClick={() => handleMove(rowIndex, cellIndex)} />)}
    </div>
  )
}

function App() {
  const [game, setGame] = useState(initialGameState())

  const handleMove = (rowIndex: number, colIndex: number) => {
    const nextGame = move(game, rowIndex, colIndex)
    setGame(nextGame)
  }

  const handleNewGame = () => {
    console.log("new game button clicked");

    setGame(initialGameState())
  }

  return (
    <>
      <h1 className='font-bold text-4xl'>Jill 👸 Jack 🤴 Joe ☕️</h1>

      <p className='text-sm mt-3'>Line up 3 Jacks or 3 Jills. Win a cup of joe.</p>
      <p className='text-5xl m-6'>
        Turn: {game.currentPlayer === '👸' ? '👸 Jill' : '🤴 Jack'}
      </p>
      <div className=''>
        {game.board.map((row, rowIndex) =>
          <Row
            row={row}
            rowIndex={rowIndex}
            handleMove={handleMove}
          />)}
        <div>
          {game.endState &&
            <>
              <div className='text-3xl p-5'>{game.endState === '👸' ? '👸 Jill' : '🤴 Jack'} wins a ☕️</div>
              <button
                className='bg-black rounded text-white px-10 py-3'
                onClick={() => handleNewGame()}
              >
                NEW GAME
              </button>
            </>

          }
        </div>
      </div>

    </>
  )
}

export default App
