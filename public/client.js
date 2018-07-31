
/* Start Things Going After the Scene is Loaded
 ——————————————————————————————————————————————*/
document.querySelector('a-scene').addEventListener('loaded', function () {
  
  var playerEl = document.querySelector('#player');
  var customElements = document.querySelector('#custom-elements');
  customElements.pause();
  
  /* Customize for Specific Question Designer
 ——————————————————————————————————————————————*/
  function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
  }

  function transformToAssocArray( prmstr ) {
      var params = {};
      var prmarr = prmstr.split("&");
      for ( var i = 0; i < prmarr.length; i++) {
          var tmparr = prmarr[i].split("=");
          params[tmparr[0]] = tmparr[1];
      }
      return params;
  }

  var params = getSearchParameters();
  var t = params.t;
  var q;
  if(t){
    $.get('/get-questions?' + $.param({t: t}), function(data) {
        q = data;
        //console.log(q);
        addCustomContent();
      });

  }else{
    addCustomContent();
  }
  
  
  /* Create Platforms
 ——————————————————————————————————————————————*/
  var MAP_SIZE = 10,
       PLATFORM_SIZE = 5,
       NUM_PLATFORMS = 50;
  var platformsEl = document.querySelector('#platforms');
  var v, box;
  for (var i = 0;  i < NUM_PLATFORMS; i++) {
    v = { 
      x: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE,
      y: (Math.floor(Math.random() * MAP_SIZE)                ) * PLATFORM_SIZE + PLATFORM_SIZE / 2,
      z: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE
    };
    box = document.createElement('a-box');
    platformsEl.appendChild(box);
    box.setAttribute('color', '#39BB82');
    box.setAttribute('width', PLATFORM_SIZE);
    box.setAttribute('height', PLATFORM_SIZE);
    box.setAttribute('depth', PLATFORM_SIZE);
    box.setAttribute('position', v.x + ' ' + v.y + ' ' + v.z);
    box.setAttribute('static-body', '');
  }
  console.info('Platforms loaded.');
  
  ////////////////////////////////////////////
  
  
  function addCustomContent(){
      var questions = {};
      questions["green"]="What color is the grass?";
      questions["Earth"]="What planet are you on?";
      questions["cow"]="What animal goes moo?";
      questions["Water"]="What is a healthy drink when you are thirsty?";
      questions["dog"]="What animal goes woof?";
      questions["cat"]="What animal goes meow?";
    
      if(t){
        let k = Object.keys(questions);
        for(var i = 0; i<Math.min(q.length,6); i++){
          let a = k[i];
          //console.log(`Deleting ${questions[a]}`);
          delete questions[a];
        } 
        q.forEach((q)=>{
          questions[q.answer]= q.question;
        })
      }
      //console.log(questions);
      //let p = parseInt(Math.floor(Math.random()*Object.keys(questions).length));
      let p = 0;
      let a1 = Object.keys(questions)[p];
      let q1 = questions[a1]
      var up2 = document.querySelector('#up-2');
      up2.setAttribute('text',`value:${q1};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up2.setAttribute('door',`openCommand:${a1};
                               dur:801;
                               closePos:26 2 -15;
                               openPos:26 5.5 -15`);
      let a2 = Object.keys(questions)[p+1]|| Object.keys(questions)[p-1];
      let q2 = questions[a2]
      var up3 = document.querySelector('#up-3');
      up3.setAttribute('text',`value:${q2};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up3.setAttribute('door',`openCommand:${a2};
                               dur:801;
                               closePos:26 2 -30;
                               openPos:26 5.5 -30`);
      let a3 = Object.keys(questions)[p+2]|| Object.keys(questions)[p-2];
      let q3 = questions[a3]
      var up4 = document.querySelector('#up-4');
      up4.setAttribute('text',`value:${q3};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up4.setAttribute('door',`openCommand:${a3};
                               dur:801;
                               closePos:16 2 -35;
                               openPos:16 5.5 -35`);
      let a4 = Object.keys(questions)[p+3]|| Object.keys(questions)[p-3];
      let q4 = questions[a4]
      var up4 = document.querySelector('#up-5');
      up4.setAttribute('text',`value:${q4};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up4.setAttribute('door',`openCommand:${a4};
                               dur:801;
                               closePos:0 2 -35;
                               openPos:0 5.5 -35`);



    function factor(n) {
     if (isNaN(n) || !isFinite(n) || n%1!=0 || n==0) return ''+n;
     if (n<0) return '-'+factor(-n);
     var minFactor = leastFactor(n);
     if (n==minFactor) return ''+n;
     return minFactor+'*'+factor(n/minFactor);
    }

    // find the least factor in n by trial division
    function leastFactor(n) {
     if (isNaN(n) || !isFinite(n)) return NaN;  
     if (n==0) return 0;  
     if (n%1 || n*n<2) return 1;
     if (n%2==0) return 2;  
     if (n%3==0) return 3;  
     if (n%5==0) return 5;  
     var m = Math.sqrt(n);
     for (var i=7;i<=m;i+=30) {
      if (n%i==0)      return i;
      if (n%(i+4)==0)  return i+4;
      if (n%(i+6)==0)  return i+6;
      if (n%(i+10)==0) return i+10;
      if (n%(i+12)==0) return i+12;
      if (n%(i+16)==0) return i+16;
      if (n%(i+22)==0) return i+22;
      if (n%(i+24)==0) return i+24;
     }
     return n;
    }

      let num = parseInt(Math.random()*101);
      let numString = factor(num);
      var greatestPrimeFactor;
      if (!numString.includes("*")){greatestPrimeFactor = num;}
      else {
        let numSArr= numString.split('*');
        greatestPrimeFactor = parseInt(numSArr[numSArr.length-1]);
      }
      let a5 = Object.keys(questions)[p+4]|| Object.keys(questions)[p-4];
      let q5 = questions[a5]
      var up6 = document.querySelector('#up-6');
      up6.setAttribute('text',`value:${q5};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up6.setAttribute('door',`openCommand:${a5};
                               dur:801;
                               closePos:-15 2 -35;
                               openPos:-15 5.5 -35`);

      var up1 = document.querySelector('#up-1');
      let a6 = Object.keys(questions)[p+5]|| Object.keys(questions)[p-5];
      let q6 = questions[a6]
      up1.setAttribute('text',`value:${q6};
                               align:center;
                               wrap-count:15;
                               zOffset:1.05;
                               color:black`);
      up1.setAttribute('door',`openCommand:${a6};
                               dur:801;
                               closePos:26 2 0;
                               openPos:26 5.5 0`);





      console.log("dynamic command to be added");
      window.customElementsReady = true;
      customElements.play();
      window.annyang.start();
    
  }
  
  
  var eddies = document.querySelector('#eddies');
  
  
  
  
  var maxHeight=0;
  var maxHeightHUD = document.querySelector("#maxHeightHUD");
  var jumps = 0;
  var jumpPowers = [];
  for(var i = 1; i<7; i++){
    jumpPowers.push(document.querySelector(`#jump-power-${i}`));
  }
  
  var scene1 = document.querySelector('#scene-1');
  var jumpsHUD = document.querySelector('#jumpsHUD');
  
  function checkDistanceToJumpPowers(){
    for (var i = 0; i < jumpPowers.length; i++){
      let jp = jumpPowers[i];
      let d = scene1.camera.getWorldPosition().distanceTo(jp.object3D.getWorldPosition());
      //console.log(d);
      if(d < 1){
         jp.setAttribute("color","blue");
         jumps += 6;
         jumpsHUD.innerHTML = jumps;
         jumpPowers.splice(jumpPowers.indexOf(jp),1); 
         playerEl.setAttribute('jump-ability',`max-jumps:${jumps}`);
       }
      
    }
  }
  
  var goalReached = false;
  
  function checkIfMaxHeight(){
    maxHeight = Math.max(scene1.camera.getWorldPosition().y,maxHeight);
    maxHeightHUD.innerHTML = `${maxHeight.toFixed(0)} meters`;
    if(maxHeight >= 100 && !goalReached){
      playSong(355552145);
      goalReached = true;
    }
  }
 
  $("body").on("keydown",(e)=>{
    
    switch(e.keyCode){
      //SPACE KEY PRESSED  
      case 32: 
        
        break;
      //RETURN KEY PRESSED
      case 13: 
        break;
    }
     
  });
  
  $("body").on("keyup",(e)=>{
     switch(e.keyCode){
       case 32: 
         (jumps>0)?jumps--:jumps+=0;
         playerEl.setAttribute('jump-ability',`max-jumps:${jumps}`);
         jumpsHUD.innerHTML = jumps;
         break;
       case 13: 
         if(time < 0)return;
         playerEl.setAttribute('universal-controls','movementEnabled:true;rotationEnabled:true');
         gameRunning = true;
         break;
     }
  });
  
  playerEl.setAttribute('universal-controls','movementEnabled:false;rotationEnabled:false');
  
  var time=90;
  var timeHUD = document.querySelector('#timeHUD');
  
  var gameRunning = false;
  function checkOutofTime(){
    if (time<0){
      gameRunning = false;
      playerEl.setAttribute('universal-controls','movementEnabled:false;rotationEnabled:false');
    }else{
      timeHUD.innerHTML = time.toFixed(0);
    }
  }
  
  var totalTime = 0;
  //GAME WORLD UPDATE FUNCTION
  function update(dt){
    if(!gameRunning)return;
    totalTime += dt;
    time -= dt/1000;
    if(playerEl.object3D.position.y < 0.8){
      let x = playerEl.object3D.position.x;
      let z = playerEl.object3D.position.z;
      playerEl.body.el.setAttribute("position",`${x} 1.6 ${z}`);
      playerEl.body.el.setAttribute("velocity","0 0 0");
    }
    checkDistanceToJumpPowers();
    checkIfMaxHeight();
    checkOutofTime();
    eddies.object3D.rotateY(0.03);
  }
  //GAME LOOP
  var frameRate = 1000/60;
  var lastFrame = 0;
  var startTime = 0;
  var currentFrame;
  function gameLoop(time){  
    // time in ms accurate to 1 micro second 1/1,000,000th second
      currentFrame = Math.round((time - startTime) / frameRate);
      var deltaTime = (currentFrame - lastFrame) * frameRate;
      update(deltaTime);
      lastFrame = currentFrame;
      requestAnimationFrame(gameLoop);
    }
  window.requestAnimationFrame(gameLoop);
  
  var bgm = document.createElement('audio');
  var bgmUrlStart = 'https://api.soundcloud.com/tracks/';
  var bgmUrlEnd = '/stream?client_id=b9d11449cd4c64d461b8b5c30650cd06';
  bgm.src = bgmUrlStart + 207043508 + bgmUrlEnd;
  bgm.crossorigin = 'anonymous';
  bgm.autoplay = 'autoplay';
  bgm.volume = 0.02;
  document.body.appendChild(bgm);
  
  function playSong(s){
    bgm.src = bgmUrlStart + s + bgmUrlEnd;
    bgm.crossorigin = 'anonymous';
    bgm.autoplay = 'autoplay';
    bgm.loop = true;
    bgm.load();
    bgm.play();
    bgm.volume = 0.5;
  }
            
  //button to play music on IOS
  this.b = document.createElement('button');
  this.b.innerHTML = 'PLAY';
  this.b.addEventListener('click', onSelect.bind(this));
  document.body.appendChild(this.b);
  
  function onSelect(){
    bgm.src = bgmUrlStart + 207043508 + bgmUrlEnd;
    bgm.crossorigin = 'anonymous';
    bgm.autoplay = 'autoplay';
    bgm.loop = true;
    bgm.load();
    bgm.play();
    bgm.volume = 0.02;
  }
  
  
  // Get the modal
  var modal = document.getElementById('instructions');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
      bgm.play();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  
  
  
  
  
  
  
  
});