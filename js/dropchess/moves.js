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

function dropMoves() {
  result = []
  for (var j in offboard_pieces) {
    if (offboard_pieces[j] > 0) {
      for (var i in drop_squares) {
        result.push(j.toUpperCase() + "@" + drop_squares[i])
      }
    }
  }
  return result
}

function dropMove(move, complete = true) {
  // check square not already occupied?

  var turn = game.turn()
  var piece = move[0]
  var target = move.substring(2)

  var undo = board.position()
  var position = board.position()
  position[target] = turn + piece
  board.position(position, false)

  var fen = game.fen()
  var last_bits_index = fen.indexOf(' ')
  var next = increment_fen_plycount(board.fen() + fen.substring(last_bits_index))
  if (complete) {
    board.position(next, false)
    game.load(next)
  } else {
    game.load(board.fen() + fen.substring(last_bits_index))
  }
  return undo
}
