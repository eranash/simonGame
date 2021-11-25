let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameIsOn = false;
let level = 0;

$(document).keypress(function () {
  if (!gameIsOn) {
    $("h1").text(`level ${level}`);
    gameIsOn = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over!!! Press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
   
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text(`level ${level}`);
  let randNum = Math.floor(Math.random() * 4);
  let randChosenColor = buttonColors[randNum];
  gamePattern.push(randChosenColor);
  $(`#${randChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randChosenColor);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameIsOn = false;
}
