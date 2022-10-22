// TODO: hook into an object?
var game_config = {
    sparePieces: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
}

var board = Chessboard('board', game_config)

function new_board() {
    board.position(just_the_kings)
}
