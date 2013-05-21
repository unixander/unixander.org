connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()

module.exports =
	getLetters:(callback)->
		server('newsletters',(error,collection)->
			collection.find().sort({'time':-1}).toArray(callback)
			return
			)
		return

	getCount:(callback)->
		server('newsletters',(error,collection)->
			collection.find().count(callback)
			return
			)
		return

	getLetterById:(id,callback)->
		server('newsletters',(error,collection)->
			collection.findOne({'_id':new BSON.ObjectID(id)},callback).
			return
			)
		return

	addLetter:(data,callback)->
		server('newsletters',(error,collection)->
			collection.insert(data,{safe:true},callback)
			return
			)
		return

	deleteLetter:(id,callback)->
		server('newsletters',(error,collection)->
			collection.remove({'_id':id},{safe:true},callback)
			return
			)
		return

	updateLetter:(data,callback)->
		server('newsletters',(error,collection)->
			id = data._id
			delete data._id
			collection.update({'_id':new BSON.ObjectID(id)},data,{safe:true},callback)
			return
			)
		return
