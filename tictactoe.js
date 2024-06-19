var turn=3;
var count = 0;
var gameState= 'inital';
var hover= true;
const clicked=[false, false, false, false, false, false, false, false, false];
function handleClick(event, button_text){
    if(turn == 3){
        alert("You must click on start game or restart game first")
    }else if (button_text != '' && hover == false){
        alert("can only play on an empty box")
    }else{
        const button = document.getElementById(event.target.id);
        const player = document.getElementById('turn');
        var tmp = parseInt(event.target.id)
        if (turn == 0 && clicked[tmp-1] == false ){
            button.style.color= 'red';
            button.textContent = 'X';
            turn ++;
            count++;
            var tmp = parseInt(event.target.id)
            clicked[tmp-1]=true;
            if (count > 4){
                scanGame('X');
            }
            if (gameState == 'done'){
                player.textContent="Game is done";
            }else{
                player.textContent="O turn";
                computerPlay();
            }
                 
        }
    }
}
function computerPlay(){
    var empptySquares= [];
    const player = document.getElementById('turn');
    for (let i=0; i < 9; i++){
        if(clicked[i]==false){
            empptySquares.push(i+1);
        }
    }
    const randomIndex = Math.floor(Math.random() * empptySquares.length);
    id = empptySquares[randomIndex];
    clicked[id-1]=true;
    const square = document.getElementById(id);
    square.textContent= "O";
    turn --;
    count++;
    if (count > 4){
        scanGame('O');
    }
    if (gameState == 'done'){
        player.textContent="Game is done";
    }else{
        player.textContent="X turn";
    }
}
function scanGame(player){
    const square1 = document.getElementById('1');
    const square2 = document.getElementById('2');
    const square3 = document.getElementById('3');
    const square4 = document.getElementById('4');
    const square5 = document.getElementById('5');
    const square6 = document.getElementById('6');
    const square7 = document.getElementById('7');
    const square8 = document.getElementById('8');
    const square9 = document.getElementById('9');
    const winner = document.getElementById('winner');
    if (square1.textContent == player && square2.textContent == player && square3.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('1','2','3', player);
    } else if (square4.textContent == player && square5.textContent == player && square6.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('4','5','6');
    } else if (square7.textContent == player && square8.textContent == player && square9.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('7','8','9');
    } else if (square1.textContent == player && square4.textContent == player && square7.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('1','4','7');
    } else if (square2.textContent == player && square5.textContent == player && square8.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('2','5','8');
    }else if (square3.textContent == player && square6.textContent == player && square9.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('3','6','9');
    }else if (square1.textContent == player && square5.textContent == player && square9.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('1','5','9');
    }else if (square3.textContent == player && square5.textContent == player && square7.textContent == player ){
        winner.textContent=player + ' WON, Please restart game to continue';
        turn =3;
        gameState='done';
        setWinnerColors('3','5','7');
    }else if(count == 9){
        winner.textContent=' No winner, please restart';
        turn =3;
        gameState='done';
        setWinnerColors('0','0','0');
    }
}
function setWinnerColors(id1, id2, id3){
    if (id1 != "0"){
        const square1 = document.getElementById(id1);
        const square2 = document.getElementById(id2);
        const square3 = document.getElementById(id3);
        square1.style.backgroundColor = 'green';
        square2.style.backgroundColor = 'green';
        square3.style.backgroundColor = 'green';
    }
    const buttons = document.querySelectorAll('.game-square');
    buttons.forEach(button => {
        if(button.id != id1 && button.id != id2 && button.id != id3 ){
            button.style.backgroundColor = 'grey';
        }
    });

}
function resetBoard() {
    const buttons = document.querySelectorAll('.game-square');
    buttons.forEach(button => {
        button.textContent = '';
        button.style.backgroundColor = '';
        button.style.color= '';
    });
}

function handleStart(event){
    turn = Math.floor(Math.random() * 2);
    count = 0;
    resetBoard();
    for (let i = 0; i < clicked.length; i++) {
        clicked[i]=false;
      }
    gameState='startGame';
    const button = document.getElementById('turn');
    const winner = document.getElementById('winner');
    winner.textContent='Game in process';
    if (turn == 0){
        button.textContent="X TURN";
    }else if (turn ==1){
        button.textContent="O TURN";
        computerPlay();
    }
}
document.addEventListener( 'DOMContentLoaded', (event) => {

    const buttons= document.querySelectorAll('.game-square');
    const start_btn=document.querySelector('.start-game');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = button.textContent;
            handleClick(event, buttonText);
        });
    });

    if (gameState != 'initial'){
        buttons.forEach(button => {
            
            if (button.textContent == ''){
                button.addEventListener('mouseover', (event) => {
                    // Change the button's background color
                    var tmp = parseInt(event.target.id)
                    if(clicked[tmp-1] == false && gameState == 'startGame'){
                        hover=true;
                        button.style.color='red'
                        button.textContent='X';
                    }

                  });
                   
                button.addEventListener('mouseout', (event) => {
                    hover = false;
                    var tmp = parseInt(event.target.id)
                    if (clicked[tmp-1] == false){
                        button.textContent='';
                        button.style.color = '';
                    }
                  });
                
            }
        });
    }

    
    start_btn.addEventListener('click', (event) => {
        handleStart(event)
    })
});