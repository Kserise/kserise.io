var animation;
const player = document.querySelector(".player");
const enemy = document.querySelector(".enemy");
const go = document.querySelector(".gameover");
const sco = document.querySelector(".score > span");
const map = document.querySelector("img");
var player_pos = 50;
var enemy_pos = 0;
var map_pos = 0;
var jump = false;
var score = 0;
var speed = 3;
var map_speed = 1;
function animate(){
    animation = requestAnimationFrame(animate);
    score++;
    map.style.left = map_pos+"px";
    sco.textContent=score*10;
    map_pos-=map_speed;
    if(score%600 == 0){
        map_speed++;
    }
    enemy_pos+=speed;
    if(score%350 == 0){
        speed++;
    }
    if(enemy_pos > 600){
        enemy_pos = 0;
    }
    if(jump === true){
        player_pos+=4;
        player.style.bottom = player_pos+"px";
        if(player_pos > 150){
            jump = false;
        }
        player.classList.remove("active");
    }
    if(jump === false){
        if(player_pos > 50){
            player_pos-=4;
            player.style.bottom = player_pos+"px";
        }
        if(score%10 == 0){
            player.classList.toggle("active");
        }
    }

    if(score > 2300){
        alert("clear!!");
        cancelAnimationFrame(animation);
        go.classList.toggle("active");   
    }
    console.log(score);

    enemy.style.right = enemy_pos+"px";
    player_left = player.offsetLeft;
    enemy_left = enemy.offsetLeft;
    player_top = player.offsetTop;
    enemy_top = enemy.offsetTop;
    gameover();
}
animate();

window.addEventListener("keydown", function(e){
    if(e.code === "Space"){
        if(player_pos == 50){
            jump = true;
        }
    }
});

function gameover(){
    if((enemy_left - (player_left + player.clientWidth) < 0 && enemy_left - (player_left + player.clientWidth) > -50)&& enemy_top - (player_top + player.clientHeight) < 0){
        cancelAnimationFrame(animation);
        go.classList.toggle("active");   
    }
}

function restart(){
    go.classList.toggle("active");
    player_pos = 50;
    enemy_pos = 0;
    map_pos = 0;
    map_speed = 1;
    score = 0;
    speed = 2;
    player.style.bottom = 50+"px";
    animate();
}