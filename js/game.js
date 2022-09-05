var just_the_kings = '4k3/8/8/8/8/8/8/4K3 w - - 0 1'
var game = new Chess()
game.clear()

// UI helpers
var valid_squares = {}

function calculate_valid_squares() {
    valid_squares = {}
    // TODO: for each move,
    // pre-calculate valid squares for current side to move, e.g.
    // valid_squares = {
    //   'drop': ['d2', 'e2', f2', 'd1', 'f1'],
    //   'e1': [moves for king...]
    //   ...
    // }
}

function new_game() {
    game.load(just_the_kings)
    calculate_valid_squares()
}
