function Othello_Danyo() {

    // Default all values to 0
    this.board = [];
    for (let i = 0; i < 8; i++) {
        const temp = [];
        for (let j = 0; j < 8; j++) {
            temp.push(0);
        }
        this.board.push(temp);
    }

    // Initial tokens
    // 1 is black
    // 2 is white
    this.board[3][3] = 2;
    this.board[3][4] = 1;
    this.board[4][3] = 1;
    this.board[4][4] = 2;
}

module.exports = Othello_Danyo;