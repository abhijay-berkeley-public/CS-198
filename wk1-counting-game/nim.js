// Nim Game
// Author a recursive backtracking solver in Python
// for the Nim-like game 10, 9, … 1 (starting with 10 coins, remove one or two on your turn
// with the goal of removing the last coin) and rudimentary playing system
const maxDraw = 2;
var SpecialMoves;
(function (SpecialMoves) {
    SpecialMoves["LOSE_MOVE"] = "Lose";
    SpecialMoves["UNDECIDED_MOVE"] = "Undecided";
    SpecialMoves["WIN_MOVE"] = "Win";
})(SpecialMoves || (SpecialMoves = {}));
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
        return primitive(position - doMove(position, generateMoves(position)));
    }
}
function solve(position) {
    return primitive(position);
}
for (let i of [...Array(11).keys()]) {
    console.log(solve(i));
}
//# sourceMappingURL=nim.js.map