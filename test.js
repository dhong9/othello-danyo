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
    })
})