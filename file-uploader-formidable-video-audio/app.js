var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/play', function(req, res){
  res.sendFile(path.join(__dirname, 'views/play.html'));
});


app.post('/upload', function(req, res){

  var path_crear = __dirname + '/uploads/videos/';
  if (!fs.existsSync(path_crear)) {
    fs.mkdirSync(path_crear, 0744);
  }


  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});


/**  Reproducir videos

http://localhost:8080/perico.mp4  */
app.get('/:file(*)', function(req, res){

  var file = req.params.file
    , path_reproducir = __dirname + '/uploads/' + file;

  res.download(path_reproducir);
});


/**  Reproducir videos

http://localhost:8080/descarga/perico.mp4  */
app.get('/descarga/:param_nombre?', function(req, res){

  console.log("descarga");
  console.log(req.params.param_nombre);
  //console.log(req.params.file);

  var fileName = req.params.param_nombre
    , pathName = __dirname +'/uploads/' + fileName;

  res.download(pathName, fileName);  

  
});



var server = app.listen(8080, function(){
  console.log('Server listening on port 8080');
});
