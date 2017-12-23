var World = {
	loaded: false,
	rotating: false,
	initialized: false,
	
	init: function initFn() {
		this.createModelAtLocation();
		World.initialized =  true;		
	},

	createModelAtLocation: function createModelAtLocationFn() {

		// if you keep the following line in, it will draw an orange triangle at the bottom right of the AR view. If you press it, the log window will appear.
		// Remove this line for production.
		AR.logger.activateDebugMode();

		AR.logger.info("createModelAtLocation called ...");
		
		/*
			First a location where the model should be displayed will be defined. This location will be relativ to the user.	
		*/
		var location = new AR.RelativeLocation(null, 5, 0, 2);

		/*
			Next the model object is loaded.
		*/
		var modelEarth = new AR.Model("assets/earth.wt3", {
			onLoaded: this.worldLoaded,
			scale: {
				x: 1,
				y: 1,
				z: 1
			}
		});

        var indicatorImage = new AR.ImageResource("assets/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [modelEarth],
               indicator: [indicatorDrawable]
            }
        });
	},

	/*
		This sample shows you how to use the function captureScreen to share a snapshot with your friends. C
		oncept of interaction between JavaScript and native code is same as in the POI Detail page sample but the urlListener now handles picture sharing instead. 
		The "Snapshot"-button is on top right in the title bar. 
		Once clicked the current screen is captured and user is prompted to share it (Handling of picture sharing is done in native code and cannot be done in JavaScript)
	*/
	captureScreen: function captureScreenFn() {
		AR.logger.info("captureScreen called ... World.initialized: "+World.initialized);

		if (World.initialized) {
			AR.platform.sendJSONObject({action: "captureScreen"});			
		}
	},

	/**
	 * This is an example of a function called by IONIC --> WikitudePlugin
	 */
	testFunction: function testFunctionFn(message) {
		alert("testFunction called: "+message);
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	}
};

World.init();
