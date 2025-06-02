# Simple Game

## Overview

Pick a Tic Tac Toe style game and build it from scratch in React. Good contenders for this project are 2-4 player games with simple positional rules and straightforward win conditions, like Connect4, Battleship, or Dots and Boxes.

Once you're confident in your game logic, make sure it looks and feels good to play.

Then, as a bonus, add AI.

## Core Concepts
- Data Structures  
- Algorithms
- React

## Features

A simple version of your game should have the following:
- [ ] Game Engine
      - [X] Separate game logic from React components
      - [X] Track game state (board, current player, etc.)
      - [X] Allow users to calculate moves
      - [X] Handle move validation
      - [X] Detect win/lose/draw conditions
- [ ] Frontend/React Game Interface
      - [X] Display current game state
      - [X] Allow players to make moves by using the game engine
      - [X] Show game status (whose turn, winner, etc.)
      - [X] Reset/restart game functionality

Bonus:
- [ ] \[Styling\] - Make it look sexy. Add animations for game moves (react-spring, framer, keyframes)
- [ ] \[Routing\] - Multiple pages with navigation:
      - [ ] Start/menu page with game mode selection (Player vs Player, Player vs AI)
      - [ ] Game page for active gameplay
- [ ] \[Algorithms\] - Player vs AI modes: start with random moves, then implement minimax or other algorithms for calculating optimal moves