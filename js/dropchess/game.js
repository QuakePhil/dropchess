var just_the_kings = '4k3/8/8/8/8/8/8/4K3 w - - 0 1'
var game = new Chess()
game.clear() // TODO: rename to chessGame, and newGame to game

// UI helpers
var drop_squares = []

// pulled from chess.js internals
function algebraic(i, j) {
    return ('abcdefgh'.substring(j, j + 1)) + ('87654321'.substring(i, i + 1))
}

function drop_square(game_board, i, j) {
    if (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (game_board[i][j] == null) {
        // TODO: make sure not in check
        // or.. make a rule that capture of king is possible
        // and ends the game
        drop_squares.push(algebraic(i, j))
      }
    }
}

function square_of_drop_squares(game_board, i, j) {
    drop_square(game_board, i-1, j-1)
    drop_square(game_board, i-1, j)
    drop_square(game_board, i-1, j+1)
    drop_square(game_board, i, j-1)
    drop_square(game_board, i, j+1)
    drop_square(game_board, i+1, j-1)
    drop_square(game_board, i+1, j)
    drop_square(game_board, i+1, j+1)
}

// TODO: also calculate remaining offboard pieces (if any)
function calculate_drop_squares() {
    drop_squares = []
    var turn = game.turn()
    var game_board = game.board()
    for (var i in game_board) {
        for (var j in game_board[i]) {
            if (game_board[i][j] !== null && game_board[i][j].color == turn) {
                square_of_drop_squares(game_board, parseInt(i), parseInt(j))
            }
        }
    }
    // TODO: for each move,
    // pre-calculate valid drop squares for current side to move, e.g.
    // drop_squares = {
    //   'drop': ['d2', 'e2', f2', 'd1', 'f1'],
    //   'e1': [moves for king...]
    //   ...
    // }
}

function new_game() {
    game.load(just_the_kings)
    calculate_drop_squares()
}
