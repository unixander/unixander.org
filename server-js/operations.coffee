posts = require('./posts')
users = require('./user')
pages = require('./pages')
newsletters = require('./newsletter')
mailsender = require('./mailsender')
subscribers = require('./subscribers')
questions = require('./questions')
init = require('./init')
Step = require('step')
#Operations with posts

exports.getPostsPage = (req,res)->
	page = req.params.page
	posts.getPostsPage(page,(err,items)->
		if err
			res.send({code:1,message:err})
		else
			res.send(items)
		return
		)
	return

exports.getPostById = (req,res)->
	id = req.params.id 
	posts.getPostById(id,(err,data)->
		if err 
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getPostsByTag = (req,res)->
	tag = req.params.tag
	posts.getPostsByTag(tag,(err,data)->
		if err 
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getPostsCount = (req,res)->
	posts.getPostsCount((err,data)->
		if err 
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getPostsTags = (req,res) ->
	posts.getPostsTags((err,data)->
		if err 
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return


exports.addPost = (req,res)->
	post = req.body
	posts.addPost(post,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.addComment = (req,res)->
	comment = req.body
	id = req.params.id 
	posts.addComment(id,comment,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return


exports.deletePost = (req,res)->
	id = req.params.id 
	posts.deletePost(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.updatePost = (req,res)->
	data = req.body
	posts.editPost(data,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return


#Operations with users

exports.getUserById = (req,res)->
	id = req.params.id 
	users.getUserById(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.findUser = (req,res)->
	login = req.params.login
	users.findUser(login,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

#Operations with pages
exports.getPages = (req,res)->
	pages.getPages((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getPageById = (req,res)->
	id = req.params.id 
	pages.getPageById(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getPageByTitle = (req,res)->
	title= req.params.title
	pages.getPageByTitle(title,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.addPage = (req,res)->
	page = req.body
	pages.addPage(page,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.updatePage = (req,res)->
	page = req.body
	pages.updatePage(page,(err,data)->
		console.log(err)
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.deletePage = (req,res)->
	id = req.params.id 
	pages.deletePage(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

#Operations with newsletters

exports.getLetters = (req,res)->
	newsletters.getLetters((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getLettersCount = (req,res)->
	newsletters.getCount((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getLetterById = (req,res)->
	id = req.params.id
	newsletters.getLetterById(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.addLetter = (req,res)->
	letter = req.body
	newsletters.addLetter(letter,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.deleteLetter = (req,res)->
	id = req.params.id 
	newsletters.deleteLetter(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.updateLetter = (req,res)->
	letter = req.body
	newsletters.updateLetter(letter,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

#Operations with questions

exports.getQuestionsCount = (req,res)->
	questions.getCount((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getQuestionsAllCount = (req,res)->
	questions.getAllCount((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getQuestionsAllPage = (req,res)->
	page = req.params.page
	questions.getAllPage(page,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return
	
exports.getQuestionsPage = (req,res)->
	page = req.params.page
	questions.getPage(page,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getQuestionById = (req,res) ->
	id = req.params.id 
	questions.getQuestionById(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.addQuestion = (req,res) ->
	question = req.body
	questions.addQuestion(question,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.deleteQuestion= (req,res)->
	id = req.params.id
	questions.deleteQuestion(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.updateQuestion = (req,res)->
	question = req.body
	questions.updateQuestion(question,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

#Operations with subscribers

exports.getSubscribers = (req,res)->
	subscribers.getSubscribers((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.getSubscribersCount = (req,res) ->
	subscribers.getCount((err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(data)
		return
		)
	return

exports.addSubscriber = (req,res)->
	data = req.body
	subscribers.addSubscriber(data,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.deleteSubscriber = (req,res)->
	id = req.params.id
	subscribers.deleteSubscriber(id,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return

exports.updateSubscriber = (req,res)->
	data = req.body
	subscribers.updateSubscriber(data,(err,data)->
		if err
			res.send({code:1,message:err})
		else
			res.send(200)
		return
		)
	return
#Operations with mailsender
exports.sendMail = (req,res)->
	param = req.body
	console.log(param)
	message = 
		text: param.text
		from: param.mail
		to: "unixander@gmail.com"
		subject:(param.title||"")+' from '+param.from

	mailsender.send(message,(err)->
		return
		)
	res.send(200)
	return

exports.getServerStatistics = (req,res)->
	res.send("OK")
	return

exports.init = (req,res)->
	init.run((err)->
		res.send(err)
		return
		)
	return 