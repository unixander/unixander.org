'use strict';

function uaController($scope,$http,$location){
	var url=$location.path();
	$('#loadingModal').modal({
		backdrop: true,
		keyboard: false
	});
	$scope.menu=[
	{ id:'home', title: "Home", url: "/" },
	{ id:'projects', title: "Projects", url: "/projects" },
	{ id:'cv', title: "CV", url: "/cv" },
	{ id:'blog', title: "Blog", url: "/blog"},
	{ id:'ask', title: "Ask a Question", url:"/ask"},
	{ id:'contacts', title: "Contacts", url:"/contacts"}
	];
	$scope.menuClick = function(e){
		$('#loadingModal').modal('show');
		var path='#'+e.item.url,
		id='#'+e.item.id;
		$('.side-nav>ul>li.active').removeClass('active');
		$('.side-nav>ul>li'+id).addClass('active');
		window.location = path;
	}
}

function homeController($scope,$http){
	$scope.home={};
	$('.side-nav>ul>li#home').addClass('active');
	$http.get('/pages/title/home').success(function(data){
		$scope.home.post=data[0].content;
		$('#loadingModal').modal('hide');
	});
}

function projectsController($scope,$http,$location){
	$scope.projects=[];
	$('.side-nav>ul>li#projects').addClass('active');
	$http.get('/pages/title/projects').success(function(data){
		$scope.projects=data[0];
		for(var i in $scope.projects.content){
			$scope.projects.content[i].link = $scope.projects.content[i].name.replace(/\s+/g,'')+i;
			if($scope.projects.content[i].images.length>0){
				$scope.projects.content[i].images[0].active="active";
			} 
		}
		$('#loadingModal').modal('hide');
	});
}

function cvController($scope,$http,$location){
	$scope.cv={};
	$('.side-nav>ul>li#cv').addClass('active');
	$http.get('/pages/title/cv').success(function(data){
		$scope.cv=data[0].content;
		$('#loadingModal').modal('hide');
	});
}

function contactsController($scope,$http,$location,$timeout){
	$('.side-nav>ul>li#contacts').addClass('active');
	$scope.contacts=[];
	$scope.msg={};
	$scope.sent=false;
	$scope.error=false;
	var reset = function(){
		$scope.msg={};
		$scope.sent=false;
		$scope.error=false;
		$scope.error=false;
	}

	$scope.sendMessage = function(){
		if($scope.msg.mail&&$scope.msg.from&&$scope.msg.text){
			$http.post('/contact/me',$scope.msg).success(function(){
				$scope.sent=true;
				$timeout(function(){
					reset();
				},6000);
			}).error(function(data, status, headers, config){
				$scope.error=true;
				$timeout(reset,6000);
			})
		}
	}
	$http.get('/pages/title/contacts').success(function(data){
		$scope.contacts=data[0];
		$('#loadingModal').modal('hide');
	});
}

function blogEntriesController($scope,$http,$location){
	$('.side-nav>ul>li#blog').addClass('active');
	$scope.posts=[];
	$scope.pages=[];
	var page=new String($location.path());
	page=page.substring(page.lastIndexOf('/')+1,page.length);
	$http.get('/posts/count').success(function(data){
		$scope.pages=[];
		if(data.length>10) {
			for(var i=0,j=1;i<data.length;i+=10,j++){
				$scope.pages.push(j);
			}
		}
	});
	if(isNaN(page)) page="1";
	$http.get('/posts/page/'+page).success(function(data){
		$scope.posts=data;
		$('#loadingModal').modal('hide');
	});

}

function blogTagsController($scope,$http,$location){
	$('.side-nav>ul>li#blog').addClass('active');
	$scope.posts=[];
	$scope.pages=[];
	var tag=new String($location.path());
	tag=tag.substring(tag.lastIndexOf('/')+1,tag.length);
	$http.get('/posts/tag/'+tag).success(function(data){
		$scope.posts=data;
		if(data.length>10) {
			for(var i=0,j=1;i<data.length;i+=10,j++){
				$scope.pages.push(j);
			}
		}
		$('#loadingModal').modal('hide');
	});
}

function questionsController($scope,$http,$location,$timeout,dateFormat){
	$('.side-nav>ul>li#ask').addClass('active');
	$scope.questions=[];
	$scope.pages=[];
	$scope.ask={};
	$scope.ask.sent=false;
	$scope.error={name:false,question:false,check:false};
	var page=new String($location.path());
	page=page.substring(page.lastIndexOf('/')+1,page.length);
	$http.get('/questions/page/'+page).success(function(data){
		$scope.questions=data;
		if(data.length>10) {
			for(var i=0,j=1;i<data.length;i+=10,j++){
				$scope.pages.push(j);
			}
		}
		$('#loadingModal').modal('hide');
	});

	var resetErrors = function() {
		$scope.error={name:false,question:false,check:false};
	}
	var reset = function (){
		$scope.ask={};
		$scope.ask.sent=false;
		resetErrors();
	}

	$scope.onQuestion = function(obj){
		var e = '#'+obj.question._id;
		if ($(e).children(':first-child').next().is(":visible")) {
			$(e).children(':first-child').next().hide(500);
			$(e).animate({
				margin : "0",
				backgroundColor : '#DDDDDD'
			}, {
				duration : 500
			})
			} else {
			$(e).children(':first-child').next().show(500);
			$(e).animate({
				margin : "10px 0 10px 0",
				backgroundColor : '#FFFFFF'
			}, {
					duration : 500
			})
		}
	}

	$scope.submitQuestion = function(){
		resetErrors();
		if($scope.ask.from.toLowerCase()=="unixander")
			$scope.ask.from = undefined;
		if(!$scope.ask.from)
			$scope.error.name = true;
		if(!$scope.ask.question)
			$scope.error.question = true;
		if(!$scope.ask.check)
			$scope.error.check = true;
		if(!$scope.error.question&&!$scope.error.check){
			var message = {
				from:$scope.ask.from||"%anonymous%",
				question:$scope.ask.question,
				time: dateFormat.now(),
				private:$scope.ask.private,
				reply_to:$scope.ask.reply_to
			}
			$http.post('/questions',message).success(function(){
				$scope.ask.sent = true;
				$('#askQuestionModal').modal('hide');
				$timeout(function(){
					reset();
				},6000);
			});
		}
	}

}

function blogPostController($scope,$http,$location,dateFormat){
	$('.side-nav>ul>li.active').removeClass('active');
	$scope.post={};
	$scope.error={};
	$scope.error.check=false;
	$scope.newComment={};
	$scope.content={};
	var path=new String($location.path());
	var id=path.substring(path.lastIndexOf('/')+1,path.length);
	$http.get('/post/'+id).success(function(data){
		$scope.post=data;
		$('#post_content').html($scope.post.content);
		$('#loadingModal').modal('hide');
	}).error(function(data, status, headers, config) {
	    console.log(status);
  	});

  	var reset = function(){
  		$scope.error={};
		$scope.error.check=false;
		$scope.newComment={};
  	}

  	$scope.addComment = function(){
  		if(!$scope.newComment.from){
  				$scope.error.from = true;
  				$scope.newComment.from="Anonymous";
  			}
  		if(!$scope.newComment.text)
  			$scope.error.comment = true;
  		if($scope.newComment.text && $scope.error.check){
  			$scope.newComment.time = dateFormat.now();
  			$http.post('/post/'+$scope.post._id+'/comments',$scope.newComment).success(function(){
  				$scope.post.comments.push($scope.newComment);
  				$('#addCommentModal').modal('hide');
  				reset();
  			})
  		}
  	}
}

function ErrorController($scope,$http,$location,$timeout){
		if(!$('#message404'))
		return;
		$('#loadingModal').modal('hide');
		$scope.message404 = ["Hello. This is 404 page.",
							  "And the page, you're looking for, doesn't exist. Sorry :`("] 
		$scope.endmessage = 0,
		$scope.lastmessage=0, 
		$scope.toprint="";
		$scope.print404 = function() {
			if($scope.endmessage>$scope.message404[$scope.lastmessage].length) {
				$scope.endmessage=0;
				$scope.lastmessage++;
				if($scope.lastmessage==$scope.message404.length)
					return;
				$scope.toprint+="</br>";
			}
			$scope.toprint+=$scope.message404[$scope.lastmessage].charAt($scope.endmessage);
			$('#message404').html($scope.toprint);
			$scope.endmessage++;
			if ($('#message404') && $scope.lastmessage <= $scope.message404.length)
				$timeout($scope.print404, 100);
			}
		$timeout($scope.print404, 100);
}

