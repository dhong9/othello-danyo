const Othello_Danyo = require(".")
const assert = require("assert");

describe("Game Initialization", () => {
    it("initializes board with correct tokens", () => {
        const othello = new Othello_Danyo();
        const expectedBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        assert.deepEqual(othello.board, expectedBoard);
    });
});

describe("Game Utilities", () => {
    it("Verifies that tokens are in bounds", () => {
        const othello = new Othello_Danyo();
        assert.ok(othello.inBounds(2, 5));
        assert.ok(othello.inBounds(0, 0));
        assert.ok(othello.inBounds(7, 7));
        assert.ok(!othello.inBounds(-1, -2));
        assert.ok(!othello.inBounds(9, 8));
    });

    it("Flips pieces", () => {
        const othello = new Othello_Danyo();
        const expectedBoard1 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        const expectedBoard2 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        const board = othello.board;
        othello.flipPieces(board, 3, 4, 1, -1, 2, 1);
        assert.deepEqual(board, expectedBoard1);
        othello.flipPieces(board, 3, 3, 1, 1, 1, 2);
        assert.deepEqual(board, expectedBoard2);
    });

    it("Checks if pieces can be flipped", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        assert.ok(othello.checkFlip(board, 3, 3, 1, 0, 1, 2));
        assert.ok(!othello.checkFlip(board, 3, 1, 1, 0, 1, 2));
    });

    it("Validates moves", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        assert.ok(othello.validMove(board, 2, 3, 1));
        assert.ok(!othello.validMove(board, 2, 2, 2));
    });

    it("Gets valid moves", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        const validMoves1 = othello.getValidMoves(board, 1);
        const validMoves2 = othello.getValidMoves(board, 2);
        const expected1 = [[2, 3], [3, 2], [4, 5], [5, 4]];
        const expected2 = [[2, 4], [3, 5], [4, 2], [5, 3]];
        assert.deepEqual(validMoves1, expected1);
        assert.deepEqual(validMoves2, expected2);
    });

    it("Detects game over", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        assert.ok(!othello.gameOver(board));
        const board2 = othello.board.map((row) => row.map(_ => 2));
        assert.ok(othello.gameOver(board2));
    });

    it("Converts board to a string", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        const fen1 = "8/8/8/3wb3/3bw3/8/8/8 b";
        const fen2 = "8/8/8/3wb3/3bw3/8/8/8 w";
        assert.equal(othello.fen(board, 1), fen1);
        assert.equal(othello.fen(board, 2), fen2);
    });

    it("Calculates score", () => {
        const othello = new Othello_Danyo();
        const board = othello.board;
        const score1 = othello.score(board, 1), score2 = othello.score(board, 2);
        assert.equal(2, score1);
        assert.equal(2, score2);
    });
});

describe("Gameplay", () => {
    it("Plays a game", () => {
        const othello = new Othello_Danyo();
        
        // Starting position
        const move0 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        assert.deepEqual(othello.board, move0);
        
        // Move 1
        const move1 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        othello.makeMove(othello.board, 2, 3, 1);
        assert.deepEqual(othello.board, move1);

        // Move 2
        const move2 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        othello.makeMove(othello.board, 4, 2, 2);
        assert.deepEqual(othello.board, move2);

        // Move 3
        const move3 = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 2, 1, 2, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        othello.makeMove(othello.board, 5, 2, 1);
        assert.deepEqual(othello.board, move3);
    })
});

describe("Min/Max Utilities", () => {
    it("copies board", () => {
        const othello = new Othello_Danyo();
        const bCopy = othello.copyBoard(othello.board);
        othello.board[0][0] = 2; // Make sure that modifying original board doesn't affect copy
        const expectedBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        assert.deepEqual(bCopy, expectedBoard);
    });

    it("computes heuristic", () => {
        const othello = new Othello_Danyo();
        
        // Initial state
        const move0 = othello.board;
        assert.equal(othello.heuristic(move0, 1), 0);
        assert.equal(othello.heuristic(move0, 2), 0);

        // Move 1
        othello.makeMove(move0, 2, 3, 1);
        const move1 = othello.board;
        assert.equal(othello.heuristic(move1, 1), 3);
        assert.equal(othello.heuristic(move1, 2), -3);

        // Move 2
        othello.makeMove(move1, 2, 4, 2);
        const move2 = othello.board;
        assert.equal(othello.heuristic(move2, 1), 0);
        assert.equal(othello.heuristic(move2, 2), 0);
    })
});