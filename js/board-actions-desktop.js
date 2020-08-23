// init board desktop

function setDesktopBoard(position = false, sparePieces = false) {
    gameEnd = false

    // mode to set chess figures in custom position
    if (sparePieces) {
        board = ChessBoard("board", {
            draggable: true,
            dropOffBoard: "trash",
            sparePieces: true,
            pieceTheme: "img/pieces/{piece}.svg",
        })
        return
    }

    // init board with preloaded position (fen)
    if (position == false) {
        position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    } else {
        console.log("Custom: " + position)
    }

    // game rules control object
    game = new Chess(position)

    let onDragStart = function (source, piece) {
        // do not pick up pieces if the game is over or if it's not that side's turn
        if (
            game.game_over() === true ||
            (game.turn() === "w" && piece.search(/^b/) !== -1) ||
            (game.turn() === "b" && piece.search(/^w/) !== -1)
        ) {
            return false
        }
    }

    let onDrop = function (source, target, piece, newPos, oldPos, orientation) {
        removeGreySquares()

        if (!gameStarted) {
            gameStarted = true
            $("#btn-choose-white-side, #btn-choose-black-side").addClass(
                "locked"
            )
        }

        // see if the move is legal
        let move = game.move({
            from: source,
            to: target,
            promotion: "q",
        })

        remove_highlights()
        highlight_move(source, target)
        // illegal move
        if (move === null) {
            console.log("Player illegal move.")
            sound["illegal"].play()
            return "snapback"
        }
        promotionPos = newPos
        moveSource = source
        moveTarget = target

        // promotion move
        if (move.promotion != undefined) {
            $("#game-promotion").removeClass("hidden")
            $("#board").addClass("locked")
            console.log("Paused for promotion.")
            return
        }

        dumpLog(false)

        listMoves()
        opponentTurn()
    }

    let onMouseoverSquare = function (square, piece) {
        // get list of possible moves for this square
        let moves = game.moves({
            square: square,
            verbose: true,
        })

        // skip if there are no moves available for this square
        if (moves.length === 0) return

        // highlight the square they moused over
        greySquare(square)

        // highlight the possible squares for this piece
        for (let i = 0; i < moves.length; i++) {
            greySquare(moves[i].to, true)
        }
    }

    let onMouseoutSquare = function (square, piece) {
        removeGreySquares()
    }

    let onSnapEnd = function () {
        board.position(game.fen())
        gameHistoryAddMove(game.fen())
        if (game.history().length > 0) $("#btn-take-back").removeClass("hidden")
    }

    board = ChessBoard("board", {
        position: position,
        draggable: true,
        showNotation: true,

        onDragStart: onDragStart,
        dropOffBoard: "snapback",
        onDrop: onDrop,

        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,

        onSnapEnd: onSnapEnd,
        pieceTheme: "img/pieces/{piece}.webp",
    })

    gameHistoryClear()

    // field highlight functions
    let removeGreySquares = function () {
        $("#board .square-55d63").css("background", "")
        $("#board .square-55d63").css("background-image", "")
    }

    let greySquare = function (square, b) {
        let squareEl = $("#board .square-" + square),
            background = "#f6f669"
        if (b) {
            squareEl.css("background-image", "url(../img/icons/moves.png)")
        } else {
            if (squareEl.hasClass("black-3c85d") === true)
                background = "#baca2b"
            squareEl.css("background", background)
        }
    }
}
