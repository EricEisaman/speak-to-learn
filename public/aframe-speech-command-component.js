var annyang = window.annyang;

window.AFRAME.registerSystem('speech-command', {
	    init: function () {
	        //console.log("in speech-command system init");
	        this.entities = [];
	        //window.addEventListener('loaded', this.onSceneLoaded.bind(this));
	    },
	    registerMe: function (comp) {
	        this.entities.push(comp);
	        //console.log("in register, comp: "+comp.data.command);
	    },
	    unregisterMe: function (comp) {
	        var index = this.entities.indexOf(comp);
	        this.entities.splice(index, 1);
	    },
	    onSceneLoaded: function(evt) {
	        //console.log("in speech-command system onSceneLoaded listener");
	    },
	    play: function() {
	        //console.log("in system play, entities: "+this.entities);
	    }
	});
	window.AFRAME.registerComponent('speech-command', {
	    multiple: true,
	    schema: {
	        command: { type: 'string' },
	        type: { type: 'string' },
	        targetElement: { type: 'selector' },
	        targetComponent: { type: 'string' },
	        function: { type: 'string' },
	        attribute: { type: 'string' },
	        value: { type: 'string' },
	        keyCode: { type: 'string' }
	    },
	    init: function () {
	        this.system.registerMe(this);
	        if (!this.data.targetElement) {
	            this.data.targetElement = this.el;
	        }
	        if (this.data.keyCode) {
	            window.addEventListener('keyup', this.onKeyup.bind(this));
	        }
	    },
	    remove: function () {
	        this.system.unregisterMe(this);
	    },
	    play: function() {
	        //console.log("in speech-command play, command: "+this.data.command+", type: "+this.data.type);
	    },
	    executeCommand: function () {
	        //console.log("in executeCommand for: "+this.data.targetElement);
	        var targetElement = this.data.targetElement;
	        if (this.data.type == 'attribute') {
	            //console.log("about to change attribute "+this.data.attribute+" to: "+this.data.value);
	            targetElement.setAttribute(this.data.attribute, this.data.value);
	        } else if (this.data.type == 'function') {
	            //console("targetElement: "+targetElement+", components"+targetElement.components);
	            var targetComponent = targetElement.components[this.data.targetComponent];
	            targetComponent[this.data.function]();
	        }
	    },
	    onKeyup: function (evt) {
	        if (evt.keyCode == this.data.keyCode) {
	            //console.log("in speech command keyup for: "+this.data.command);
	            this.executeCommand();
	        }
	    }
	});
	window.AFRAME.registerComponent('annyang-speech-recognition', {
	    init: function () {
	        //console.log("in annyang-speech-recognition init");
	    },
	    play: function() {
	        if (annyang && window.customElementsReady) {
	            console.log("annyang: "+annyang);
	            console.log("annyang.addCommands: "+annyang.addCommands);
	            var speechCommandSystem = document.querySelector('a-scene').systems['speech-command'];
	            var commands = {};
	            var commandsMap = {};
	            for (var i = 0; i < speechCommandSystem.entities.length; i++) {
	                var speechCommand = speechCommandSystem.entities[i];
	                commandsMap[speechCommand.data.command] = speechCommand;
	                // note: function empty here because real work is done in the resultMatch callback below
	                commands[speechCommand.data.command] = function() { };
	            }
	            annyang.addCommands(commands);

	            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
	                //console.log("commandText: "+commandText); // sample output: 'hello (there)'
	                var speechCommand = commandsMap[commandText];
	                speechCommand.executeCommand();
	            });

	        }
	    }

	});
