function explode(currentId){
  var myEnemy = $('#' + currentId);
  //$("#" + currentId).fadeOut(2000);
  //console.log("inside exlpode", myEnemy);
  $("#" + currentId).explode({
    radius : 300,
    minRadius : 20,
    release : false,
    fadeTime : 10,
    recycle : false,
    recycleDelay : 100,
    fill : true,
    explodeTime : 1000,
    maxAngle : 360,
    gravity : 0,
    round : false,
    groundDistance : 400,
    ignoreComplete : true,
    land : true
  });

  var currentExplosionDebris = "explode-wrapper" + currentId;
  //console.log(currentExplosionDebris);
  $("."+currentExplosionDebris).fadeOut(1200);
  //Match.myDyingEnemy
  //$('#' + currentId).explodeRestore();
}
