// Nim Game
// Author a recursive backtracking solver in Python
// for the Nim-like game 10, 9, … 1 (starting with 10 coins, remove one or two on your turn
// with the goal of removing the last coin) and rudimentary playing system
var SpecialMoves;
(function (SpecialMoves) {
    SpecialMoves["LOSE_MOVE"] = "Lose";
    SpecialMoves["UNDECIDED_MOVE"] = "Undecided";
    SpecialMoves["WIN_MOVE"] = "Win";
})(SpecialMoves || (SpecialMoves = {}));


class Solver {
    constructor(game) {
        this.game = game;
        this.memoized = new Map();
    }

    doMove(position, move) {
        return position - move;
    }
    generateMoves(position) {
        return this.game.generateMoves(position);
    }
    primitive(position) {
        if (this.game.isLosePosition(position)) {
            return SpecialMoves.LOSE_MOVE;
        }
        else if (this.game.isWinPosition(position)) {
            return SpecialMoves.WIN_MOVE;
        }
        else {
            return SpecialMoves.UNDECIDED_MOVE;
        }
    }
    solve(position) {
        if (this.memoized.get(position)) {
            return this.memoized.get(position);
        }

        if (this.primitive(position) != SpecialMoves.UNDECIDED_MOVE)
            return this.primitive(position);
        for (const move of this.generateMoves(position)) {
            let newPosition = this.doMove(position, move);
            if (this.solve(newPosition) == SpecialMoves.LOSE_MOVE) {
                this.memoized.set(position, SpecialMoves.WIN_MOVE);
                return SpecialMoves.WIN_MOVE;
            }
        }
        this.memoized.set(position, SpecialMoves.LOSE_MOVE);
        return SpecialMoves.LOSE_MOVE;
    }
}

const {OddEvenGame} = require('./wk2-oddeven-game/odd-even-solver')

const oddEvenSolver = new Solver(OddEvenGame);


const totalSticks = 50;

const stdin = process.openStdin();
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(`${currTurn} draw 1, 2, or 3 stick(s) (${totalSticks} coins left)> `);
rl.prompt();
rl.on('line', function (line) {
    if (Number.isSafeInteger(Number(line))) {
        totalCoins = makeMove(line, totalCoins);
         if (totalCoins !== 0) {
            let computerMove = determineGoodMove(totalCoins);
            if (totalCoins - computerMove == 0) {
                rl.close();
            } else {
                if (computerMove == -1) computerMove = 1;
                 switchTurn()
                rl.setPrompt([
                    `with ${totalCoins} left, COMPUTER made ${computerMove}`,
                    `${currTurn} draw 1 or 2 coin(s) (${totalCoins - computerMove} coins left)> `
                ].join('\n'));
                 totalCoins -= computerMove;
            }
        } else {
            rl.close();
        }
    }
    rl.prompt();
}).on('close',function(){
    console.log(`winner: ${currTurn}`)
    process.exit(0);
});

