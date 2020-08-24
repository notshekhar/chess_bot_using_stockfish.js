const remove_highlights = function () {
    document.querySelectorAll("#board .square-55d63").forEach((square) => {
        square.classList.remove("highlightW")
        square.classList.remove("highlightB")
    })
}

const highlight_move = function (from, to) {
    let fromSquare = document.querySelector(".square-" + from)
    let toSqure = document.querySelector(".square-" + to)

    if (fromSquare.classList.contains("white-1e1d7"))
        fromSquare.classList.add("highlightW")
    else fromSquare.classList.add("highlightB")

    if (toSqure.classList.contains("white-1e1d7"))
        toSqure.classList.add("highlightW")
    else toSqure.classList.add("highlightB")
}
