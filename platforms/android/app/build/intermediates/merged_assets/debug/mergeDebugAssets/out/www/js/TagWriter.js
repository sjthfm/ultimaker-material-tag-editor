class TagWriter {
	constructor() {
		console.log("TagWriter has been initialised.");
	}
	// on class instantiation enable nfc if it is available
	TagWriter() {
		window.mifare.enabled(() => ons.notification.toast('NFC is available and has been enabled.', {timeout: 3000}), status => alert('NFC is unavailable. Error: '+status));		
	}
	// connect to detected tag
	connectTag() {
    	window.mifare.connect(() => console.log('connected'), err => ons.notification.toast(`Couldn't connect because: ${err}`, {timeout: 3000}));                		
	}
	// disconnect from connected tag
	disconnectTag() {
		window.mifare.disconnect(() => ons.notification.toast('NFC Tag Disconnected', {timeout: 500}), err => console.log(`Couldn't disconnect because: ${err}`));           
	}
	// return string guid from object
	printObject(o) {
	var out = '';
		for (var p in o) {
			out += p + ': ' + o[p] + '<br>';
		}
		return out;
	}
	/*
	 * Write Base Tag parameters to NFC Tag, this includes a basic guid of pla-natural
	 */
	WriteBaseTag() {
		tagWriter.connectTag(); // connect to detected tag	
		console.log('base tag try')			
		$("#tag_write_progress").val('0.0');
		$("#progressamt").text($("#tag_write_progress").val());
		if (selectedMaterialName === null || selectedMaterialName === null) { (function() { tagWriter.disconnectTag(); })(); return ons.notification.alert('Please ensure a material is set'); }
		console.log('base tag write');
		//tagJson.scan.section[3].subsection[3].block[I].address
		//tagJson.scan.section[3].subsection[3].block[I].data
		for (var i = 0; i < (tagJson.scan.section[3].subsection[3].block.length-8); i++) {
			Object.assign(baseTagToWrite, {[i]:tagJson.scan.section[3].subsection[3].block[i].data}) 
			window.mifare.write(i, baseTagToWrite[i].split(" "), (response) => console.log(response), err => console.log('Writing failed at address ' + i + ' ' + err, {timeout: 500}));
			if (i < 25) {
				$("#tag_write_progress").val($("#tag_write_progress").val()+1);
				$("#progressamt").text($("#tag_write_progress").val());
			}
		}
		// when tag has been written, inform user
		ons.notification.toast('Processed Basic Tag Schema', {timeout: 1000})
	}
	/*
	 * Edit base tag GUID to user-set material
	 * this function also reads the tag to confirm the written guid, which the
	 * user can verify between tabs 
	 */
	WriteGUIDToTag(materialName, materialGUID) {
		if (materialName === null || materialGUID === null) { (function() { tagWriter.disconnectTag(); })(); return ons.notification.alert('Please ensure a material is set'); }
		console.log('Editing Tag GUID')
		ons.notification.toast('Editing Tag GUID', {timeout: 1000})
		var GUIDParse = selectedMaterialGUID.replace(/-/g, '').split("");
		var GUIDArray = [];
		for (var i = 0; i < GUIDParse.length; i++)	{
			console.log(GUIDParse[i] + GUIDParse[i+1]);
			GUIDArray.push(GUIDParse[i]+GUIDParse[i+1])
			$("#tag_write_progress").val($("#tag_write_progress").val()+1);
			$("#progressamt").text($("#tag_write_progress").val());
			i++;
		}
		console.log(GUIDArray);
		var address16 = '8D AB ' + GUIDArray[0] + ' ' + GUIDArray[1];
		var address17 = GUIDArray[2] + ' '  + GUIDArray[3] + ' ' +GUIDArray[4] + ' ' + GUIDArray[5];
		var address18 = GUIDArray[6] + ' '  + GUIDArray[7] + ' ' +GUIDArray[8] + ' ' + GUIDArray[9];
		var address19 = GUIDArray[10] + ' ' + GUIDArray[11] + ' ' +GUIDArray[12] + ' ' + GUIDArray[13];
		var address20 = GUIDArray[14] + ' ' + GUIDArray[15] + ' 00' + ' 17';
		window.mifare.write(16, address16.split(" "), (response) => console.log(response), err => ons.notification.toast('Writing failed at address ' + i + ' ' + err, {timeout: 500}));
		window.mifare.write(17, address17.split(" "), (response) => console.log(response), err => ons.notification.toast('Writing failed at address ' + i + ' ' + err, {timeout: 500}));
		window.mifare.write(18, address18.split(" "), (response) => console.log(response), err => ons.notification.toast('Writing failed at address ' + i + ' ' + err, {timeout: 500}));
		window.mifare.write(19, address19.split(" "), (response) => console.log(response), err => ons.notification.toast('Writing failed at address ' + i + ' ' + err, {timeout: 500}));
		window.mifare.write(20, address20.split(" "), function(response) { console.log(response); $("#tag_write_progress").val('50.0'); $("#progressamt").text($("#tag_write_progress").val());}, err => ons.notification.toast('Writing failed at address ' + i + ' ' + err, {timeout: 500}));

		console.log('started to read')
		window.mifare.read(16, function(response) { Object.assign(readOutput, {16: response.data.substr(0,8)}); $("#tag_write_progress").val('55.0'); $("#progressamt").text($("#tag_write_progress").val());}, err => console.log(`Reading failed because ${err}`));
		window.mifare.read(17, (response) => Object.assign(readOutput, {17: response.data.substr(0,8)}), err => console.log(`Reading failed because ${err}`));
		window.mifare.read(18, (response) => Object.assign(readOutput, {18: response.data.substr(0,8)}), err => console.log(`Reading failed because ${err}`));
		window.mifare.read(19, (response) => Object.assign(readOutput, {19: response.data.substr(0,8)}), err => console.log(`Reading failed because ${err}`));
		window.mifare.read(20, function(response) { Object.assign(readOutput, {20: response.data.substr(0,8)}); $("#tag_write_progress").val('65.0'); $("#progressamt").text($("#tag_write_progress").val());}, err => console.log(`Reading failed because ${err}`));
		console.log('finished read')
		setTimeout(function() {
			$("#tag_write_progress").val('70.0');	
			$("#progressamt").text($("#tag_write_progress").val());	
			$("#pageWriteTag-LiveTagData").empty();
			$(".liveDataObj").empty();
			$("#pageWriteTag-LiveTagData").append("<p class='liveDataObj'>"+tagWriter.printObject(readOutput)+"</p>");
			setTimeout(function() {
				ons.notification.alert({message:"GUID for <strong>"+materialName+"</strong> <br>has been written to tag",
										callback: function() {
											tagWriter.disconnectTag();
											$("#tag_write_progress").val(0.0)
											$("#progressamt").text($("#tag_write_progress").val());
										}});
				$("#tag_write_progress").val('100.0');
				$("#progressamt").text($("#tag_write_progress").val());
			}, 3000);
			$("#tag_write_progress").val('85.0');
			$("#progressamt").text($("#tag_write_progress").val());
		}, 1000);
		ons.notification.toast('Tag writing process completed', {timeout: 1000})
//TOBEWRITTEN		//53 2e 8b 3d -5 fd 4- 41 49 -b 93 6- 53 ad a9 bd 6b 85
//MATERIAL.XML		//53 2e 8b 3d -5 fd 4- 41 49 -b 93 6- 53 ad a9 bd 6b 85
//ACTUAL			//53 2E 8B 3D 5F D4 41 49 B9 36 53 AD A9 BD 6B 85
	}
}