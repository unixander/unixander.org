connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()

module.exports =
	getPages:(callback)->
		server('pages',(error,collection)->
			collection.find().toArray(callback)
			return
			)
		return

	getPageById:(id,callback)->
		server('pages',(error,collection)->
			collection.findOne({'_id':new BSON.ObjectID(id)},callback)
			return
			)
		return

	getPageByTitle:(title,callback)->
		server('pages',(error,collection)->
			collection.find({'title':title}).toArray(callback)
			return
			)
		return

	addPage:(page,callback)->
		server('pages',(error,collection)->
			collection.insert(page,{safe:true},callback)
			return
			)
		return

	updatePage:(page,callback)->
		server('pages',(error,collection)->
			id = page._id
			if !id
				collection.insert(page,{safe:true},callback)
				return
			delete page._id
			collection.update({'_id':new BSON.ObjectID(id)},page,{safe:true},callback)
			return
			)
		return

	deletePage:(id,callback)->
		server('pages',(error,collection)->
			collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},callback)
			return
			)
		return