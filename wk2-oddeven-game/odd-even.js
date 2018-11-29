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
const memoized = new Map();
memoized.set(0, SpecialMoves.LOSE_MOVE);
memoized.set(1, SpecialMoves.WIN_MOVE);
memoized.set(2, SpecialMoves.WIN_MOVE);
function doMove(position, move) {
    return position - move;
}
function generateMoves(position) {
    return (position < 2) ? [1] : (position < 3) ? [1, 2] : [1, 2, 3];
}
function primitive(position) {
    if (position == 0 || position == 1) {
        return SpecialMoves.LOSE_MOVE;
    }
    else if (position == 2 || position == 3) {
        return SpecialMoves.WIN_MOVE;
    }
    else {
        return SpecialMoves.UNDECIDED_MOVE;
    }
}
function solve(position) {
    if (memoized.get(position)) {
        return memoized.get(position);
    }
    ;
    if (primitive(position) != SpecialMoves.UNDECIDED_MOVE)
        return primitive(position);
    for (let move of generateMoves(position)) {
        let newPosition = doMove(position, move);
        if (solve(newPosition) == SpecialMoves.LOSE_MOVE) {
            memoized.set(position, SpecialMoves.WIN_MOVE);
            return {status: SpecialMoves.WIN_MOVE, move: move };
        }
    }
    memoized.set(position, SpecialMoves.LOSE_MOVE);
    return SpecialMoves.LOSE_MOVE;
}




for (const i of [...Array(100).keys()]) {
    console.log(solve(i));
}