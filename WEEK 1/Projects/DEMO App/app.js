var mongoclient=require('mongodb').MongoClient,
	assert=require('assert');
	
	mongoclient.connect('mongodb://localhost:27017/video',function(err,db)
	{
		assert.equal(null,err);
		console.log("Successfully connected to the server");
		db.collection('movies').find({}).toArray(function(err,docs)
		{
			docs.forEach(function(doc)
			{
				console.log(doc.title);
			});
			db.close();
		});
		console.log("Called find()");
	});