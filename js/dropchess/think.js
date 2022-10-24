function dropMoves() {
  result = []
  console.log(offboard_pieces)
  console.log(drop_squares)
  for (var j in offboard_pieces) {
    for (var i in drop_squares) {
      result.push(j.toUpperCase() + "@" + drop_squares[i])
    }
  }
  return result
}

function dropMove(move) {
  // check square not already occupied?

  var turn = game.turn()
  var piece = move[0]
  var target = move.substring(2)

  var position = board.position()
  position[target] = turn + piece
  board.position(position)

  var fen = game.fen()
  var last_bits_index = fen.indexOf(' ')
  next = increment_fen_plycount(board.fen() + fen.substring(last_bits_index))
  // console.log("after drop", next)
  board.position(next)
  game.load(next)
}

function evaluate(move) {
  var piece_value = { Q: 9.0, R: 5.0, N: 3.0, B: 3.0, P: 1.0}
  if (move[1] == "@") {
    return piece_value[move[0]]
  }
  // try making the move and evaluate the resulting position for checks, etc...
  return 1.0
}

function makeRandomMove () {
  console.log("=== makeRandomMove ===")
  var moves = game.moves().concat(dropMoves())
  var values = []
  for (var i in moves) {
    values.push({move: moves[i], value: evaluate(moves[i])})
  }

  var sorted = values.sort((a, b) => (a.value > b.value))

  console.log(sorted) // why isn't this sorted?

  // game over
  if (moves.length === 0) return

  var i = Math.floor(Math.random() * moves.length)
  recordMove(moves[i])
  if (moves[i][1] == "@") {
    dropMove(moves[i])
  } else {
    game.move(moves[i])
  }
  board.position(game.fen())
  calculate_drop_squares()
}
