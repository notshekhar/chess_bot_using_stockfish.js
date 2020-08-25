;(function () {
    let board = document.querySelector("#board")
    let right_click_down = false

    board.oncontextmenu = function (e) {
        e.preventDefault()
    }

    let [from, to] = [0, 0]

    board.onmousedown = (e) => {
        if (
            (e.which == 3) &
            e.srcElement?.classList?.contains("square-55d63")
        ) {
            from = e.srcElement
        }
    }
    board.onmouseup = (e) => {
        if (
            (e.which == 3) &
            e.srcElement?.classList?.contains("square-55d63")
        ) {
            to = e.srcElement
            console.log(e, from, to)
        }
    }
})()
