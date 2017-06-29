//ADD EVENTLISTENERS

document.addEventListener("DOMContentLoaded", function(event)
{

  $('#play').on("click", function(){
    $('#startgame-overlay').hide();
    MyGrid.spaceship = document.getElementById("spaceship");
    Spaceship.id = document.getElementById("spaceship");
    MyGrid.getViewportHeight();
    Enemies.generateEnemies();
    Enemies.generateDarthVader();
    Goodies.generateHeart();
  });
  $('#replay').on("click", function(){
    console.log("hide");
    $(this).hide();
    $('#gameover-overlay').hide();
    $('#gameover-overlay').removeClass("blink_me");
    $('#scorevalue').text("0");
    $('#heart').text("1000");
    Spaceship.life = 1000;
    Spaceship.score = 0;
    Spaceship.position = 0,
    Spaceship.positionX = 0,
    $('#spaceship').show();
    MyGrid.getViewportHeight();
    Enemies.generateEnemies();
    Enemies.generateDarthVader();
    Goodies.generateHeart();

  });
  window.addEventListener("keydown", function(event){

    var mykeyCode = event.keyCode;
    console.log( mykeyCode );
    KeyInput.getKeyCodes( mykeyCode );

  });

});
