var pgn

function recordMove(san) {
  pgn.push(san)
  var gameSoFar = ""
  pgn.forEach((x, i) => {
    if (i % 2 == 0) {
      if (i > 0) {
        gameSoFar += " "
      }
      gameSoFar += ((i/2) + 1) + "."
    }
    gameSoFar += " " + x
  })
  console.log("PGN:", gameSoFar)
  $('#pgn-so-far').text(gameSoFar)
}
