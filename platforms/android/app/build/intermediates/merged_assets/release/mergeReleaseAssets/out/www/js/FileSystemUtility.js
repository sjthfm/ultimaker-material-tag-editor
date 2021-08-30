class FileSystemUtility {
	constructor() {
		console.log("File System Utility initalised.");
	}
	FileSystemUtility() {
		console.log(cordova.file);
	}
	/* Lists a specified directory into its constituent File object equivalences */
	listDir(path){
	  window.resolveLocalFileSystemURL(path,
	    function (fileSystem) {
	      var reader = fileSystem.createReader();
	      reader.readEntries(
	        function (entries) {
	          entireMaterialDirectory = entries;
	        },
	        function (err) {
	       //	alert(err)
	          console.log(err);
	        }
	      );
	    }, function (err) {
	     //	alert(err)
	      console.log(err);
	    }
	  );
	}
}