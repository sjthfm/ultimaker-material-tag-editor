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
 *  Timers were added to provide a break in-between steps which is beneficial when dealing with
 *  NFC address writing 
 */
function writeToTag() {
  $("#tag_write_progress").val('0.0');
	tagWriter.connectTag(); // connect to detected tag	
	parseBaseTagXML();      // parse base tag
	setTimeout(function() {
	}, 200);              
	tagWriter.WriteBaseTag(); // write the basic tag from the parsed xml
	setTimeout(function() {
	}, 1000);
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

      $("#tag_write_progress").val('0.0');
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
               *   The printer error is unspecified (ES27? ES26?)
               */
              currentMaterial.file(function (file) {

  						var reader = new FileReader();

  						reader.onloadend = function() {
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
    	}, 2000);

    	material.materialListOnChangeEvent(); // Event Listener 

    	/* Default Dropdown Box Option */
    	setTimeout(function() {
	    	$('#pageSetData-itemType option[value="Generic-PP-Generic"]').attr("selected",true);
			  $("#pageSetData-GUIDContainer").text(material.getMaterialGUID("Generic-PP-Generic"));
        ons.notification.toast('Ready to write tags', {timeout: 1000})
    	}, 1500);

    	$("#pageWriteTag-startWritingTags").on("click", function() {
    		ons.notification.alert("Writing to tags has been enabled", {timeout: 2000}); 
	      document.addEventListener('mifareTagDiscovered', writeToTag);
    		ons.notification.toast("Place the tag on the phone in order to write", {timeout: 2000});   	
    	});

    	$("#pageWriteTag-stopWritingTags").on("click", function() {
    		document.removeEventListener('mifareTagDiscovered', writeToTag);
    		ons.notification.toast("Writing to tags has been disabled", {timeout: 2000});    	
    	}); 

    	$("#pageSetData-AddNewMaterial").on("click", function() {
    		material.newMaterialEvent();
		});   	
    }
};

app.initialize();