import { useState } from 'react'
import './App.css'
import { initialGameState, type Cell } from './game'


function App() {

  const [game, setGame] = useState(initialGameState())

  const cellToCell = (cell: Cell, cellIndex: number) => {
    return <div className='p-10 border'>{cellIndex} {cell}</div>
  }

  function rowToRow(row: Cell[], rowIndex: number) {
    return <div className='flex justify-center align middle'>{row.map(cellToCell)}<br /></div>
  }

  return (
    <>
      <h1 className='font-bold text-4xl'>Jill Jack Joe</h1> 
      <p className='font-semibold text-sm p-10'>Line up 3 Jacks or 3 Jills. Win a cup of joe.</p>
      {game.board.map(rowToRow)}
    </>
  )
}

export default App
