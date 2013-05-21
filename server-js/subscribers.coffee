connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()

module.exports =
	getSubscribers:(callback)->
		server('subscribers',(error,collection)->
			collection.find({'verified':true}).toArray(callback)
			return
			)
		return

	getCount:(callback)->
		server('subscribers',(error,collection)->
			collection.find().count(callback)
			return
			)
		return

	addSubscriber:(data,callback)->
		server('subscribers',(error,collection)->
			collection.insert(data,{safe:true},callback)
			return
			)
		return

	deleteSubscriber:(id,callback)->
		server('subscribers',(error,collection)->
			collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},callback)
			return
			)
		return

	updateSubscriber:(data,callback)->
		server('subscribers',(error,collection)->
			id = data._id
			delete data._id
			collection.update({'_id':id},{safe:true},callback)
			return
			)
		return

	getUnverified:(callback)->
		server('subscribers',(error,collection)->
			collection.find({'verified':false}).toArray(callback)
			return
			)
		return
