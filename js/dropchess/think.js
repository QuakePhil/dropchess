function evaluate(move) {
  // want to value dropping pawns the most, reserve heavier pieces for later
  var drop_order = ["Q", "R", "B", "N", "P"]
  var value = 0.0 // TODO: sum own material
  var undo = game.fen()
  var previous = game.turn()
  // console.log("evaluate before", move, game.fen(), game.in_check())
  if (move[1] == "@") {
    undo_position = dropMove(move, false)
    value += drop_order.indexOf(move[0])
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
    var v = evaluate(moves[i])
    if (v != -1.0) { // drop move in check
      values.push({move: moves[i], value: v})
    }
  }

  var sorted = values.sort((a, b) => (a.value > b.value ? -1 : 1))
  // TODO: cull drop moves with value = -1 (illegal drops)
  // and make the illegal via drop_squares
  if (sorted.length == 0) {
    alert("Game over!")
    // TODO: update pgn
    return
  }
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
