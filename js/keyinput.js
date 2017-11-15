var KeyInput = {

  repeatID : 0,
  posStartBulletY: 0,

  /*moveMyVader: function(){
    
        var movingMyVader = function(){
            Enemies.darthVaderMove = requestAnimationFrame(movingMyVader)
              Match.darthVader.posX -= 5;
              //console.log("Match.darthVader.posX", Match.darthVader.posX);
              //Match.matchSpaceshipToVader();
              $('#darth-vader').css("left", Match.darthVader.posX);
              Match.matchSpaceshipToVader();
              //Match.darthVader.newEnemyIndex = darthVaderMove;
              if((Match.darthVader.posX) <= 0){
    
                  Enemies.darthVader.exists = false;
                  Match.darthVader = {};
                  $('#darth-vader').removeClass("vaderGroove");
                  $('#darth-vader').remove();
                  cancelAnimationFrame(Enemies.darthVaderMove);
              }
          }
          movingMyVader();
      },*/
 
 
  getKeyCodes : function( mykeyCode ){
    switch (mykeyCode){

      //KEY UP
      case 38:
        
        if(( Spaceship.positionY - MyGrid.gridUnit ) > ( MyGrid.yLimitTop )){
          
          KeyInput.moveUpSpaceship(); 
          
        }
        break;
     
      //KEY DOWN
      case 40:
        /*console.log("down");
        console.log("Spaceship.positionY before", Spaceship.positionY);*/
        if(( Spaceship.positionY + MyGrid.gridUnit ) < ( MyGrid.yLimitBottom )){
          KeyInput.moveDownSpaceship(); 
          
        }
        break;
       
      case 32:
        
        KeyInput.posStartBulletY = Spaceship.positionY + 45;
        KeyInput.posStartBulletX = 90;
        KeyInput.drawLoop();
        break;

      default: console.log("do nothing");
    }

  },
    drawLoop : function(){
      var x = 1;
      var counter = 0;
     
      var distx = 10;
      var posX1;
      var posX = KeyInput.posStartBulletX;
      var posY = KeyInput.posStartBulletY;
      var glossOver;
      Spaceship.bulletPosX = posX;
      Spaceship.bulletPosY = posY;

      var innerDrawLoop = function(){
        var ctx = MyGrid.canvas.getContext('2d');
        counter++;
       
          KeyInput.repeatID = requestAnimationFrame(innerDrawLoop);
          posX1=posX;
          posX = posX + distx;
          glossOver=posX-45;
          x = 0;
          /*console.log("posX1 ", posX1);
          console.log("posX ", posX);*/

          ctx.clearRect(posX1, posY, 50, 100);
          KeyInput.draw(posX, posY, posX1, glossOver);
          Match.matchBulletToEnemy(posX, posY, ctx, glossOver);
          Match.matchBulletToVader(posX, posY, ctx, glossOver);
          if((posX + distx) > (MyGrid.wViewport)){
            /*console.log("stop");*/
            cancelAnimationFrame(KeyInput.repeatID);

        }
      }

      innerDrawLoop();

  },

    draw: function(posX, posY, posX1, glossOver){
      var ctx = MyGrid.canvas.getContext('2d');
      //ctx.clearRect(0, 0, MyGrid.wViewport, MyGrid.hViewport);
      ctx.fillStyle = "#000000";
      ctx.fillRect(90, posY, glossOver, MyGrid.hViewport);
      //ctx.clearRect(90, posY, glossOver, MyGrid.hViewport);
      /*console.log("inside draw posX1", posX1);*/
      ctx.clearRect(posX1, posY, 50, MyGrid.hViewport);
      //DRAW NEW BULLET
      ctx.fillStyle = "#EA80B0";
      ctx.fillRect(posX, posY, 50, 1);
      /*console.log("inside draw before calling Match posX ", posX );
      console.log("inside draw before calling Match posY ", posY );*/
    },

    moveUpSpaceship: function(){
      
      KeyInput.moveUp = requestAnimationFrame( KeyInput.moveUpSpaceship )
      Spaceship.positionY -= MyGrid.gridUnit;
      MyGrid.spaceship.style.position="absolute";
      MyGrid.spaceship.style.top=Spaceship.positionY + "px";   
      cancelAnimationFrame(KeyInput.moveUp);   
    },

    moveDownSpaceship: function(){
      
      KeyInput.moveDown = requestAnimationFrame( KeyInput.moveDownSpaceship )
      Spaceship.positionY += MyGrid.gridUnit;
      //console.log("Spaceship.positionY", Spaceship.positionY);
      MyGrid.spaceship.style.position="absolute";
      MyGrid.spaceship.style.top=Spaceship.positionY + "px";
      cancelAnimationFrame(KeyInput.moveDown);   
    }
}
