let colors =['yellow','green','blue', 'violet','red']
let window_width = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let score =document.querySelectorAll('.score');
let total =100;
let num = 0; 
let currentBalloons = 0;
let gameOver = false;
let total_shadow = document.querySelector('.total-shadow');
let startButton = document.querySelector('.start-game-button');


function createBalloons(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = ('balloon balloon-' + colors[rand]);


    rand = Math.floor(Math.random() * (window_width - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloons;
    currentBalloons++;
    body.appendChild(div);
    
    animateBalloons(div);
}




function animateBalloons(ele){
    let random = Math.floor(Math.random() * 6 -3);
   let pos = 0;
    let interval =  setInterval(frame, 10  - Math.floor(num/10) + random);

    function frame(){
        if((pos >= (windowHeight + 200)) && (document.querySelector('[data-number="'+ele.dataset.number+'"]') !== null)) {
            clearInterval(interval);
            gameOver = true;
        }else{
            pos ++;
            ele.style.top = windowHeight - pos + 'px';

        }

    }
}
function startgame(){
    restartGame();
    let timeout =0;
   let loop = setInterval(function (){
       timeout= Math.floor(Math.random() * 600 -100)
        if (!gameOver && num !== total){
            createBalloons();

        }
        else if(num !== total){
            clearInterval(loop);
            total_shadow.style.display ='flex';
            total_shadow.querySelector('.lose').style.display="block"

        }else {
            clearInterval(loop )
            total_shadow.style.display ='flex';
            total_shadow.querySelector('.win').style.display="block"
        }
        
    } , 800  + timeout)
}

function deleteballoons(element){

    element.remove();
    num++;
    updateScore()
    playballsound();

    
}
function playballsound(){
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}
function updateScore(){
    for (let i =0; i< score.length;i++){
        score[i].textContent = num;
    }
}

document.addEventListener('click', function(event){
    
    if (event.target.classList.contains('balloon')){
        deleteballoons(event.target)
    }
});
function restartGame(){
    let forRemoving =document.querySelectorAll('.balloon');
    for (let i=0 ; i< forRemoving.length;i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

document.querySelector('.restart').addEventListener('click',function(){
    total_shadow.style.display ='none';
    total_shadow.querySelector('.win').style.display='none';
    total_shadow.querySelector('.lose').style.display='none';
    startgame();

})

document.querySelector('.cancel').addEventListener('click',function(){
    total_shadow.style.display ='none';
});
startButton.addEventListener('click', function (){
    startgame();
    document.querySelector('.bg-music').play();
    document.querySelector('.start-game-windows').style.display = 'none'
})
