// Nim Game
// Author a recursive backtracking solver in Python
// for the Nim-like game 10, 9, … 1 (starting with 10 coins, remove one or two on your turn
// with the goal of removing the last coin) and rudimentary playing system

class OddEvenGame {
    constructor() {
        this.generateMoves()
        this.isLosePosition()
        this.isWinPosition()
    }

    generateMoves(position) {
        return (position < 2) ? [1] : (position < 3) ? [1, 2] : [1, 2, 3];
    }
    isLosePosition(position) {
        return (position == 0 || position == 1);
    }
    isWinPosition(position) {
        return (position == 2 || position == 3);
    }
}

module.exports = { OddEvenGame }
