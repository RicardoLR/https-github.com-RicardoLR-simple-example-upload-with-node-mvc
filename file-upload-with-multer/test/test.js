var should = require('should');
var supertest = require('supertest');

var server = supertest.agent('http://localhost:3000');

describe('Cargando un archivo de video',function(){
	it('should upload file', function(done){
		
		server
			.post('/api/uploadfile')
			.field('filename', 'test file')
			.attach('file', 'test/test.mp4')
			.expect(200)
			.end(function(err,res){
				res.status.should.equal(200)
				done();
			});
	});
});
