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
        ]
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
})