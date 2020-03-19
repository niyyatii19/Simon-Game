
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function (){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
   level++;
   $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length == gamePattern.length  ){
      setTimeout(function (){
        nextSequence();
      },500);
    }
  }
    else {
    console.log("Fail");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
    },200);
   startOver();
}
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  var activeColor=$("."+currentColor);
activeColor.addClass("pressed");
  setTimeout(function (){
    activeColor.removeClass("pressed");} ,100);

}



function startOver(){
  level = 0;
  gamePattern= [];
  userClickedPattern= [];
  started = false;
}
