// Nim Game
// Author a recursive backtracking solver in Python
// for the Nim-like game 10, 9, … 1 (starting with 10 coins, remove one or two on your turn
// with the goal of removing the last coin) and rudimentary playing system

// If you are left to draw from...

declare var require: any
declare var process: any


// const BAD_MOVE = -1;

// const maxCoins = 10;
const maxDraw = 2;
// const players = ['HUMAN', 'COMPUTER']

// let totalCoins = maxCoins;
// let currTurn = players[0];

// function switchTurn() {
//     currTurn = players.find(p => p != currTurn);
// }

// function playGame(num, currCoins) {
//     if (currCoins === 0) return currCoins;

//     if (currTurn === 'HUMAN') {
//         return makeMove(num, currCoins)
//     } else {
//         // return makeComputer
//     }
// }

// function makeMove(num, currCoins) {
//     // console.log(currTurn)
//     if (num > maxDraw) {
//         num = maxDraw;
//     } else if (num < maxDraw) {
//         num = 1;
//     }

//     if (currCoins - num > 0) {
//         currCoins -= num;
//         switchTurn();
//     } else {
//         currCoins = 0
//     }

//     return currCoins;
// }

// function determineGoodMove(currCoins) {
//     let limit = (currCoins < maxDraw) ? currCoins : maxDraw;

//     for (let nTaken = 1; nTaken <= limit; nTaken++) {
//         if (determineBadPosition(currCoins - nTaken)) {
//             return nTaken;
//         }
//     }

//     return BAD_MOVE;
// }

// function determineBadPosition(currCoins) {
//     if (currCoins % 2 == 1) return true;
//     if (currCoins == 0) return false;
//     return determineGoodMove(currCoins) == BAD_MOVE;
// }

// determineGoodMove(5)

// const stdin = process.openStdin();
// var readline = require('readline');
// var rl = readline.createInterface(process.stdin, process.stdout);
// rl.setPrompt(`${currTurn} draw 1 or 2 coin(s) (${totalCoins} coins left)> `);
// rl.prompt();
// rl.on('line', function (line) {
//     if (Number.isSafeInteger(Number(line))) {
//         totalCoins = makeMove(line, totalCoins);

//         if (totalCoins !== 0) {
//             let computerMove = determineGoodMove(totalCoins);
//             if (totalCoins - computerMove == 0) {
//                 rl.close();
//             } else {
//                 if (computerMove == -1) computerMove = 1;

//                 switchTurn()
//                 rl.setPrompt([
//                     `with ${totalCoins} left, COMPUTER made ${computerMove}`,
//                     `${currTurn} draw 1 or 2 coin(s) (${totalCoins - computerMove} coins left)> `
//                 ].join('\n'));

//                 totalCoins -= computerMove;
//             }
//         } else {
//             rl.close();
//         }
//     }
//     rl.prompt();
// }).on('close',function(){
//     console.log(`winner: ${currTurn}`)
//     process.exit(0);
// });

enum SpecialMoves {
    LOSE_MOVE = "Lose",
    UNDECIDED_MOVE = "Undecided",
    WIN_MOVE = "Win"
}

function doMove(position, move) {
    return position - move;
}

function generateMoves(position) {
    return (position < maxDraw) ? position : position % 3;
}

function primitive(position) {
    if (position % 3 == 0) {
        return SpecialMoves.LOSE_MOVE;
    }
    else if (position - maxDraw <= maxDraw) {
        return SpecialMoves.WIN_MOVE;
    }
    else {
        // return SpecialMoves.UNDECIDED_MOVE;
        return primitive(position - doMove(position, generateMoves(position)))
    }
}

function solve(position) {
    return primitive(position);
}

for (let i of [...Array(11).keys()]) {
    console.log(solve(i));
}
