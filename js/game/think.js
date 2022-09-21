function makeRandomMove () {
    var moves = game.moves()

    // game over
    if (moves.length === 0) return

    var i = Math.floor(Math.random() * moves.length)
    game.move(moves[i])
    board.position(game.fen())
}
