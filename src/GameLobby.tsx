import { Link, useLoaderData } from "react-router-dom"
import { type Game } from "./game"
import { useState } from "react"

export default function GameLobby() {

    const { games: lobbyList } = useLoaderData<{ games: Game[] }>()

    const [games, setGames] = useState<Game[]>()
    setGames(lobbyList)

    console.log("lobby")

    return (
        <>
            <div className="rounded-4xl bg-blue-200">
                <h1 className="text-blue-900 font-bold text-2xl pt-8 pb-5">Available Games</h1>
                <h1 className="text-blue-900 text-sm">Click a GameID to play</h1>
                <div className="flex flex-col items-center">
                    {games!.map(game => (
                        <Link to={`/game/${game.id}`}>
                            <div
                                className=" hover:bg-sky-900 border font-medium border-blue-800 w-100 p-4 m-3 rounded bg-blue-800 flex flex-col items-start"
                                key={game.id}>
                                <p className="text-xs text-white font-bol">GameID:</p>
                                <p className="text-md text-blue-400 font-mono">{game.id}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>


        </>

    )
}