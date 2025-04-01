# Othello

Othello is a Node.js implementation of the classic board game Othello (also known as Reversi). This package includes game logic, a Minimax AI, and reinforcement learning capabilities.

## Features

- Full Othello game implementation
- Minimax algorithm for AI decision-making
- Reinforcement learning (Q-learning) for AI training
- Board representation using FEN notation

## Installation

You can install this package using npm:

```sh
npm install othello-danyo
```

## Usage

### Importing the Module

```js
const Othello = require('othello-danyo');
```

### Creating a Game Instance

```js
const game = new Othello();
console.log(game.board); // Prints the initial board
```

### Checking Valid Moves

```js
const validMoves = game.getValidMoves(game.board, 1); // Get valid moves for player 1
console.log(validMoves);
```

### Making a Move

```js
const [row, col] = [2, 3];
game.makeMove(game.board, row, col, 1);
console.log(game.board);
```