connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()

module.exports =
	getUserById:(id,callback)->
		server('users',(error,collection)->
			collection.findOne({'_id':new BSON.ObjectID(id)},callback)
			return
			)
		return

	findUser:(login,callback)->
		console.log(login)
		server('users',(error,collection)->
			collection.findOne({'login':login},callback)
			return
			)
		return
	