var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

teclas = {};

var bola = {
    x: canvas.width/2,
    y: canvas.height/2,
    raio: 15,
    cor: "white",
    speed: 2,
    dirX: -1,
    dirY: 1,
    mod: 0
}

var esquerda = {
    x: 10,
    y: canvas.height/2 - 60,
    altura: 120,
    largura: 20,
    cor: 'green',
    speed: 4,
    score: 0
}

var direita = {
    x: canvas.width - 30,
    y: canvas.height/2 - 60,
    altura: 120,
    largura: 20,
    cor: 'red',
    speed: 4,
    score: 0
}

document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
    console.log(teclas);
});

document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
    console.log(teclas);
});

function newgame(winner) {
    if(winner == "player 1")
        ++esquerda.score;
    else
        ++direita.score;

    esquerda.y = canvas.height / 2 - esquerda.altura / 2;
    direita.y = esquerda.y;
    bola.y = canvas.height / 2 - bola.raio;
    bola.x = canvas.width / 2 - bola.raio;
    bola.mod = 0;
};

function movePlayers(){
    //w - 87
    if(87 in teclas && esquerda.y > 0)
        esquerda.y -= esquerda.speed;
    //s - 83
    if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
        esquerda.y += esquerda.speed;

    //sobe - 38
    if(38 in teclas && direita.y > 0)
        direita.y -= direita.speed;
    //40
    if(40 in teclas && direita.y + direita.altura < canvas.height)
        direita.y += direita.speed;
}

function moveBola(){

    //player esquerda
    if(bola.x - bola.raio <= esquerda.x + esquerda.largura && bola.y > esquerda.y && bola.y <= esquerda.y + esquerda.altura){
        bola.dirX = 1;
        bola.mod += 0.2;
    }


    if(bola.x + bola.raio >= direita.x && bola.y > direita.y && bola.y <= direita.y + direita.altura){
        bola.dirX = -1;
        bola.mod += 0.2;
    }


    if(bola.y - bola.raio <= 0)
        bola.dirY = 1;

    if(bola.y + bola.raio >= canvas.height)
        bola.dirY = -1;

    bola.x += (bola.speed + bola.mod) * bola.dirX;
    bola.y += (bola.speed + bola.mod) * bola.dirY;

    if(bola.x + bola.raio < esquerda.x + esquerda.largura - 15)
        newgame("player 2");

    else if(bola.x + bola.raio > direita.x + 15)
        newgame("player 1");
}

function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayers();
    moveBola();

    ctx.fillStyle = bola.cor;
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, 2*Math.PI);
    ctx.fill();

    ctx.fillStyle = esquerda.cor;
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
    ctx.fillStyle = direita.cor;
    ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jogador Verde " + esquerda.score, 20, 20);
    ctx.fillText("Jogador Vermelho " + direita.score, canvas.width - 220, 20);

    requestAnimationFrame(desenhar);
}

function main(){
    desenhar();
}
