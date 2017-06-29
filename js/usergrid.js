//ADD LIMITS TO GRID !! //

var MyGrid = {

  spaceship : null,
  gridUnit : null,
  yLimitTop : 0,
  yLimitBottom : null,
  wViewport : null,
  hViewport : null,
  canvas: null,

  getViewportHeight : function(){

            if(window.innerWidth !== undefined && window.innerHeight !== undefined) {
                MyGrid.wViewport = window.innerWidth;
                MyGrid.hViewport = window.innerHeight;
            } else {
                MyGrid.wViewport = document.documentElement.clientWidth;
                MyGrid.hViewport = document.documentElement.clientHeight;
           }
           var txt = "Page size: width=" + MyGrid.wViewport + ", height=" + MyGrid.hViewport;
           console.log(txt);
           MyGrid.yLimitBottom = MyGrid.hViewport - 90;
           var h = MyGrid.hViewport;
           MyGrid.setSpaceShipPosition(h);
           MyGrid.createGrid(h);
},

  setSpaceShipPosition : function(h){
    var positionY = h/2 - 45;
    console.log(positionY);
    var positionYpx = positionY + "px";
    MyGrid.spaceship.style.position = "absolute";
    MyGrid.spaceship.style.top = positionYpx;
    Spaceship.positionY = positionY;

  },

  createGrid : function(h){

    MyGrid.gridUnit = h/30;
    console.log(MyGrid.gridUnit);
    MyGrid.canvas = document.getElementById("myBullets");
    console.log("MyGrid.wViewport", MyGrid.wViewport);
    MyGrid.canvas.width=MyGrid.wViewport;
    MyGrid.canvas.height=MyGrid.hViewport;
    
  }

}
