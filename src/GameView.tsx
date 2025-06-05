import clsx from 'clsx'
import { type Cell, type Game, type Row } from './game'
import { TicTacToeApiClient } from './api'
import { useMemo } from "react";
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

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
            className={`w-32 h-32 flex items-center justify-center text-5xl opacity-80 ${borderClass} ${cell === '👸' ? "bg-red-400" : ""} ${cell === '🤴' ? "bg-blue-700" : ""}`}
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

const api = new TicTacToeApiClient()

export default function GameView() {

    const { game: initialGame } = useLoaderData<{ game: Game }>()

    const [game, setGame] = useState<Game>(initialGame)

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
        console.log("Making move for game", game!.id, "at", rowIndex, colIndex)

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

    const backgroundImageStyle = clsx(
        "mt-4 w-160 h-160 rounded-4xl  bg-cover bg-center",
        !game.endState && "bg-[url('assets/tic-tac-toe.png')]",
        game.endState === '👸' && "bg-[url('assets/jill-wins.gif')]",
        game.endState === '🤴' && "bg-[url('assets/jack-wins.gif')]",
        game.endState === 'tie' && "bg-[url('assets/sad-losers-2.gif')]"
        ///
    )

    const bannerStyle = clsx(
        "text-5xl p-5 m-6 rounded-3xl",
        game.currentPlayer === '👸' && "bg-red-200",
        game.currentPlayer === '🤴' && "bg-blue-200"
    )

    return (
        <div className="flex items-center justify-center">

            <div className={backgroundImageStyle}>

                {!game.endState &&
                    <p className={bannerStyle}>
                        Turn: {game.currentPlayer === '👸' ? '👸 Jill' : '🤴 Jack'}
                    </p>}
                {game.endState &&
                    <div className='text-4xl p-5 m-6 bg-white rounded-3xl'>
                        {game.endState === 'tie'
                            ? 'A tie!? You spilled the coffee.'
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
    )



}