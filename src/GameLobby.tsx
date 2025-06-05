import { Link, useLoaderData } from "react-router-dom"
import { type Game } from "./game"
import { useState } from "react"

export default function GameLobby() {

    const { games: lobbyList } = useLoaderData<{ games: Game[] }>()

    const [games, setGames] = useState<Game[]>(lobbyList)

    console.log("lobby")

    return (
        <>
            <div className="text-black">Game Lobby</div>
            <p>List of Games</p>
            {games.map(game => (
                <div key={game.id}>
                    <Link to={`/game/${game.id}`}>{game.id}</Link>
                </div>
            ))}
        </>

    )
}