function onDragStart(source, piece) {
    // highlight drop squares for spare pieces
    if (source == 'spare') {
        for (var i = 0; i < drop_squares.length; i++) {
            highlight(drop_squares[i])
        }
    }

    // only pick up own pieces
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop(source, target) {
    removeHighlights()

    // see if the move is legal
    var move = drop_move(source, target)
    if (move === null && source == 'spare' && drop_squares.includes(target)) {
        // TODO: need to also place (source, target) into next fen
        next = increment_fen_plycount(game.fen())
        console.log("after drop", next)
        board.position(next, false)
        game.load(next)
        return 'drop'
    }

    // illegal move
    if (move === null) return 'snapback'
    console.log("after move", game.fen())
}

function onMouseoverSquare(square, piece) {

    // get list of possible moves for this square
    var moves = game.moves({
        square: square,
        verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    highlight(square)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        highlight(moves[i].to)
    }
}

function onMouseoutSquare(square, piece) {
    removeHighlights()
}

function onSnapEnd(source) {
    if (source == 'spare') {

    }
    var fen = game.fen()
    var last_bits_index = fen.indexOf(' ')
    game.load(board.fen() + fen.substring(last_bits_index))
    calculate_drop_squares()
}
