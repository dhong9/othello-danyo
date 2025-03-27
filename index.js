function Othello_Danyo() {
    this.board = this.createBoard();    
}

Othello_Danyo.prototype.createBoard = () => {
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

Othello_Danyo.prototype.inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

Othello_Danyo.prototype.flipPieces = (board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) => {
    while (this.inBounds(board, r, c) && board[r][c] === opponentPiece) {
        board[r][c] = myPiece;
        r += deltaRow;
        c += deltaCol;
    }
}

Othello_Danyo.prototype,checkFlip = (board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) => {
    if (inBounds(r, c) && board[r][c] === opponentPiece) {
        while (inBounds(r + deltaRow, c + deltaCol)) {
            r += deltaRow;
            c += deltaCol;
            if (!board[r][c]) return false; // not consecutive
            if (board[r][c] === myPiece) return true; // At least one piece we can flip
        }
        return false; // Either no consecutive opponent pieces or hit the edge
    }
}

module.exports = Othello_Danyo;