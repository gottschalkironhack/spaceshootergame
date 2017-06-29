var Match = {
// access by newEnemyIndex.id
  currentEnemies: [ {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {}
                  ],
  darthVader: {},
  myDyingEnemy: "",
  heart: {},

  matchSpaceshipToVader: function(){

    //console.log("matchSpaceshipToVader");
    if(Match.darthVader.posX==="undefined"){console.log("no enemy here");}
      //posRightX 820  posX  780
      //Match.currentEnemies[i].posX 760
    else if(
      //pfeilspitze von arrow muss größer als kleiner x wert monster und kleiner als großer x wert monster
      ( Match.darthVader.posX <= Spaceship.positionX  ) && ( Match.darthVader.posX >= Spaceship.positionX - 90 ) /*&& ( Spaceship.positionX + 90 <= Match.currentEnemies[i].posX + 100) && ( Spaceship.positionY >= Match.currentEnemies[i].posY ) && ( Spaceship.positionY <= Match.currentEnemies[i].posY + 90 )*/
      ){
        var currentId = Match.darthVader.id;
        //console.log(" enemy hit my spaceship +darthvader" );

        $('#darth-vader').remove();
        Enemies.darthVader.exists=false;
        var liferate = 100;


        var spaceship=document.getElementById('spaceshippath');
        //$('#spaceship path').addClass("flashlight");
        spaceship.setAttribute("class", "flashlight");
        spaceship.addEventListener("animationend", function(event){
          spaceship.removeAttribute("class","flashlight");
      });
      if(Spaceship.life - liferate >= 0){
        Spaceship.life-=liferate;
        $('#heart').text(Spaceship.life);
      }
      else if(Spaceship.life - liferate <= 0){

        /*for(let i=0; i<Match.currentEnemies.length; i++){
          //var newEnemyIndex = Match.currentEnemies[i].newEnemyIndex;
          $('#' + Match.currentEnemies[i].id).remove();
        }*/
        Match.reset();
        /*$('#spaceship').remove();
        $('#darth-vader').remove();
        $('#heart').text("GameOver");
        $('#gameover-overlay').css({ "display": "block" });
        $('#replay').css({ "display": "block" });
        $('#scorevalue').text(Spaceship.score);

        $('#gameover-overlay').addClass("blink_me");
        cancelAnimationFrame(Enemies.darthVaderMove);
        clearInterval(interval_vader);*/

      }
    }
  },

  matchBulletToVader(posArrowX, posArrowY, ctx, glossOver){
      //console.log("inside matchBulletTovader");
      var posArrow_X = posArrowX + 50;
      var posXVaderOuter = Match.darthVader.posX + 80;
      var posYVaderOuter = Match.darthVader.posY + 80;
      //console.log("posArrowY", posArrowY);
      //console.log("Match.darthVader.posY",Match.darthVader.posY);
          if(Match.darthVader.posX==="undefined"){console.log("no enemy here");}

          else if
            (( posArrow_X >= Match.darthVader.posX)
            &&
            ( posArrow_X <= posXVaderOuter)
            &&
            ( posArrowY >= Match.darthVader.posY)
            &&
            ( posArrowY <= posYVaderOuter ))

          {
            cancelAnimationFrame(KeyInput.repeatID);
            var currentId = Match.darthVader.id;
            //console.log("newEnemyIndex", Match.darthVader.newEnemyIndex);
            //var newEnemyIndex = Match.darthVader.newEnemyIndex;
            //clearInterval(newEnemyIndex);
            cancelAnimationFrame(Enemies.darthVaderMove);
            ctx.fillStyle = "#000000";
            ctx.fillRect(posArrowX, posArrowY, 200, MyGrid.hViewport);
            ctx.fillRect(90, posArrowY, glossOver, MyGrid.hViewport);
            Match.myDyingEnemy = "darth-vader";
            explode("darth-vader");
          //  $("#" + currentId).fadeOut(3000);
            Enemies.darthVader.exists=false;
            Match.darthVader={};
            $('#darth-vader').remove();
            Spaceship.score += 150;
            $('#myscore').text(Spaceship.score);
          }
          else if
          ((Match.darthVader!="")
          &&
          (Match.darthVader.posX != posArrowX)
          &&
          (Match.darthVader.posY != posArrowY))
          {
            //console.log("kein treffer");
          }
  },

  matchBulletToEnemy: function(posArrowX, posArrowY, ctx, glossOver){
  //loop through currentEnemies and check matchBulletToEnemy
  //CHECK FOR UNDEFINED -> NOT ALL ARRAYS ARE FULL
    //var posArrow_Y = posArrowY + 40;
    var posArrow_X = posArrowX + 50;

    for(var i=0; i < Match.currentEnemies.length; i++){

      var posXMonsterOuter = Match.currentEnemies[i].posX + 80;
      var posYMonsterOuter = Match.currentEnemies[i].posY + 80;

          if(Match.currentEnemies[i].posX==="undefined"){console.log("no enemy here");}

          else if(

            ( posArrow_X >= Match.currentEnemies[i].posX + 100 ) && ( posArrow_X <= posXMonsterOuter + 100) && ( posArrowY >= Match.currentEnemies[i].posY ) && ( posArrowY <= posYMonsterOuter )
          ){

            cancelAnimationFrame(KeyInput.repeatID);
            var currentId = Match.currentEnemies[i].id;
            //console.log("newEnemyIndex", Match.currentEnemies[i].newEnemyIndex);
            var newEnemyIndex = Match.currentEnemies[i].newEnemyIndex;
            clearInterval(newEnemyIndex);
            ctx.fillStyle = "#000000";
            ctx.fillRect(posArrowX, posArrowY, 200, MyGrid.hViewport);
            ctx.fillRect(90, posArrowY, glossOver, MyGrid.hViewport);
            Match.myDyingEnemy = currentId;
            explode(currentId);
          //  $("#" + currentId).fadeOut(3000);
            Enemies.currentEnemies.splice( i ,1, "");
            Match.currentEnemies.splice  ( i ,1, {});
            $('#' + currentId).remove();
            Spaceship.score += 100;
            $('#myscore').text(Spaceship.score);
          }
          else if((Match.currentEnemies[i]!="")&&(Match.currentEnemies[i].posX != posArrowX)&&(Match.currentEnemies[i].posY != posArrowY)){

            //console.log("kein treffer");
          }
    }
  },

  matchSpaceshipToMonsters: function(){
    //console.log("inside spacehip");
      for(var i=0; i < Match.currentEnemies.length; i++){
        if(Match.currentEnemies[i].posX==="undefined"){console.log("no enemy here");}
          //posRightX 820  posX  780
          //Match.currentEnemies[i].posX 760
        else if(
          //pfeilspitze von arrow muss größer als kleiner x wert monster und kleiner als großer x wert monster
          ( Match.currentEnemies[i].posX <= Spaceship.positionX  ) && ( Match.currentEnemies[i].posX >= Spaceship.positionX - 90 ) /*&& ( Spaceship.positionX + 90 <= Match.currentEnemies[i].posX + 100) && ( Spaceship.positionY >= Match.currentEnemies[i].posY ) && ( Spaceship.positionY <= Match.currentEnemies[i].posY + 90 )*/
          ){
            var currentId = Match.currentEnemies[i].id;
            //console.log(" enemy hit my spaceship +i" , i);

            $('#' + currentId).remove();
            var liferate = 30;


            var spaceship=document.getElementById('spaceshippath');
            //$('#spaceship path').addClass("flashlight");
            spaceship.setAttribute("class", "flashlight");
            spaceship.addEventListener("animationend", function(event){
              spaceship.removeAttribute("class","flashlight");
          });
          if(Spaceship.life - liferate >= 0){
            Spaceship.life-=liferate;
            $('#heart').text(Spaceship.life);
          }
          else if(Spaceship.life - liferate <= 0){
            clearInterval(interval_enemies);

            Match.reset();

          }
        }
      }
    },

    matchSpaceshipToHeart: function(){
      if(Match.heart.posX==="undefined"){console.log("no enemy here");}

      else if(
        //pfeilspitze von arrow muss größer als kleiner x wert monster und kleiner als großer x wert monster
        ( Match.heart.posX <= Spaceship.positionX  ) && ( Match.heart.posX >= Spaceship.positionX - 90 ) /*&& ( Spaceship.positionX + 90 <= Match.currentEnemies[i].posX + 100) && ( Spaceship.positionY >= Match.currentEnemies[i].posY ) && ( Spaceship.positionY <= Match.currentEnemies[i].posY + 90 )*/
        ){
          var currentId = Match.heart.id;
          console.log(" heart hit my spaceship" );

          $('#flowingheart').remove();
          Match.heart.exists=false;
          var liferate = 100;


          var spaceship=document.getElementById('spaceship');
          //$('#spaceship path').addClass("hearteffect");
          spaceship.setAttribute("class", "hearteffect");
          spaceship.addEventListener("animationend", function(event){
            spaceship.removeAttribute("class","hearteffect");
        });
        if(Spaceship.life - liferate >= 0){
          Spaceship.life+=liferate;
          $('#heart').text(Spaceship.life);
        }
        else if(Spaceship.life - liferate <= 0){

        Match.reset();
        }
      }
   },

    reset: function(){
      for(let i=0; i<Match.currentEnemies.length; i++){
        var newEnemyIndex = Match.currentEnemies[i].newEnemyIndex;
        clearInterval(newEnemyIndex);
        var removeEnemy = Match.currentEnemies[i].id;
        $('#' + removeEnemy).remove();
        Match.currentEnemies.splice(i,1,{});

      }
      $('#darth-vader').remove();
      $('#flowingheart').remove();
      $('#spaceship').hide();
      $('#heart').text("GameOver");
      $('#gameover-overlay').css({ "display": "block" });
      $('#replay').css({ "display": "block" });
      $('#scorevalue').text(Spaceship.score);
      $('#gameover-overlay').addClass("blink_me");
      clearInterval(interval_enemies);
      clearInterval(interval_vader);
      clearInterval(interval_heart);
      cancelAnimationFrame(Enemies.darthVaderMove);
      cancelAnimationFrame(Goodies.myMovingHeart);
      Match.darthVader= {};
      Match.myDyingEnemy = "";
      Enemies.darthVader.exists = false;
      Enemies.currentEnemies = [ " ", " ", " ", " ", " ", " " ];
      Enemies.enemies = [ ];

    }

}
