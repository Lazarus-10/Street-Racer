const Score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
const date=document.querySelector('.date');
let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let player = { speed : 8, score:0, start: false, x:0, y:0};
const keyDown = (e) => {
    e.preventDefault();
    key[e.key] = true;
}
const keyUp = (e) => {
    e.preventDefault();
    key[e.key] = false;
}

var z=document.getElementById("a");
function song(){
    z.play();
}
function endSong(){
    z.pause();
}

const curr_time= new Date().toLocaleTimeString();
const curr_date= new Date().toLocaleDateString();
date.innerHTML=`${curr_date} and ${curr_time}`


function start(){
    song();
    startScreen.classList.add('hide')
    player.start = true;
    player.score=0;
    gameArea.innerHTML= "";
    
    const game = document.createElement('div');
    game.setAttribute('class', 'car');
    
    gameArea.appendChild(game);
    player.x = game.offsetLeft;
    player.y = game.offsetTop;
     
    let road = gameArea.getBoundingClientRect();
    for(x=0;x<5;x++)
    {
        const roadline=document.createElement('div');
        roadline.setAttribute('class','line');
        roadline.y=(x*150)
        roadline.style.top= roadline.y + "px";
        gameArea.appendChild(roadline);
    }
    for(x=0;x<3;x++)
    {
        const enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y= x*350; // 0, 350, -300
        enemycar.style.top= enemycar.y + "px";
        enemycar.style.backgroundColor=randomcolor();
        // enemycar.style.left=Math.floor(Math.random()*350) + "px"; // can lead to crash at starting
        enemycar.style.left= 30*x + 50 + "px";
        gameArea.appendChild(enemycar);
    }
    window.requestAnimationFrame(gameplay);
}
function moveenemy(car){
    let enemies= document.querySelectorAll('.enemy')
    enemies.forEach((item)=>{
        if(iscollide(car,item)){
            endSong();
            const crash = new Audio("crash.mp3");
            crash.play();
            endgame();
        }
        if(item.y>=600){
            item.y = -300;
            item.style.left=Math.floor(Math.random()*340) + "px";
        }
        if(player.speed - 2 > 0){
            item.y += player.speed - 2;
        }else{
            item.y += player.speed;
        }
        item.style.top = item.y + "px"; 
    })
}
function movelines(){
    let lines= document.querySelectorAll('.line')
    lines.forEach((item)=>{
        if(item.y>=640){
            item.y -=730;
        }
        item.y +=player.speed;
        item.style.top = item.y + "px";
    })
}
function iscollide(a,b){
    aRect =a.getBoundingClientRect();
    bRect= b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top) || (aRect.top > bRect.bottom) || 
    (aRect.right <bRect.left) || (aRect.left > bRect.right))
}
function endgame(){
    endSong();
    player.start=false;
    startScreen.classList.remove('hide')
    startScreen.innerHTML= `Game over <br> Your final score is = ${player.score} <br>  press here to restart the Game .`;
    startScreen.style.backgroundColor="green";
}
 
function gameplay(){
    let car = document.querySelector('.car');
    movelines();
    moveenemy(car);
    if(player.start){
        if(key.ArrowUp && player.y>100){
            player.y -= player.speed;
        }
        if(key.ArrowDown && player.y<560){
            player.y += player.speed;
        }
        if(key.ArrowLeft && player.x>5){
            player.x -= player.speed;
        }
        if(key.ArrowRight && player.x<340){
            player.x += player.speed;
        }

        car.style.top= player.y +"px";
        car.style.left= player.x +"px";

        window.requestAnimationFrame(gameplay);
        player.score++;
        Score.innerText=` ${curr_date} and ${curr_time} 
                            SCORE : ${player.score} `;
    }
}
function randomcolor(){
    function c(){
        let hex =Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startScreen.addEventListener('click', start);