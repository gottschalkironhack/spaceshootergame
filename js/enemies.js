var Enemies = {
//  choose one random svg, generate random position, add random number to enemy
//assign different interval id for each loop
//assign grid to each new enemy


//-> for each loop in keyinput match grid position of all currentEnemies to position of bullet and get respective ID of SVG


  enemiesimg: [
    {
      id: "proto0",
      posGrid: [ 0 , 0 ]
    },
    {
      id: "proto1",
      posGrid: [ 0 , 0 ]
    },
    {
      id: "proto2",
      posGrid: [ 0, 0 ]
    },
    {
      id: "proto3",
      posGrid: [ 0, 0 ]
    },
    {
      id: "proto4",
      posGrid: [ 0, 0 ]
    },
    {
      id: "proto5",
      posGrid: [ 0, 0 ]
    },
    {
      id: "proto6",
      posGrid: [ 0, 0 ]
    }

  ],
  darthVader : { exists: false,
                 imgPath: "img/darth-vader.png"
               },
  currentEnemies: [ " ", " ", " ", " ", " ", " " ],
  enemies: [ ],

  startTimer: function(){
    var timeInMs = Date.now();

  },
  randomIndex: function(){
    var newEnemyIndex = Math.floor(Math.random() * Enemies.enemiesimg.length);
    return newEnemyIndex;
  },

  generateDarthVader: function(){
      var CountDown = 0;
      var timeIntervalVader= 8000;
      console.log("darth vader", Enemies.darthVader.exists);
      if(!Enemies.darthVader.exists){
        console.log("condition met");
      interval_vader = setInterval(function(){
        Enemies.darthVader.exists = true;
        if (CountDown === 20){
          timeIntervalEnemies = 5000;
          console.log("stop generating enemies");
          clearInterval(interval_enemies); // Stopping the counter when reaching 0.
        }
        Enemies.setDarthVader(interval_vader);
      },timeIntervalVader);
    }
  },

  generateEnemies: function(){
    var CountDown = 0;
    var timeIntervalEnemies = 2000;
    interval_enemies = setInterval(function(){
      var newEnemyIndex;
      newEnemyIndex = Enemies.randomIndex();
      if(Enemies.currentEnemies.indexOf("enemy" + newEnemyIndex) === 1){

        newEnemyIndex = Enemies.randomIndex();

      }
      else if(Enemies.currentEnemies.indexOf("enemy" + newEnemyIndex) === -1){

        var newId = "enemy" + newEnemyIndex;
        Enemies.currentEnemies.splice(newEnemyIndex, 1, newId );
        Enemies.setEnemies(newEnemyIndex, newId);
      }

      CountDown++;
      if (CountDown === 20){
        $('#level2').fadeIn(1000);
        $('#level2').fadeOut(1000);
        var newLevelCounter = 0;
        newLevel = setTimeout(function(){
          if(newLevelCounter === 1){
            clearInterval(newlevel);
          }
          newLevelCounter++;
        }, 500 );
        timeIntervalEnemies = 500;
        console.log("stop generating enemies");
        clearInterval(interval_enemies);
        Enemies.generateEnemiesLevel2(timeIntervalEnemies);
         // Stopping the counter when reaching 0.
      }
    }, timeIntervalEnemies);
  },
  generateEnemiesLevel2: function(timeIntervalEnemies){
    var CountDown = 0;
    interval_enemies=setInterval(function(){
      var newEnemyIndex;
      newEnemyIndex = Enemies.randomIndex();
      if(Enemies.currentEnemies.indexOf("enemy" + newEnemyIndex) === 1){

        newEnemyIndex = Enemies.randomIndex();

      }
      else if(Enemies.currentEnemies.indexOf("enemy" + newEnemyIndex) === -1){

        var newId = "enemy" + newEnemyIndex;
        Enemies.currentEnemies.splice(newEnemyIndex, 1, newId );
        Enemies.setEnemies(newEnemyIndex, newId);
      }

      CountDown++;
    }, timeIntervalEnemies);

  },
 //VADER
  setDarthVader: function(interval_vader){
    var newDarthVaderObject = { "posX" : 0, "posY" : 0, "newEnemyIndex" : "", "currentEnemyIndex" : " " };
    Match.darthVader = newDarthVaderObject;
    var vaderClone = $('#proto-vader').clone().attr('id', "darth-vader");
    vaderClone.appendTo( $( "#mySvgContainer" ) );
    $( "#mySvgContainer" ).css("display", "block");
    $('#darth-vader').css("position", "absolute");
    $('#darth-vader').css("left", MyGrid.wViewport - 80);
    var posY = Math.floor(Math.random() * (MyGrid.hViewport - 80));
    $('#darth-vader').css("top", posY);
    $('#darth-vader').css("display", "block");
    Match.darthVader.posX = MyGrid.wViewport - 80;
    Match.darthVader.posY = posY;
    $('#darth-vader').addClass("vaderGroove");
    Enemies.moveMyVader();


  },
  moveMyVader: function(){

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
  },
  setEnemies: function(newEnemyIndex, newId){

    var newEnemyObject = { "id": newId, "posX" : 0, "posY" : 0, "newEnemyIndex" : newEnemyIndex, "currentEnemyIndex" : " " };
    var currentEnemyIndex=newEnemyIndex;
    Match.currentEnemies.splice(currentEnemyIndex, 1, newEnemyObject);
    Match.currentEnemies[currentEnemyIndex].currentEnemyIndex = currentEnemyIndex;
    var svgEnemyProto = Enemies.enemiesimg[currentEnemyIndex].id;
    var svgEnemyClone = $('#' + svgEnemyProto).clone().attr('id', newId);
    svgEnemyClone.appendTo( $( "#mySvgContainer" ) );
    $( "#mySvgContainer" ).css("display", "block");
    $('#' + newId).css("position", "absolute");
    $('#' + newId).css("left", MyGrid.wViewport - 80);
    var posY = Math.floor(Math.random() * (MyGrid.hViewport - 80));
    $('#' + newId).css("top", posY);
    $('#' + newId).css("display", "block");

    Enemies.enemiesimg[currentEnemyIndex].posGrid[0] = MyGrid.wViewport - 80;
    Match.currentEnemies[currentEnemyIndex].posX = MyGrid.wViewport - 80;

    Enemies.enemiesimg[currentEnemyIndex].posGrid[1] = posY;
    Match.currentEnemies[currentEnemyIndex].posY = posY;
    //svgEnemy.style.display = "block";
     newEnemyIndex = setInterval(function(){
      Match.currentEnemies[currentEnemyIndex].newEnemyIndex = newEnemyIndex;
      Enemies.enemiesimg[currentEnemyIndex].posGrid[0] = Enemies.enemiesimg[currentEnemyIndex].posGrid[0] - 100;
      Match.currentEnemies[currentEnemyIndex].posX = Enemies.enemiesimg[currentEnemyIndex].posGrid[0] - 100;
      Match.matchSpaceshipToMonsters();
      $('#' + newId).css("left", Enemies.enemiesimg[currentEnemyIndex].posGrid[0]);

      if((Enemies.enemiesimg[currentEnemyIndex].posGrid[0]) <= 0){
          /*console.log("my if statement works");*/
          Enemies.currentEnemies.splice(currentEnemyIndex,1, "");
          Match.currentEnemies.splice(currentEnemyIndex,1, "");

          var currentEnemy=$("#"+newId)

          $('#' + newId).remove();
          //svgEnemy=null;

          clearInterval(newEnemyIndex);
      }
    }, 500);
  }
}

/*setDarthVader: function(interval_vader){
  var newDarthVaderObject = { "posX" : 0, "posY" : 0, "newEnemyIndex" : "", "currentEnemyIndex" : " " };
  Match.darthVader = newDarthVaderObject;
  var vaderClone = $('#proto-vader').clone().attr('id', "darth-vader");
  vaderClone.appendTo( $( "#mySvgContainer" ) );
  $( "#mySvgContainer" ).css("display", "block");
  $('#darth-vader').css("position", "absolute");
  $('#darth-vader').css("left", MyGrid.wViewport - 80);
  var posY = Math.floor(Math.random() * (MyGrid.hViewport - 80));
  $('#darth-vader').css("top", posY);
  $('#darth-vader').css("display", "block");
  Match.darthVader.posX = MyGrid.wViewport - 80;
  Match.darthVader.posY = MyGrid.hViewport - 80;
  $('#darth-vader').addClass("vaderGroove");
  darthVaderMove = setInterval(function(){
    Match.darthVader.posX -= 100;
    Match.matchSpaceshipToVader();
    $('#darth-vader').css("left", Match.darthVader.posX);
    Match.darthVader.newEnemyIndex = darthVaderMove;
    if((Match.darthVader.posX) <= 0){

        Enemies.darthVader.exists = false;
        Match.darthVader = {};
        $('#darth-vader').removeClass("vaderGroove");
        $('#darth-vader').remove();
        clearInterval(darthVaderMove);
    }
  }, 500);
},*/
