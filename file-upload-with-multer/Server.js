var express	=	require("express");
var multer	=	require('multer');
var app	=	express();

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {

    if(file.mimetype == 'video/mp4') 
      callback(null, './uploads/videos');
    else if ( file.mimetype == 'audio/mp3') 
      callback(null, './uploads/audios');
    else
      callback(null, './uploads/archivos');

  },

  filename: function (req, file, callback) {
  /*
  console.log(file);
  { 
    fieldname: 'inputViewName',
    originalname: 'musica.mp3',
    encoding: '7bit',
    mimetype: 'audio/mp3' 
  }
  */
    callback(null, file.originalname );
    //callback(null, file.fieldname + '-' + Date.now + '.mp3' );
  }

});


var upload = multer({ 
  storage : storage
}).single('inputViewName');


app.post('/api/uploadfile',function(req,res){
	
  upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});

});


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.listen(8080,function(){
    console.log("Working on port 8080");
});
