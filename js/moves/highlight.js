function removeHighlights() {
    $('#board .square-55d63').css('background', '')
}

function highlight(square) {
    var square = $('#board .square-' + square)

    var background = lightHighlight
    if (square.hasClass('black-3c85d')) {
        background = darkHighlight
    }

    square.css('background', background)
}
