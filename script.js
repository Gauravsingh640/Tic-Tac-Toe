const boxes = document.querySelectorAll('.box');
const mesgcontainer = document.querySelector('.mesg-container');
const reset = document.querySelector('#reset');
const msg= document.querySelector("#message");

turno=true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const resetGame=()=>{
    turno=true;
    enableBoxes();
    mesgcontainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turno){
            box.innerText="O";
            turno=false;
        }
        else{
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;

        checkWin();
    });
});

const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (Winner) =>{
    msg.innerText=`Congratulation ${Winner} Wins!`;
    mesgcontainer.classList.remove("hide");
    disableBoxes();  ///// imp line
}

const checkWin = () => {
    let boardFull = true;
    
    for (let pattern of winningCombinations) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        // );

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return; // Exit early if a winner is found
            }
        }
    }

    // Check for tie
    for (let box of boxes) {
        if (box.innerText === "") {
            boardFull = false;
            break;
        }
    }

    if (boardFull) {
        msg.innerText = "It's a tie!";
        mesgcontainer.classList.remove("hide");
        disableBoxes(); // Disable boxes if it's a tie
    }
}

reset.addEventListener("click",resetGame);