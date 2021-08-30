class Material {
	constructor() {
		console.log('Material class instantiated');
	}
	Material() {
		console.log('')
	}
	/* Returns entire material list */
	getMaterials() {
		return GUID;
	}
	/* create a material and add to list */
	createMaterial(materialDescription, materialGUID) {
		console.log("Creating material: " + materialDescription + ' with ID: ' + materialGUID);
		Object.assign(GUID, {[materialDescription]: materialGUID});		
	}
	/* bulk add from GUID list */
	addMaterialsToList() {
		$.each(Object.keys(GUID), function( index, value ) {
			$('#pageSetData-itemType').children().append($('<option/>', {
				value: value,
				text : value 
			}));
		});
	}
	/* Add single material to list */
	addMaterial(materialName) {
		$('#pageSetData-itemType').children().append($('<option/>', {
			value: materialName,
			text : materialName 
		}));		
	}
	/* return guid based on material name */
	getMaterialGUID(materialIdentifier) {
		return GUID[materialIdentifier];
	}
	/* on select box change, set the selected item to be the GUID to write */
	materialListOnChangeEvent() {
		$("#pageSetData-itemType").on("change", function() {
			var materialIdentifier = $(this).val();
			(function() {
				var materialGUID = material.getMaterialGUID(materialIdentifier);
				$("#pageSetData-GUIDContainer").text(materialGUID);
					selectedMaterialName = materialIdentifier;
					selectedMaterialGUID = materialGUID;
				$("#pageSetData-DataToWriteContainer").text('Chosen Material ==> ' + materialIdentifier);
				ons.notification.toast('GUID To Write: '+materialIdentifier, {timeout: 1000})				
			})();
		})
	}
	/* add user's material to the bottom of the list */
	userAddMaterial(materialName) {
		$('#pageSetData-itemType').children().append($('<option/>', {
			value: materialName,
			text : materialName 
		}));
	}
	/* creates a user specified material */
	newMaterialEvent() {
		// prompt for custom material name
		ons
		.notification.prompt({message: 'Enter Custom Material Name <br><br> Example: <strong>ultimaker-pla-natural</strong>'})
			.then(function(uMaterialName) {
					if (uMaterialName.length === 0) {
						ons.notification.alert('Current Name Length: ' + uMaterialName.length + '.\n<br><br>Material Name cannot be blank.\n<br><br>Example Name: <strong>ultimaker-pla-transparent</strong>');
						return 0;
					}
					userMaterialName = uMaterialName;
					// prompt for custom material guid
					// for this to work it is important that the custom material id is also on the printer
					// which can be achieved via cura 
					ons
					.notification.prompt({message: 'Enter Material GUID <br><br>Example: <strong>e256615d-a04e-4f53-b311-114b90560af9</strong>'})
						.then(function(uMaterialGUID) {
							if (uMaterialGUID.length != 36) {
								var exampleGUID = '532e8b3d-5fd4-4149-b936-53ada9bd6b85';
								var exampleGUIDLen = exampleGUID.length;
								ons.notification.alert('Current GUID Length: ' + uMaterialGUID.length + '.\n<br><br>Material length must be <strong>'+exampleGUIDLen+' characters long</strong>.\n<br><br>Example GUID: <strong>'+exampleGUID+'</strong>');
								return 0;
							}
								userMaterialGUID = uMaterialGUID;
								console.log('user created ' + userMaterialName + ' & ' + userMaterialGUID);
								material.createMaterial(userMaterialName, userMaterialGUID);
								htmlLocalStore.setItem(userMaterialName, userMaterialGUID);
								material.userAddMaterial(userMaterialName)
							    ons.notification.toast("Material Name: <strong>" + userMaterialName + "</strong><br>Material GUID: <strong>"+userMaterialGUID+"</strong> <br>has been created by the user.", {timeout: 5000});   	
					});
		});
	}
}