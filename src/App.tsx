import { useState } from 'react'
import './App.css'
import { initialGameState, move, type Cell, type Game, type Row } from './game'

type CellProps = {
  cell: Cell,
  cellIndex: number,
  cellClick?: () => void
}
function Cell({ cell, cellIndex, cellClick }: CellProps) {
  return (
    <div
      key={cellIndex}
      className='p-10 border'
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
      {row.map((cell, cellIndex) => <Cell cell={cell} cellIndex={cellIndex} cellClick={() => handleMove(rowIndex, cellIndex)} />)}
    </div>
  )
}

function App() {
  const [game, setGame] = useState(initialGameState())

  const handleMove = (rowIndex: number, colIndex: number) => {
    const nextGame = move(game, rowIndex, colIndex)
    setGame(nextGame)
  }

  return (
    <>
      <h1 className='font-bold text-4xl'>Jill Jack Joe</h1>

      <p className='text-sm mt-3'>Line up 3 Jacks or 3 Jills. Win a cup of joe.</p>
      <p className='text-2xl m-6'>
        Turn: Player {game.currentPlayer}
      </p>
      {game.board.map((row, rowIndex) =>
        <Row
          row={row}
          rowIndex={rowIndex}
          handleMove={handleMove}
        />)}
      <div>
        {game.endState &&
          <div className='text-3xl p-5'>Result: {game.endState}</div>}
      </div>
    </>
  )
}

export default App
