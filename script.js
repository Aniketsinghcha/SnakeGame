

document.addEventListener('DOMContentLoaded',()=>{

    let gameArena=document.getElementById('game-arena');
   const arenaSize=600;
   const cellSize=20;
   let score=0;
   let gameStarted=false;
   let food={x:300,y:200}; //x-->15 y-->20;
   let snake=[{x:160,y:200},{x:140,y:200},{x:120,y:200}];
   let dx=cellSize;
   let dy=0;
   let time=200;
   let setId;
   function displayScore(score) {
    // Create the score container
    var scoreContainer = document.createElement('div');
    scoreContainer.id = 'score-container';
    
    // Create the score message
    var scoreMessage = document.createElement('div');
    scoreMessage.id = 'score-message';
    
    // Add title
    var title = document.createElement('h1');
    title.textContent = 'Game Over!';
    
    // Add score text
    var scoreText = document.createElement('p');
    scoreText.textContent = 'Your Score:';
    
    // Add score value
    var scoreValue = document.createElement('div');
    scoreValue.id = 'score-value';
    scoreValue.textContent = score;
    
    // Append elements
    scoreMessage.appendChild(title);
    scoreMessage.appendChild(scoreText);
    scoreMessage.appendChild(scoreValue);
    scoreContainer.appendChild(scoreMessage);
    
    // Append score container to the body
    document.body.appendChild(scoreContainer);
    
    // Show the score container
    scoreContainer.style.display = 'block';
}

   function isBodyColliding(){
    const currentHeadX=snake[0].x;
    const currentHeadY=snake[0].y;
    for(let i=1;i<snake.length;i++){
       const snakeBodyX=snake[i].x;
       const snakeBodyY=snake[i].y;
       if(snakeBodyX==currentHeadX && snakeBodyY==currentHeadY) return true;
    }
    console.log('body is not colliding');
    return false;
   }
   function isInsideGameArena(){
    const headX=snake[0].x;
    const headY=snake[0].y;
    const tailX=snake[snake.length-1].x;
    const tailY=snake[snake.length-1].y;
    console.log( 'locationOfSnake-->',headX,headY,tailX,tailY);
    return (headX<0 || headY<0 || headX>600 ||headY>600|| tailX<0 || tailX>600 || tailY>600 ||tailY<0)? false:true;
   }
   function gameOver(){
    return  isBodyColliding()|| !isInsideGameArena();
   }
   function gameLoop(){
    setId= setInterval(()=>{
        let isGameOver=gameOver();
        if(isGameOver)  {
            clearInterval(setId);
            displayScore(score);

            return;
        };

        updateSnake();
        drawFoodAndSnake();
         manageSpeed();
         
       
    },time)
   }
   function restartGameLoop(){
    clearInterval(setId);
    gameLoop();
   } 
   function manageSpeed(){
    if(score>=40 && score<=80) time=180;
    else if(score>80 &&score<=100) time=140;
    else if(score>120 && score<=140) time=100;
    else if(score>140 && score<=170) time=80;
    else if(score>170 && score<=200) time=60;
    else if(score>200) time=20;
    restartGameLoop();
   
   }
   function moveFood(){
const snakeCordinateX=[];
const snakeCordinateY=[];
snake.forEach((snkCell)=>{
    snakeCordinateX.push(snkCell.x/20);
    snakeCordinateY.push(snkCell.y/20);
})
let FoodCordinateX=Math.floor(Math.random()*27);
let FoodCordinateY=Math.floor(Math.random()*30);
while(snakeCordinateX.includes(FoodCordinateX)){
    FoodCordinateX=Math.floor(Math.random()*27);
}
while(snakeCordinateY.includes(FoodCordinateY)){
    FoodCordinateY=Math.floor(Math.random()*30);
}

 food.x=FoodCordinateX*cellSize;
 food.y=FoodCordinateY*cellSize;
 console.log(FoodCordinateX,',',FoodCordinateY);

   }
   function updateSnake(){
    const newHead={x:snake[0].x+dx,y:snake[0].y+dy};
    snake.unshift(newHead);
    if(newHead.x==food.x && newHead.y==food.y){
        score+=10;
        let scoreBoard=document.getElementById('score-board');
        scoreBoard.innerHTML=` Your Current Score is ${score}`;
        
        moveFood();
    } else {
        snake.pop();//remove tail
    }

   }
   function changeDirection(e) {
    //console.log(e.key);
    const isGoingDown = (dy===cellSize);
    const isGoingUp = (dy===-cellSize);
    const isGoingRight = (dx===cellSize);
    const isGoingLeft = (dx===-cellSize);
    if(e.key=='ArrowUp' && !isGoingDown){
        dx=0;
        dy=-cellSize;
      //  console.log(snake[0].x,snake[0].y,snake[snake.length-1].x,snake[snake.length-1].y);

    } else if(e.key=='ArrowDown' &&!isGoingUp ){
        dx=0;
        dy=cellSize;
      //  console.log(snake[0].x,snake[0].y,snake[snake.length-1].x,snake[snake.length-1].y);

    } else if(e.key=='ArrowLeft'&& !isGoingRight ){
        dx=-cellSize;
        dy=0;
       // console.log(snake[0].x,snake[0].y,snake[snake.length-1].x,snake[snake.length-1].y);

    } else if(e.key=='ArrowRight'&& !isGoingLeft){
        dx=cellSize;
        dy=0;
       // console.log(snake[0].x,snake[0].y,snake[snake.length-1].x,snake[snake.length-1].y);

    }

    
   }
   function drawDiv(x,y,className){
    const divElement=document.createElement('div');
    divElement.classList.add(className);
    divElement.style.top=`${y}px`;
    divElement.style.left=`${x}px`;
    return divElement;
    

   }
   function drawFoodAndSnake(){
            gameArena.innerHTML='';//clear the game
            //wipeOut everything and redrraw bro
            snake.forEach((snkCell)=>{
                const snkElement=drawDiv(snkCell.x,snkCell.y,'snake');
                gameArena.appendChild(snkElement);
            })
            const foodElement=drawDiv(food.x,food.y,'food');
            gameArena.appendChild(foodElement);

   }
   function runGame(){
     if(!gameStarted){
        gameStarted=true;
document.addEventListener('keydown',changeDirection);
     
        console.log(gameArena);
        gameLoop();
     }
   }
   function initiateGame(){
     
   // document.body.insertBefore(scoreBoard,gameArena);
    const startButton=document.createElement('button');
    startButton.textContent='Start Game';
    startButton.classList.add('start-button');
    startButton.addEventListener('click',()=>{
        startButton.style.display='none';
        runGame();
        let scoreBoard=document.createElement('div');
        scoreBoard.setAttribute('id','score-board');
        scoreBoard.innerHTML=` your current socre is ${score}`;
        document.body.appendChild(scoreBoard);
    })
    document.body.appendChild(startButton);
   }
   initiateGame();








});
