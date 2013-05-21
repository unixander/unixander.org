connection = require('./connection')
mongo = require('mongodb')

BSON = mongo.BSONPure

server = connection()
MAX_POSTS_PER_PAGE = 10

module.exports =

	getPosts: (data,callback)->
		server('posts',(error,collection)->
			collection.find().sort({'time':-1}).toArray(callback)
			return
			)
		return

	getPostById: (id, callback)->
		server('posts',(error,collection)->
			collection.findOne({'_id':new BSON.ObjectID(id)},callback)
			return
			)
		return

	getPostsTags:(callback)->
		server('posts',(error,collection)->
			collection.aggregate([{$project:{tag:1}},{$unwind:"$tag"},{$group:{_id:"",tags:{$addToSet:"$tag"}}}],callback)
			return
			)
		return

	getPostsByTag:(tag,callback)->
		server('posts',(error,collection)->
			collection.find({"tag":tag}).toArray(callback)
			return
			)
		return

	getPostsCount:(callback)->
		server('posts',(error,collection)->
			collection.find().count(callback)
			return
			)
		return

	getPostsPage:(page,callback)->
		server('posts',(error,collection)->
			collection.find().sort({'time':-1}).skip(MAX_POSTS_PER_PAGE*(page-1)).limit(MAX_POSTS_PER_PAGE).toArray(callback)
			return
			)
		return

	addPost:(data,callback)->
		server('posts',(error,collection)->
			collection.insert(data,{safe:true},callback)
			return
			)
		return

	deletePost:(id,callback)->
		server('posts',(error,collection)->
			collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},callback)
			return
			)
		return

	editPost:(data,callback)->
		server('posts',(error,collection)->
			id = data._id
			delete data._id
			collection.update({'_id':new BSON.ObjectID(id)},data,{safe:true},callback)
			return
			)
		return

	addComment:(id,data,callback)->
		server('posts',(error,collection)->
			collection.update({'_id':new BSON.ObjectID(id)},{$push:{"comments":data}},{safe:true},callback)
			return
			)
		return