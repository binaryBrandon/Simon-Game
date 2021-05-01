var buttonColors = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  randomChosenColor,
  blueSound = new Audio("sounds/blue.mp3"),
  greenSound = new Audio("sounds/green.mp3"),
  redSound = new Audio("sounds/red.mp3"),
  yellowSound = new Audio("sounds/yellow.mp3"),
  wrongSound = new Audio("sounds/wrong.mp3"),
  hasStarted = false,
  level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);
  $("#" + gamePattern[level]).fadeOut(100).fadeIn(100);
  playSound(gamePattern[level]);
  //console.log(i + 'last');
  level += 1;
  $("#level-title").text("Level " + level);
}

$("div .btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  animatePress(userChosenColor);
  //if (userClickedPattern.length === level) {
  checkPattern();
  //}
});

function playSound(name) {
  switch (name) {
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "red":
      redSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrongSound.play();
      break;
    default:
      console.log("uh oh");
      //console.log($(this));
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  // console.log($("#" + currentColor));
}

$(document).keydown(function() {
  if (!hasStarted) {
    hasStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
  /*else {
     console.log("yah");
   }*/
});

function checkPattern() {
  for (i = 0; i < level; i++) {
    //console.log(userClickedPattern);
    if (userClickedPattern[i] !== gamePattern[i] && userClickedPattern[i] !== undefined) {
      //do some code to end the game
      //console.log(userClickedPattern[i]);
      startOver();
    }
  }
  if (userClickedPattern.length === gamePattern.length && level > 0) {
    //console.log("exiting");
    userClickedPattern = [];
    setTimeout(nextSequence, 750);
  }
}

startOver(){
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  hasStarted = false;
  $("h1#level-title").text("Game Over, Press Any Key to Restart");
}
