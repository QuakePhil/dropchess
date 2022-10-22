function makeRandomMove () {
  console.log("=== makeRandomMove ===")
    var moves = game.moves()
    console.log(moves)

    // game over
    if (moves.length === 0) return

    var i = Math.floor(Math.random() * moves.length)
    recordMove(moves[i])
    game.move(moves[i])
    board.position(game.fen())
    calculate_drop_squares()
}
