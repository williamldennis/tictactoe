import { useEffect, useState } from 'react'
import './App.css'
import { initialGameState, move, type Cell, type Game, type Row } from './game'
import { TicTacToeApiClient } from './api'
import { useMemo } from "react";


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
    'border-4',
    !isLastRow && 'border-b',
    !isLastCol && 'border-r',
    'border-white'
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
  const api = useMemo(() => new TicTacToeApiClient(), [])
  const [game, setGame] = useState<Game | undefined>()

  async function initializeGame() {
    const initialState = await api.createGame()
    setGame(initialState)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  async function handleMove(rowIndex: number, colIndex: number) {
    const nextGame = await api.makeMove(game!.id, rowIndex, colIndex)
    setGame(nextGame)
  }

  if (!game) {
    return (
      <div>Loading...</div>
    )
  }

  async function handleNewGame() {
    console.log("new game button clicked");
    const newGame = await api.createGame()
    setGame(newGame)
  }

  return (
    <>
      <h1 className='font-bold text-4xl'>Jill 👸 Jack 🤴 Joe ☕️</h1>
      <p className='text-sm m-3'>Line up 3 Jacks or 3 Jills. Win a cup of joe.</p>
      <div className="flex items-center justify-center">

        <div className="mt-4 w-160 h-160 rounded-4xl bg-[url('assets/tic-tac-toe.png')] bg-cover bg-center">

          {!game.endState &&
            <p className='text-5xl p-5 m-6 bg-white rounded-3xl'>
              Turn: {game.currentPlayer === '👸' ? '👸 Jill' : '🤴 Jack'}
            </p>}
          {game.endState &&
            <div className='text-5xl p-5 m-6 bg-white rounded-3xl'>
              {game.endState === 'tie'
                ? 'A tie!? Off with your heads! 🪓💀'
                : game.endState === '👸'
                  ? '👸 Jill wins a ☕️'
                  : '🤴 Jack wins a ☕️'}
            </div>
          }
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
                  <button
                    className='bg-black rounded text-white px-12 py-3 m-6'
                    onClick={() => handleNewGame()}
                  >
                    NEW GAME
                  </button>
                </>

              }
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
