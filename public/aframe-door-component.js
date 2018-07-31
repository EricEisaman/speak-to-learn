window.AFRAME.registerComponent('door', {
    
      schema: {
        type: {type:'string' , default:'translate'},//rotate
        openPos:{type:'string' , default: '0 3 0'},//for translate
        closePos:{type:'string' , default: '0 1 0'},//
        openRot:{type:'string', default: '0 90 0'},//for rotate
        closeRot:{type:'string', default: '0 0 0'},//
        startsOpen:{type:'boolean' , default: false},
        trigger: {type:'string' , default:'keyboard'},//proximity,voice
        threshold: {type:'int', default: 6},//minimum player distance for trigger
        openCommand: {type:'string', default: 'open'},//for voice trigger
        closeCommand: {type:'string', default: 'close'},//for voice trigger
        openKeyCode: {type:'int' , default: 32},//SPACE KEY
        closeKeyCode: {type:'int', default: 32},//
        dur:{type:'int', default: 800},//milliseconds of animation
        player:{type:'selector', default: '#player'}
      },
    
      init: function () {
        this.isAnimating = false;
        this.isOpen = this.data.startsOpen;
        this.el.addEventListener('animationstart',()=>{
          this.isAnimating = true;
        });
        this.el.addEventListener('animationend',()=>{
          this.isAnimating = false;
        });
        if(this.data.type == 'translate')this.addTranslateAnims();
        if(this.data.type == 'rotate')this.addRotateAnims();
        if(this.data.trigger == 'keyboard')this.addKeyHandlers();
        if(this.data.trigger == 'voice')this.addVoiceHandlers(); 
        //console.log(this.isCloseEnough());
      },
  
      open: function(){
        //console.log('emitting open event:');
        //console.log(this.isCloseEnough());
        if(!this.isCloseEnough() || this.isOpen)return;
        this.el.emit('open');
        this.isOpen = true;
      },
  
      close: function(){
        //console.log('emitting close event:');
        //console.log(this.isCloseEnough());
        if(!this.isCloseEnough() || !this.isOpen)return;
        this.el.emit('close');
        this.isOpen = false;
      },
        
      isCloseEnough: function(){
        //console.log(this.distanceAway());
        return this.distanceAway() < this.data.threshold;
      },
      distanceAway: function(){
        return this.data.player.object3D.getWorldPosition().distanceTo(this.el.object3D.getWorldPosition());
      },
  
      addKeyHandlers: function(){
        document.body.addEventListener('keyup',(e)=>{
          //console.log('this.isAnimating:',this.isAnimating);
          if(this.isAnimating)return;
          if(e.keyCode == this.data.openKeyCode && !this.isOpen)
          {
            this.open()
          } else 
          if(e.keyCode == this.data.closeKeyCode && this.isOpen){
            this.close();
          }
        });   
      },
  
      addVoiceHandlers: function(){
        //alert();
        let openString = `command:${this.data.openCommand};targetComponent:door;targetElement:#${this.el.id};type:function;function:open`;
        let closeString = `command:${this.data.closeCommand};targetComponent:door;targetElement:#${this.el.id};type:function;function:close`;
        let base = `targetComponent:door;targetElement:#${this.el.id}`;
        if(this.data.dur == 801){
           this.el.setAttribute('speech-command__open',openString); 
           this.el.setAttribute('speech-command__close',closeString); 
        }else{
          
        }
      },
 
      addTranslateAnims(){
        this.el.setAttribute("position", this.data.startsOpen ? this.data.openPos : this.data.closePos);
        let openDoorAnim = document.createElement("a-animation");
        openDoorAnim.setAttribute("attribute", "position");
        openDoorAnim.setAttribute("from", this.data.closePos);
        openDoorAnim.setAttribute("to", this.data.openPos);
        openDoorAnim.setAttribute("dur", this.data.dur);
        openDoorAnim.setAttribute("begin", "open");
        this.el.appendChild(openDoorAnim);
        let closeDoorAnim = document.createElement("a-animation");
        closeDoorAnim.setAttribute("attribute", "position");
        closeDoorAnim.setAttribute("from", this.data.openPos);
        closeDoorAnim.setAttribute("to", this.data.closePos);
        closeDoorAnim.setAttribute("dur", this.data.dur);
        closeDoorAnim.setAttribute("begin", "close");
        this.el.appendChild(closeDoorAnim); 
      },
      
      addRotateAnims(){
        this.el.setAttribute("rotation", this.data.startsOpen ? this.data.openRot : this.data.closeRot);
        let openDoorAnim = document.createElement("a-animation");
        openDoorAnim.setAttribute("attribute", "rotation");
        openDoorAnim.setAttribute("from", this.data.closeRot);
        openDoorAnim.setAttribute("to", this.data.openRot);
        openDoorAnim.setAttribute("dur", this.data.dur);
        openDoorAnim.setAttribute("begin", "open");
        this.el.appendChild(openDoorAnim);
        let closeDoorAnim = document.createElement("a-animation");
        closeDoorAnim.setAttribute("attribute", "rotation");
        closeDoorAnim.setAttribute("from", this.data.openRot);
        closeDoorAnim.setAttribute("to", this.data.closeRot);
        closeDoorAnim.setAttribute("dur", this.data.dur);
        closeDoorAnim.setAttribute("begin", "close");
        this.el.appendChild(closeDoorAnim);
      },
  
      checkProximity: function() {
        if(!this.isOpen && this.isCloseEnough() && !this.isAnimating){
          this.el.emit('open');
          this.isOpen = true;
        }else
        if(this.isOpen && (this.distanceAway()>this.data.threshold+3) && !this.isAnimating){
          this.el.emit('close');
          this.isOpen = false;
        }
      },
    
      update: function (data) {
        this.init();
      },
    
      tick: function (t,dt) {
        if(this.data.trigger == 'proximity')this.checkProximity();
      },
    
      remove: function () {},
    
      pause: function () {},
    
      play: function () {}    
    });