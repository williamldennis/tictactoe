import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import GameView from './GameView.tsx'
import GameLobby from './GameLobby.tsx'
import { TicTacToeApiClient } from './api.ts'

const api = new TicTacToeApiClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: GameLobby,
        loader: async () => {
          const games = await api.getGames()
          return { games }
        }
      },
      {
        path: "/game/:gameId",
        Component: GameView,
        loader: async ({ params }) => {
          if (!params.gameId) {
            throw new Error("Game ID is required")
          }
          const game = await api.getGame(params.gameId)
          return { game }
        }
      }
    ]
  }


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


