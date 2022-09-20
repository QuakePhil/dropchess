var just_the_kings = '4k3/8/8/8/8/8/8/4K3 w - - 0 1'
var game = new Chess()
game.clear()

// UI helpers
var drop_squares = []

// pulled from chess.js internals
function algebraic(i, j) {
    return ('abcdefgh'.substring(j, j + 1)) + ('87654321'.substring(i, i + 1))
}

function drop_square(i, j) {
    if (i >= 0 && j >= 0 && i < 8 && j < 8) {
        drop_squares.push(algebraic(i, j))
    }
}

function square_of_drop_squares(i, j) {
    drop_square(i-1, j-1)
    drop_square(i-1, j)
    drop_square(i-1, j+1)
    drop_square(i, j-1)
    drop_square(i, j+1)
    drop_square(i+1, j-1)
    drop_square(i+1, j)
    drop_square(i+1, j+1)
}

// TODO: also calculate remaining offboard pieces (if any)
function calculate_drop_squares() {
    drop_squares = []
    var turn = game.turn()
    var game_board = game.board()
    for (var i in game_board) {
        for (var j in game_board[i]) {
            if (game_board[i][j] !== null && game_board[i][j].color == turn) {
                square_of_drop_squares(parseInt(i), parseInt(j))
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
