var Goodies = {
  heart: {
          exists : false
         },

  generateHeart: function(){
    var counter = 0
    if(!Goodies.heart.exists){
        interval_heart = setInterval(function(){
          Goodies.heart.exists = true;
          counter++;
          console.log("generate heart ", counter);
          Goodies.setHeart();
      }, 8000 );
    }
  },
  setHeart: function(){
    var newHeartObject = { "posX" : 0, "posY" : 0, "newEnemyIndex" : "" };
    Match.heart = newHeartObject;
    var heartClone = $('#proto-heart').clone().attr('id', "flowingheart");
    heartClone.appendTo( $( "#mySvgContainer" ) );
    $("#mySvgContainer" ).css("display", "block");
    $('#flowingheart').css("position", "absolute");
    $('#flowingheart').css("left", MyGrid.wViewport - 80);
    var posY = Math.floor(Math.random() * (MyGrid.hViewport - 80));
    $('#flowingheart').css("top", posY);
    $('#flowingheart').css("display", "block");
    Match.heart.posX = MyGrid.wViewport - 80;
    Match.heart.posY = posY;
    //$('#flowingheart').addClass("heartGroove");
    Goodies.moveHeart();
  },


  moveHeart: function(){

    var moveMyHeart = function(){

      Goodies.myMovingHeart = requestAnimationFrame(moveMyHeart);
      Match.heart.posX -= 5;
      Match.matchSpaceshipToHeart();
      //console.log("Match.heart.posX",Match.heart.posX);
      $('#flowingheart').css("left", Match.heart.posX);
      //console.log("Match.heart.posX after",Match.heart.posX);
      if(Match.heart.posX <= 0){
        Goodies.heart.exists = false;
        Goodies.heart = {};
        cancelAnimationFrame(Goodies.myMovingHeart);
        //console.log($('#flowingheart'), "flowing heart");
        $('#flowingheart').remove();

      }
    }
    moveMyHeart();
  }


}
