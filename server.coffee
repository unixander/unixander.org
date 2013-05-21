express = require('express')
path = require('path')
http = require ('http')
passport = require('passport')
LocalStrategy = require('passport-local').Strategy;
flash = require('connect-flash')
users = require('./server-js/user')
operations = require('./server-js/operations')
ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
crypto = require('crypto')
shasum = crypto.createHash('sha1')

passport.serializeUser((user, done) ->
	done(null, user._id);
	return
);
 
passport.deserializeUser((id, done) ->
	users.getUserById(id,(err,user)->
		done(err,user)
		return
		)
	return
);

passport.use(new LocalStrategy(
	{}=
		usernameField:'login',
	(login,password,done) ->
		process.nextTick(()->
			users.findUser(login,(err,user) ->
				console.log(login)
				if err
					return done(err)
				if !user 
					return done(null,false, {message:'Incorrect username'})
				shasum.update(password)
				if shasum.digest('hex') != user.password
					return done(null,false,{message:'Incorrect password'})
				return done(null,user)
				)
			return
			)
		return
	));

ensureAuthenticated = (req, res, next)->
	if req.isAuthenticated()
		return next()
	res.redirect('/login')
	return

app = express()

app.configure(()->
	app.set('port',process.env.PORT||3000||process.env.VCAP_APP_PORT)
	app.use(express.logger('dev'))
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(flash())
	app.use(express.session({ secret: 'somesecretkey' }));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(passport.initialize())
	app.use(passport.session())
	app.use("/",express.static(path.join(__dirname+'/public')))
	app.use('/admin', ensureAuthenticated);
	app.use("/admin",express.static(path.join(__dirname+'/private')))
	return
	)

app.get('/',(req,res)->
	res.sendfile('public/index.html')
	return
	)

app.get('/admin',ensureAuthenticated,(req,res)->
	req.session.cookie.maxAge = 3600000
	res.sendfile("private/index.html")
	console.log("Hello admin!")
	return
	)

sitePaths = ['/404','/blog','/contacts','/ask','/cv','/projects']

app.get(sitePaths,(req,res)->
	res.sendfile("public/index.html")
	return
	)

app.get('/login',(req,res)->
	res.sendfile('public/login.html')
	return
	)

app.post('/login',passport.authenticate('local',{
	successReturnToOrRedirect:'/admin',
	failureRedirect:'/login'
	}),
	(req,res)->
		res.redirect('/')
		return
	)

app.get('/logout', (req, res)->
  req.logout()
  res.redirect('/')
  return
)

#Posts queries
app.get('/posts/page/:page',operations.getPostsPage)
app.get('/post/:id',operations.getPostById)
app.get('/posts/tag/:tag',operations.getPostsByTag)
app.get('/posts/count',operations.getPostsCount)
app.get('/posts/tags',operations.getPostsTags)
app.post('/post/:id/comments',operations.addComment)

#Pages queries
app.get('/pages',operations.getPages)
app.get('/pages/:id',operations.getPageById)
app.get('/pages/title/:title',operations.getPageByTitle)

#Questions queries
app.get('/questions/page/:page',operations.getQuestionsPage)
app.get('/questions/count',operations.getQuestionsCount)
app.get('/question/:id',operations.getQuestionById)
app.post('/questions',operations.addQuestion)

#Subscribers queries
app.post('/subscribers',operations.addSubscriber)

#Mail
app.post('/contact/me',operations.sendMail)


#Admin operations 
##Post queries
app.post('/posts',ensureAuthenticated,operations.addPost)
app.put('/posts',ensureAuthenticated,operations.updatePost)
app.delete('/posts/:id',ensureAuthenticated,operations.deletePost)


##Pages queries
app.post('/pages',ensureAuthenticated,operations.addPage)
app.put('/pages',ensureAuthenticated,operations.updatePage)
app.delete('/pages/:id',ensureAuthenticated,operations.deletePage)


##Subcribers queries
app.get('/subscribers',ensureAuthenticated,operations.getSubscribers)
app.get('/subscribers/count',ensureAuthenticated,operations.getSubscribersCount)
app.put('/subscriber',ensureAuthenticated,operations.updateSubscriber)
app.delete('/subscribers/:id',ensureAuthenticated,operations.deleteSubscriber)


##Newsletters queries
app.get('/newsletters',ensureAuthenticated,operations.getLetters)
app.get('/newsletters/count',ensureAuthenticated,operations.getLettersCount)
app.get('/newsletters/:id',ensureAuthenticated,operations.getLetterById)
app.post('/newsletters',ensureAuthenticated,operations.addLetter)
app.put('/newsletters',ensureAuthenticated,operations.updateLetter)
app.delete('/newsletters/:id',ensureAuthenticated,operations.deleteLetter)


##Question queries
app.delete('/questions/:id',ensureAuthenticated,operations.deleteQuestion)
app.get('/questions/all/count',ensureAuthenticated,operations.getQuestionsAllCount)
app.get('/questions/all/page/:page',ensureAuthenticated,operations.getQuestionsAllPage)
app.put('/questions',ensureAuthenticated,operations.updateQuestion)
app.get('/server/statistics',ensureAuthenticated,operations.getServerStatistics)
app.get('/server/initconfig',operations.init)

app.get('/*',(req,res)->
	res.sendfile('public/index.html')
	return
	)

http.createServer(app).listen(app.get('port'),()->
	console.log("Server started successfully")
	return
	)


