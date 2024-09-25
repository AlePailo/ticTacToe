const cells = document.getElementsByClassName(".cell")
const unchecked = document.querySelector(".unchecked")

let turn = "O"
let xPoints = 0
let oPoints = 0

const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

//arrays to track marked cells for each player
let xCells = []
let oCells = []

$(document).ready(() => {
    // Cover match result popup
    $("#endGame").hide()

    // Display whose turn it is
    $("#turn").html(`<i class="fa-regular fa-circle"> 'S TURN`)
    
    $(".cell").click(function() {
        turnActions($(this))
        checkWin()
        checkDraw()
    })

    // Board reset to play again
    $("#endGame button").click(() => {
        $("#endGame").hide()
        $(".cell").empty()
        $(".cell").addClass("unchecked")
        $(".cell").css("pointer-events", "auto")
        $(".cell").removeClass("greenBg")


        //fix wrong color on match restart (if clicking "play again", not by updating the page) -> Comment the code below to see the issue
        if(turn == "X") {
            $(".unchecked").css("--hover-color", "#000F89")
        } else {
            
            $(".unchecked").css("--hover-color", "maroon")
        }
    })
})

function turnActions($this) {
    // Disable interactions and remove unchecked class to remove hover effects 
    $this.removeClass("unchecked")
    $this.css("pointer-events", "none")

    if(turn == "O") {
        //Put player mark on cell and push cell number on player 
        $this.html(`<i class="fa-regular fa-circle">`)
        oCells.push(Number($this.attr("data-num")))

        // Change h1 text/color and cells hover color to match player's one
        $("#turn").html(`<i class="fa-regular fa-x"> 'S TURN`)
        $(".unchecked").css("--hover-color", "#000F89")

        // Change players turn
        turn = "X"
    } else {
        $this.html(`<i class="fa-regular fa-x">`)
        xCells.push(Number($this.attr("data-num")))
        $("#turn").html(`<i class="fa-regular fa-circle"> 'S TURN`)
        $(".unchecked").css("--hover-color", "maroon")
        turn = "O"
    }
}



function checkWin() {
    /*Array.from($(".cell")).forEach((cell, i) => {
        if(cell.hasChildNodes()) {
            if(cell.children[0].classList.contains("fa-x")) {
                xCells.push(i)
            } else if(cell.children[0].classList.contains("fa-circle")) {
                oCells.push(i)
            }
        }
    })*/
    console.log(oCells, xCells)
    checkCombinations(xCells, "X")
    checkCombinations(oCells, "O")
    //console.log(`X CELLS : ${xCells}`)
    //console.log(`O CELLS : ${oCells}`)
    /*let arrX = el => el.every(num => xCells.includes(num))
    let arrO = el => el.every(num => oCells.includes(num))
    if(winningCombinations.some(arrX) == true) {
        alert("X WINS !")
    } else if(winningCombinations.some(arrO)) {
        alert("O WINS !")
    }*/

    function checkCombinations(cells, player) {
        let arrtoHighlight = []
        let arr = el => {
            if(el.every(num => cells.includes(num))) {
                arrtoHighlight = [...el]
            }
            return el.every(num => cells.includes(num))
        }
        if(winningCombinations.some(arr)) {
            //alert(`${player} WINS !`)
            arrtoHighlight.forEach(num => {
                $(`.cell:eq(${num})`).addClass("greenBg")
            })

            $("#endGame").fadeIn("slow")
            $("#endGame-div h1").text(`${player} WINS !`)
            
            clearCellsArrays()
            if(player == "X") {
                $("#X-points").text(++xPoints)
            } else {
                $("#O-points").text(++oPoints)
            }
        }
    }
}

function checkDraw() {
    //Prevent from showing "DRAW !" if a player wins with the last unchecked cell
    if($("#endGame-div h1").text() == `X WINS !` || `Y WINS`) {
        return
    }


    if(Array.from($(".cell")).every(cell => cell.hasChildNodes())) {
        $("#endGame").fadeIn("slow")
        $("#endGame-div h1").text(`DRAW!`)
        clearCellsArrays()
    }
}

function clearCellsArrays() {
    xCells = []
    oCells = []
}


