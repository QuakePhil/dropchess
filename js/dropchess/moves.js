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
