var canvs = document.getElementById("canvas");
var access = canvs.getContext("2d");

// load images

var thor = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

thor.src = "images/vegeta.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 85;
var constant;

var tX = 10;
var tY = 150;

var gravity = 1;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    tY -= 25;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : canvs.width,
    y : 0
};

// draw images

function draw(){
    
    access.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        access.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        access.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : canvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( tX + thor.width >= pipe[i].x && tX <= pipe[i].x + pipeNorth.width && (tY <= pipe[i].y + pipeNorth.height || tY+thor.height >= pipe[i].y+constant) || tY + thor.height >=  canvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    access.drawImage(fg,0,canvs.height - fg.height);
    
    access.drawImage(thor,tX,tY);
    
    tY += gravity;
    
    access.fillStyle = "#000";
    access.font = "20px Verdana";
    access.fillText("Score : "+score,10,canvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























