class Othello_Danyo {
    constructor() {
        this.board = this.createBoard();
    }

    createBoard() {
        // Default all values to 0
        const board = [];
        for (let i = 0; i < 8; i++) {
            const temp = [];
            for (let j = 0; j < 8; j++) {
                temp.push(0);
            }
            board.push(temp);
        }

        // Initial tokens
        // 1 is black
        // 2 is white
        board[3][3] = 2;
        board[3][4] = 1;
        board[4][3] = 1;
        board[4][4] = 2;

        return board;
    }

    inBounds(r, c) {
        return r >= 0 && r < 8 && c >= 0 && c < 8;
    }

    flipPieces(board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) {
        while (this.inBounds(r, c) && board[r][c] === opponentPiece) {
            board[r][c] = myPiece;
            r += deltaRow;
            c += deltaCol;
        }
    }
}

module.exports = Othello_Danyo;