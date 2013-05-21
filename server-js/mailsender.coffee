email = require('emailjs/email')


exports.send = (message,callback)->
	details = 
	   user:    	"mail@example.com"
	   password:	"somepassword"
	   host:    	"smtp.gmail.com"
	   ssl:     	true

	server = email.server.connect(
		details
		)
	msg =
		text: message.text
		from: message.from || details.user
		to: message.to
		cc: message.cc || ""
		subject: message.subject || "No subject"
	server.send(msg,callback)
	return
