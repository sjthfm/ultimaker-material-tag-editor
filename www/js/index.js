/* Actual conversion function for xml --> json
  
  uses recursion to convert an XML string
  into JSON as far down as possible 

  it is necessary for the xml to be parsed as a DOM, hence parseBaseTagXML();
 */
function xml2json(srcDOM) {
  let children = [...srcDOM.children];

  // base case for recursion. 
  if (!children.length) {
    return srcDOM.innerHTML
  }

  // initializing object to be returned. 
  let jsonResult = {};

  for (let child of children) {

    // checking is child has siblings of same name. 
    let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

    // if child is array, save the values as array, else as strings. 
    if (childIsArray) {
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xml2json(child)];
      } else {
        jsonResult[child.nodeName].push(xml2json(child));
      }
    } else {
      jsonResult[child.nodeName] = xml2json(child);
    }
  }

  return jsonResult;
}

/* 
 * Converts a pre-scanned base tag into JSON format
 */
function parseBaseTagXML() {
	var parser = new DOMParser();
	var srcDOM = parser.parseFromString(strxml, "application/xml");
	tagJson = xml2json(srcDOM);
}
/*
 * Address read from	//tagJson.scan.section[3].subsection[3].block[I].address
 * Data at N address   //tagJson.scan.section[3].subsection[3].block[I].data
 */

/*
 * Called when a mifare ultralight tag is detected by the event listener
 * Essentially outlines the connection process
 *  Timers were added to provide a break in-between steps which is beneficial when dealing with **direct**
 *  NFC address writing 
 */
function writeToTag() {
	parseBaseTagXML();      // parse base tag
	setTimeout(function() {
      $("#tag_write_progress").val('0.0');
	}, 200);              
	tagWriter.WriteBaseTag(); // write the basic tag from the parsed xml
	setTimeout(function() { /*wait*/ }, 1000);
	console.log('done writing base tag')
	tagWriter.WriteGUIDToTag(selectedMaterialName, selectedMaterialGUID); // rewrite the guid to match selected guid
	console.log('written guid')
}

/* Cordova base application */
var app = {
    /* Called upon application initialisation, as seen at the bottom of app {}; */
    initialize: function() {
        document.addEventListener('deviceready', 		this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        document.addEventListener('show', this.onPageShow.bind(this),false);
      	/* Class instantiation etc. */
        fileSystem = new FileSystemUtility();
      	  material = new Material();
      	 tagWriter = new TagWriter();
         fileSystem.FileSystemUtility();
    	     material.Material();
    	    tagWriter.TagWriter();

          /* List the available material files */
          fileSystem.listDir(cordova.file.applicationDirectory + "www/resources/materials/");
          
          /* Wait a second before processing the listed material files */
          setTimeout(function() {
  		        for (var i = 0; i < entireMaterialDirectory.length; i++) {
  		        	var currentMaterial 	  = entireMaterialDirectory[i];
  		        	var currentMaterialName = entireMaterialDirectory[i].name;

  				/*	if (String(currentMaterialName).indexOf('.fdm_material') >= 0) { 		// all materials										 	*/
  					if (String(currentMaterialName).indexOf('ultimaker') >= 0 || String(currentMaterialName).indexOf('generic_') >= 0) { // generics and utlimaker products
  				/*	if (String(currentMaterialName).indexOf('ultimaker') >= 0) { */
    						/* Important note: 
                 *
                 *   Some branded products such as emotionTech PLA White can crash the
                 *   printer when scanned whereas others such as Generic_Nylon seem
                 *   to work correctly.
                 *
                 *   The printer error is unspecified (ES27)
                 */
                currentMaterial.file(function (file) {

    						var reader = new FileReader();

    						reader.onloadend = function() { 
                  /* When finished loading, parse each individual file taking brand, name, and GUID */
    							var parser = new DOMParser();
    							var srcDOM = parser.parseFromString(this.result, "application/xml");
    							var materialXmlToJson2 = xml2json(srcDOM)
    							 
    								var currentMaterialGUID = (materialXmlToJson2.fdmmaterial.metadata.GUID);
    								var currentMaterialName = (materialXmlToJson2.fdmmaterial.metadata.name.brand+'-'+materialXmlToJson2.fdmmaterial.metadata.name.material+'-'+materialXmlToJson2.fdmmaterial.metadata.name.color);
    								material.createMaterial(currentMaterialName,currentMaterialGUID);
    								material.addMaterial(currentMaterialName);
    						};

    						reader.readAsText(file);

    						});    
    					}
  		    	}

            Object.keys(localStorage).forEach(function(key){
                    material.createMaterial(key,localStorage.getItem(key));
                    material.addMaterial(key);             
            });

      	}, 2000);

      	material.materialListOnChangeEvent(); // Event Listener for select materials section

      	$("#pageWriteTag-startWritingTags").on("click", function() {
          $("#pageWriteTag-startWritingTags").attr('disabled', 'true');
          $("#pageWriteTag-stopWritingTags").removeAttr('disabled');          
      		ons.notification.alert("Writing to tags has been enabled. <br><br> Place the tag on the phone in order to write to the tag", {timeout: 2000}); 
  	      document.addEventListener('mifareTagDiscovered', writeToTag);
      		ons.notification.toast("Place the tag on the phone in order to write", {timeout: 2000});   	
      	});

      	$("#pageWriteTag-stopWritingTags").on("click", function() {
          $("#pageWriteTag-stopWritingTags").attr('disabled', 'true');
          $("#pageWriteTag-startWritingTags").removeAttr('disabled');          
      		document.removeEventListener('mifareTagDiscovered', writeToTag);
      		ons.notification.toast("Writing to tags has been disabled", {timeout: 2000});    	
      	}); 

      	$("#pageSetData-AddNewMaterial").on("click", function() {
      		material.newMaterialEvent();
  		});

        /* INITIAL CONTROL STATES */
        $("#pageWriteTag-stopWritingTags").attr('disabled', 'true');

    },
    onPageShow: function(event ) {
      if ($(event.target).attr('id') === 'pageWriteTag') {
        $("#tag_write_progress").val('0.0'); 
        $("#progressamt").text($("#tag_write_progress").val());       
      }
    }
};

app.initialize();