var KeyInput = {

  repeatID : 0,
  posStartBulletY: 0,

  getKeyCodes : function( mykeyCode ){
    switch (mykeyCode){

      //UP
      case 38:
        //console.log("up");
      /*  console.log("Spaceship.positionY before", Spaceship.positionY);*/
        if(( Spaceship.positionY - MyGrid.gridUnit ) > ( MyGrid.yLimitTop )){
          Spaceship.positionY -= MyGrid.gridUnit;
          //console.log("Spaceship.positionY", Spaceship.positionY);
          MyGrid.spaceship.style.position="absolute";
          MyGrid.spaceship.style.top=Spaceship.positionY + "px";

        }
        break;

      //DOWN
      case 40:
        /*console.log("down");
        console.log("Spaceship.positionY before", Spaceship.positionY);*/
        if(( Spaceship.positionY + MyGrid.gridUnit ) < ( MyGrid.yLimitBottom )){
          Spaceship.positionY += MyGrid.gridUnit;
          //console.log("Spaceship.positionY", Spaceship.positionY);
          MyGrid.spaceship.style.position="absolute";
          MyGrid.spaceship.style.top=Spaceship.positionY + "px";
        }


        break;
        //console.log("down");
      // SPACE
      case 32:
        //console.log("space");
        KeyInput.posStartBulletY = Spaceship.positionY + 45;
        KeyInput.posStartBulletX = 90;

        //console.log(ctx);

        KeyInput.drawLoop();

        //MyGrid.hViewport
        break;

      default: console.log("do nothing");
    }

  },
    drawLoop : function(){
      var x = 1;
      var counter = 0;
      //console.log(x);
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
        /*console.log("go innerDrawLoop + counter ", counter);
        console.log("posX before adding distx", posX);*/
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
    }
}
