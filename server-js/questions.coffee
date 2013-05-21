connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()

MAX_PER_PAGE = 10

module.exports =
	getCount:(callback)->
		server('questions',(error,collection)->
			collection.find({'answered':true}).count(callback)
			return
			)
		return
	getAllCount:(callback)->
		server('questions',(error,collection)->
			collection.find().count(callback)
			return
			)
		return

	getAllPage:(page,callback)->
		server('questions',(error,collection)->
			collection.find().sort({'time':-1}).skip(MAX_PER_PAGE*(page-1)).limit(MAX_PER_PAGE).toArray(callback)
			return
			)
		return
	getPage:(page,callback)->
		server('questions',(error,collection)->
			collection.find({'answered':true}).sort({'time':-1}).skip(MAX_PER_PAGE*(page-1)).limit(MAX_PER_PAGE).toArray(callback)
			return
			)
		return

	getAnswered:(callback)->
		server('questions',(error,collection)->
			collection.find({'answered':true}).toArray(callback)
			return
			)
		return

	getNonAnsPage:(page,callback)->
		server('questions',(error,collection)->
			collection.find({'answered':false}).sort({'time':-1}).skip(MAX_PER_PAGE*(page-1)).limit(MAX_PER_PAGE).toArray(callback)
			return
			)
		return

	getNonAnsCount:(callback)->
		server('questions',(error,collection)->
			collection.find({'answered':false}).count(callback)
			return
			)
		return

	getUnanswered:(callback)->
		server('questions',(error,collection)->
			collection.find({'answered':false}).toArray(callback)
			return
			)
		return

	getQuestionById:(id, callback)->
		server('questions',(error,collection)->
			collection.findOne({'_id':new BSON.ObjectID(id)},callback)
			return
			)
		return

	addQuestion:(data,callback)->
		server('questions',(error,collection)->
			collection.insert(data,{safe:true},callback)
			return
			)
		return

	deleteQuestion:(id,callback)->
		server('questions',(error,collection)->
			collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},callback)
			return
			)
		return

	updateQuestion:(data,callback)->
		server('questions',(error,collection)->
			id = data._id
			delete data._id
			collection.update({'_id':new BSON.ObjectID(id)},data,{safe:true},callback)
			return
			)
		return

