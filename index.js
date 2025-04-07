/**
 * Othello game class with min/max and reinforcement learning algorithms
 */
class Othello_Danyo {

    /**
     * Constructor for the Othello class
     */
    constructor() {
        this.board = this.createBoard();
    }

    /**
     * Defines game board starting state
     * @returns Default game board starting state
     */
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

    /**
     * Checks if requested row and column are within the game board
     * @param {Number} r 
     * @param {Number} c 
     * @returns true if row and column are in bounds
     */
    inBounds(r, c) {
        return r >= 0 && r < 8 && c >= 0 && c < 8;
    }

    /**
     * Flips pieces to the player's color until it reaches the board's
     * edge or an opponent's piece
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} r row
     * @param {Number} c column
     * @param {Number} deltaRow row direction 
     * @param {Number} deltaCol column direction
     * @param {Number} myPiece player's piece
     * @param {Number} opponentPiece opponent's piece
     * @returns resulting board after pieces are flipped
     */
    flipPieces(board, r, c, deltaRow, deltaCol, myPiece, opponentPiece) {
        while (this.inBounds(r, c) && board[r][c] === opponentPiece) {
            board[r][c] = myPiece;
            r += deltaRow;
            c += deltaCol;
        }
        return board;
    }

    /**
     * Checks if any pieces can be flipped in a given direction
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} r row
     * @param {Number} c column
     * @param {Number} deltaRow row direction
     * @param {Number} deltaCol column piece
     * @param {Number} myPiece player's piece
     * @param {Number} opponentPiece 
     * @returns true if any pieces can be flipped
     */
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

    /**
     * Checks if a piece can be placed in given location
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} r row
     * @param {Number} c column
     * @param {Number} piece player's piece
     * @returns true if move is valid
     */
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

    /**
     * Gets coordinates that a piece can be played
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} piece player's piece
     * @returns Array of legal coordinates
     */
    getValidMoves(board, piece) {
        const moves = [];

        // Check each square of the board and if we can move there, remember the coords
        for (let r = 0; r < 8; r++)
            for (let c = 0; c < 8; c++)
                if (this.validMove(board, r, c, piece))
                    moves.push([r, c]);
        
        return moves;
    }

    /**
     * Checks if game is over
     * @param {Array<Array<Number>>} board the game board
     * @returns true if game is over
     */
    gameOver(board) {
        const moves1 = this.getValidMoves(board, 1),
              moves2 = this.getValidMoves(board, 2);
        return moves1.length < 1 || moves2.length < 1;
    }

    /**
     * Plays a piece on the board
     * @param {*} board the game board
     * @param {*} r row
     * @param {*} c column
     * @param {*} piece player's piece
     */
    makeMove(board, r, c, piece) {
        // Put the piece at x, y
        board[r][c] = piece;

        // Figure of the character of the opponent's piece
        const opponent = piece === 2 ? 1 : 2;

        // Check all 8 directions
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
        for (const [deltaRow, deltaCol] of directions) {
            // If pieces can be flipped in that direction,
            // then flip all valid pieces
            if (this.checkFlip(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent))
                this.flipPieces(board, r + deltaRow, c + deltaCol, deltaRow, deltaCol, piece, opponent);
        }
    }

    /**
     * Provides string representation of the current game state in FEN notation
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} curPlayer current player
     * @returns FEN representation of the board
     */
    fen(board, curPlayer) {
        return board.map(
            // 0 -> ' ' (space)
            // 1 -> 'b' (black)
            // 2 -> 'w' (white)
            row => row.map(curr => " bw"[curr])
        .join('')
        // Compress consecutive blank spaces into a number representing how many
        .replace(/ +/g, x => x.length))
        // Separate each row with a '/'
        .join('/') + ' ' + (curPlayer === 2 ? 'w' : 'b'); // Append active player to the end
    }

    /**
     * Tallies how many of a player's piece is on the board
     * @param {Array<Array<Number>>} board the game board
     * @param {number} piece player's piece
     * @returns player's current score
     */
    score(board, piece) {
        let total = 0;
        for (const row of board)
            for (const cell of row)
                total += piece === cell;
        return total;
    }

    /**
     * Provides a deep copy of the board
     * @param {Array<Array<Number>>} board the game board
     * @returns Copy of the board
     */
    copyBoard(board) {
        return board.map(row => [...row]);
    }

    /**
     * Computes net gain/loss in relation to the current player
     * @param {Array<Array<Number>>} board the game board
     * @param {Number} whoseTurn current player
     * @returns Score difference between current player and opponent
     */
    heuristic(board, whoseTurn) {
        const opponent = whoseTurn === 2 ? 1 : 2;
        const ourScore = this.score(board, whoseTurn), oppScore = this.score(board, opponent);
        return ourScore - oppScore;
    }

    /**
     * Calculates gain/loss given the board's current state
     * @param {Array<Array<Number>>} board the game board
     * @param {*} originalTurn original player to base score on
     * @param {*} currentTurn current player
     * @param {*} searchPly current search depth
     * @returns min/max score
     */
    minimaxValue(board, originalTurn, currentTurn, searchPly) {
        if (searchPly === 5 || this.gameOver(board)) // Change to desired ply lookahead
            return this.heuristic(board, originalTurn);
        
        const opponent = currentTurn === 2 ? 1 : 2;

        const moves = this.getValidMoves(board, currentTurn);
        if (moves.length < 1) // if no moves skip to next player's turn
            return this.minimaxValue(board, originalTurn, opponent, searchPly + 1);
        
        // Remember the best move
        let bestMoveVal = originalTurn === currentTurn ? -1/0 : 1/0;
        for (const [moveRow, moveCol] of moves) {
            // Apply the move to a new board
            const tempBoard = this.copyBoard(board);
            this.makeMove(tempBoard, moveRow, moveCol, currentTurn);
            // Recursive call
            const val = this.minimaxValue(tempBoard, originalTurn, opponent, searchPly + 1);
            // Remember best move
            if (originalTurn === currentTurn) {
                // Remember max if it's the originator's turn
                if (val > bestMoveVal) bestMoveVal = val;
            } else {
                // Remember min if it's opponent turn
                bestMoveVal = val;
            }
        }
        return bestMoveVal;
    }

    /**
     * Uses min/max algorithm to compute the best move
     * @param {*} board the game board
     * @param {*} whoseTurn current player
     * @returns Best computed move
     */
    minimaxDecision(board, whoseTurn) {
        const opponent = whoseTurn === 2 ? 1 : 2;

        const moves = this.getValidMoves(board, whoseTurn);

        // If there are no moves, return -1
        if (moves.length < 1) return [-1, -1];

        let bestMoveVal = -1/0;
        let bestX, bestY = moves[0];

        // Try out every move
        for (const [xMove, yMove] of moves) {
            const tempBoard = this.copyBoard(board);
            this.makeMove(tempBoard, xMove, yMove, whoseTurn);
            // Recursive call, initial search ply = 1
            const val = this.minimaxValue(tempBoard, whoseTurn, opponent, 1);
            // Remember the best move
            if (val > bestMoveVal) {
                bestMoveVal = val;
                bestX = xMove;
                bestY = yMove;
            }
        }

        return [bestX, bestY]
    }

    /**
     * Updates given Q-table
     * @param {Object} qTable Q table
     * @param {String} state board state in string format
     * @param {Number} action number that combines row with column
     * @param {String} newState board updated state in string format
     * @param {Number} reward how good/bad the move was
     * @param {Number} learningRate learning rate
     * @param {Number} discountFactor discount factor
     */
    updateQValues(qTable, state, action, newState, reward, learningRate=0.1, discountFactor=0.9) {
        if (!(state in qTable))
            qTable[state] = {};
        
        if (!(action in qTable[state])) qTable[state][action] = 0;
        
        const maxFutureQ = Math.max(...Object.values(qTable[newState] || {0: 0}));
        
        // Apply learning rule
        qTable[state][action] += learningRate * (reward + discountFactor * maxFutureQ - qTable[state][action]);
    }

    /**
     * Runs games of Othello with reinforcement learning
     * @param {Array<Array<Number>>} board  the game board
     * @param {Number} rounds Number of games to train in one sitting
     * @returns Q tables for both players
     */
    train(board, rounds) {
        const qTable_white = {}, qTable_black = {};
        let curPlayer = 1;
        for (let i = 0; i < rounds; i++) {
            const prevBoard = this.copyBoard(board);
            while (!this.gameOver(board)) {
                // Get Q values
                const prevState = this.fen(board, curPlayer);
                const qValues = (curPlayer === 2 ? qTable_white[prevState] : qTable_black[prevState]) || {};
                const moves = this.getValidMoves(board, curPlayer);
                
                // Exploration: Random move with probability epsilon
                const epsilon = 0.1;
                const randomIndex = Math.floor(Math.random() * moves.length);
                const randomMove = moves[randomIndex];
                const bestMove = moves.reduce((best, move) => (qValues[move] || 0) > (qValues[best] || 0) ? move : best);
                const [selectedRow, selectedCol] = Math.random() < epsilon ? randomMove : bestMove;
                this.makeMove(board, selectedRow, selectedCol, curPlayer);

                // Calculate reward
                const reward = this.heuristic(board, curPlayer);
                const action = selectedRow * 8 + selectedCol;
                const curState = this.fen(board, curPlayer);
                this.updateQValues(curPlayer == 2 ? qTable_white : qTable_black, prevState, action, curState, reward);

                // Update game
                curPlayer = curPlayer === 2 ? 1 : 2;
            }
            board = this.copyBoard(prevBoard);
            curPlayer = 1;
        }

        return [qTable_white, qTable_black];
    }
}

module.exports = Othello_Danyo;