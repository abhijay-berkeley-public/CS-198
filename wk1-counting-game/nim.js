// Nim Game
// Author a recursive backtracking solver in Python
// for the Nim-like game 10, 9, … 1 (starting with 10 coins, remove one or two on your turn
// with the goal of removing the last coin) and rudimentary playing system

const BAD_MOVE = -1;

const maxCoins = 10;
const maxDraw = 2;
const players = ['HUMAN', 'COMPUTER']

let totalCoins = maxCoins;
let currTurn = players[0];

function switchTurn() {
    currTurn = players.find(p => p != currTurn);
}

function playGame(num, currCoins) {
    if (currCoins === 0) return currCoins;

    if (currTurn === 'HUMAN') {
        return makeMove(num, currCoins)
    } else {
        return makeComputer
    }
}

function makeMove(num, currCoins) {
    // console.log(currTurn)
    if (num > maxDraw) {
        num = maxDraw;
    } else if (num < maxDraw) {
        num = 1;
    }

    if (currCoins - num > 0) {
        currCoins -= num;
        switchTurn();
    } else {
        currCoins = 0
    }

    return currCoins;
}

function determineGoodMove(currCoins) {
    let limit = (currCoins < maxDraw) ? currCoins : maxDraw;

    for (let nTaken = 1; nTaken <= limit; nTaken++) {
        if (determineBadPosition(currCoins - nTaken)) {
            return nTaken;
        }
    }

    return BAD_MOVE;
}

function determineBadPosition(currCoins) {
    if (currCoins % 2 == 1) return true;
    if (currCoins == 0) return false;
    return determineGoodMove(currCoins) == BAD_MOVE;
}

determineGoodMove(5)

const stdin = process.openStdin();
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(`${currTurn} draw 1 or 2 coin(s) (${totalCoins} coins left)> `);
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

