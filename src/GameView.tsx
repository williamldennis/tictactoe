import clsx from 'clsx'
import { type Cell, type Game, type Row } from './game'
import { TicTacToeApiClient } from './api'
import { GAME_UPDATED, USER_JOINED, GAME_REMATCH } from "../constants";
import { useEffect, useState, useRef } from 'react'
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { io, type Socket } from "socket.io-client";


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
    const navigate = useNavigate()

    const { game: initialGame } = useLoaderData<{ game: Game }>()

    const [game, setGame] = useState<Game>(initialGame)


    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        const socket = io("http://localhost:3000")
        socketRef.current = socket

        socket.on("connect", () => {
            console.log("connected to socket")
            //join game room

            socket.emit("join-game", game.id)

            socket.on(USER_JOINED, (userId: string) => {
                console.log(`user ${userId} joined`)
            })
            socket.on(GAME_UPDATED, (game: Game) => {
                console.log("game updated", game)
                setGame(game)
            })
            socket.on(GAME_REMATCH, (newGame: Game) => {
                console.log("Rematch received", newGame)
                setGame(newGame)
                navigate(`/game/${newGame.id}`)
            })

        })

        return () => {
            socket.disconnect()
        }
    }, [game.id])

    async function handleRematch() {
        console.log("rematch button clicked");
        const newGame = await api.createRematch()
        socketRef.current?.emit(GAME_REMATCH, { oldGameId: game.id, newGame })
        setGame(newGame)
        navigate(`/game/${newGame.id}`) // 🔁 force URL update
    }
    async function handleMove(rowIndex: number, colIndex: number) {
        const nextGame = await api.makeMove(game!.id, rowIndex, colIndex)
        setGame(nextGame)

        console.log("Making move for game", game!.id, "at", rowIndex, colIndex)

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

    if (!game) {
        return (
            <div>Loading...</div>
        )
    }
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
                                    onClick={handleRematch}
                                >
                                    REMATCH
                                </button>
                            </>

                        }
                    </div>
                </div>

            </div>
        </div>
    )



}