// re: https://chessboardjs.com/examples#5003
var lightHighlight = '#a9a9a9'
var darkHighlight = '#696969'

function increment_fen_plycount(fen) {
    var parts = fen.split(' ')
    parts[4] = parseInt(parts[4]) + 1
    parts[5] = parseInt(parts[5])
    if (parts[1] == 'b') {
        parts[5]++
    }
    parts[1] = (parts[1] === 'w' ? 'b' : 'w')
    return parts.join(' ')
}

function drop_move(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    return move
}

function removeHighlights() {
    $('#board .square-55d63').css('background', '')
}

function highlight(square) {
    var square = $('#board .square-' + square)

    var background = lightHighlight
    if (square.hasClass('black-3c85d')) {
        background = darkHighlight
    }

    square.css('background', background)
}

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
