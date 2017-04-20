var mongoclient=require('mongodb').MongoClient,
	assert=require('assert');
var express= require("express"),
	app=express(),
	engines=require('consolidate');

app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname+'/views');
	
	mongoclient.connect('mongodb://localhost:27017/video',function(err,db)
	{
		assert.equal(null,err);
		console.log("Successfully connected to the server");
		
		app.get('/',function(req,res){
			db.collection('movies').find({}).toArray(function(err,docs){
			res.render('movies',{'movies':docs});
		});
		});
		
		app.use(function(req,res){
			res.sendStatus(404);
		});
		
		var server=app.listen(3000,function()
		{
			var port=server.address().port;
			console.log('Express server is running on port %s',port);
		});

	});