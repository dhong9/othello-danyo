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
        return board;
    }

    checkFlip(board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) {
        if (this.inBounds(r, c) && board[r][c] === opponentPiece) {
            while (this.inBounds(r + deltaRow, c + deltaCol)) {
                r += deltaRow;
                c += deltaCol;
                if (!board[r][c]) return false;// not consecutive
                if (board[r][c] === myPiece) return true; // At least one piece we can flip
              }
              // It is an opponent piece, just keep scanning in our direction
        }
          return false; // Either no consecutive opponent pieces or hit the edge
    }

    validMove(board, r, c, piece) {
        // Check that the coordinates are empty
        if (!this.inBounds(r, c) || board[r][c]) return false;

        // Figure out the character of the opponent's piece
        const opponent = piece === 2 ? 1 : 2;

        // If we can flip in any direction, it is valid
        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, -1],
            [0, 1]
        ]
        return directions.some(([deltaRow, deltaCol]) => this.checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent));
    }

    getValidMoves(board, piece) {
        const moves = [];

        // Check each square of the board and if we can move there, remember the coords
        for (let r = 0; r < 8; r++)
            for (let c = 0; c < 8; c++)
                if (this.validMove(board, r, c, piece))
                    moves.push([r, c]);
        
        return moves;
    }

    gameOver(board) {
        const moves1 = this.getValidMoves(board, 1),
              moves2 = this.getValidMoves(board, 2);
        return moves1.length < 1 && moves2.length < 1;
    }

    makeMove(board, r, c, piece) {
        // Put the piece at x, y
        board[r][c] = piece;

        // Figure of the character of the opponent's piece
        const opponent = piece === 2 ? 1 : 2;

        // Check all 8 directions
        const directions = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
            [0, 1],
            [0, -1],
            [1, 0],
            [0, -1]
        ];
        for (const [deltaRow, deltaCol] of directions) {
            // If pieces can be flipped in that direction,
            // then flip all valid pieces
            if (this.checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent))
                this.flipPieces(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent);
        }
    }

    fen(board, curPlayer) {
        return board.map(row => row.map(curr => " bw"[curr]).join('').replace(/ +/g, x => x.length)).join('/') + ' ' + (curPlayer === 2 ? 'w' : 'b');
    }

    score(board, piece) {
        let total = 0;
        for (const row of board)
            for (const cell of row)
                total += piece === cell;
        return total;
    }

    copyBoard(board) {
        return board.map(row => [...row]);
    }
}

module.exports = Othello_Danyo;