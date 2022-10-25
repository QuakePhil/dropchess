function dropMoves() {
  result = []
  for (var j in offboard_pieces) {
    for (var i in drop_squares) {
      result.push(j.toUpperCase() + "@" + drop_squares[i])
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

function evaluate(move) {
  var value = 0.0 // todo sum own material
  var undo = game.fen()
  var previous = game.turn()
  // console.log("evaluate before", move, game.fen(), game.in_check())
  if (move[1] == "@") {
    undo_position = dropMove(move, false)
  } else {
    game.move(move)
  }
  if (game.in_check()) {
    value = -1.0
  }
  // console.log("evaluate after:", move, game.fen(), game.in_check())
  if (move[1] == "@") {
    board.position(undo_position, false)
  }
  game.load(undo)
  return value
}

function makeRandomMove () {
  console.log("=== makeRandomMove ===")
  var moves = game.moves().concat(dropMoves())
  // game over
  if (moves.length === 0) return

  var values = []
  for (var i in moves) {
    values.push({move: moves[i], value: evaluate(moves[i])})
  }

  var sorted = values.sort((a, b) => (a.value > b.value ? -1 : 1))
  // TODO: cull drop moves with value = -1 (illegal drops)
  // and make the illegal via drop_squares
  var best = sorted[0].move
  console.log(sorted)

  recordMove(best)
  if (best[1] == "@") {
    dropMove(best)
  } else {
    game.move(best)
  }
  /*
  var i = Math.floor(Math.random() * moves.length)
  recordMove(moves[i])
  if (moves[i][1] == "@") {
    dropMove(moves[i])
  } else {
    game.move(moves[i])
  }
  */
  board.position(game.fen())
  calculate_drop_squares()
}
