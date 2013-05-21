'use strict';

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
Array.prototype.move = function(old_index, new_index) {
	if (new_index >= this.length) {
		var k = new_index - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	return this; // for testing purposes
};

function uaController($scope, $http, $location) {
	var url = $location.path();
}

function homePageController($scope, $http, $timeout, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#home').addClass('active');
	$scope.home = storage.get('home');
	$scope.saved = false;
	$scope.error = false;
	if (!$scope.home) $http.get('/pages/title/home').success(function(data) {
		if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
			$location.path("/login");
			return;
		}
		$scope.home = data[0];
		if (!$scope.home) {
			$scope.home = {
				title: "home",
				content: [{p:""}]
			};
		}
	});

	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	$scope.addP = function() {
		if (!$scope.home.content) $scope.home.content = [];
		$scope.home.content.push({p:""});
	};

	$scope.delP = function(i) {
		console.log(i);
		$scope.home.content.remove(i);
	};

	$scope.save = function() {
		console.log($scope.home.content);
		storage.set('home', $scope.home);
		$http.put('/pages', $scope.home).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set('home', '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}

function projectsPageController($scope, $http, $timeout, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#projects').addClass('active');
	$scope.projects = storage.get('projects');
	if (!$scope.projects) 
		$http.get('/pages/title/projects').success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.projects = data[0];
			if (!$scope.projects) {
				$scope.projects = {
					title: "projects",
					content: []
				};
			}
		});

	$scope.add = function() {
		$scope.projects.content.push({
			link: "newProject",
			name: "EmptyProject",
			images: [],
			website: []
		});
	};
	$scope.delImage = function(i, j) {
		$scope.projects.content[i].images.remove(j);
	};

	$scope.addImage = function(i) {
		if (!$scope.projects.content[i].images) $scope.projects.content[i].images = [];
		$scope.projects.content[i].images.push({});
	};
	$scope.del = function(i) {
		$scope.projects.content.remove(i);
	};

	$scope.addWebsite = function(i) {
		if (!$scope.projects.content[i].website) $scope.projects.content[i].website = [];
		$scope.projects.content[i].website.push({});
	};

	$scope.delWebsite = function(i, j) {
		$scope.projects.content[i].website.remove(j);
	};

	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();
	$scope.save = function() {
		storage.set('projects', $scope.projects);
		$http.put('/pages', $scope.projects).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set('projects', '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}


function cvPageController($scope, $http, $timeout, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#cv').addClass('active');
	$scope.cv = storage.get('cv');
	if (!$scope.cv) $http.get('/pages/title/cv').success(function(data) {
		if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
			$location.path("/login");
			return;
		}
		$scope.cv = data[0];
		if (!$scope.cv) {
			$scope.cv = {
				title: "cv",
				content: {
					contacts:[],
					education:[],
					language:[],
					skills:[],
					projects:{
						pet:[],
						contributor:[]
					}
				}
			};
		}
	});
	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();

	$scope.add = function(array, init) {

		if (init == undefined) array.push({});
		else array.push(init);
	};

	$scope.del = function(i, array) {
		array.remove(i);
	};
	$scope.save = function() {
		storage.set('cv', $scope.cv);
		$http.put('/pages', $scope.cv).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set('cv', '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}

function contactsPageController($scope, $http, $timeout, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#contacts').addClass('active');
	$scope.contacts = storage.get('sontacts');
	if (!$scope.contacts) $http.get('/pages/title/contacts').success(function(data) {
		if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
			$location.path("/login");
			return;
		}
		$scope.contacts = data[0];
		if (!$scope.contacts) {
			$scope.contacts = {
				title: "contacts",
				content: []
			};
		}
	});
	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();

	$scope.add = function(array, init) {
		if (init == undefined) array.push({});
		else array.push(init);
	}

	$scope.del = function(i, array) {
		array.remove(i)
	}
	$scope.save = function() {
		storage.set('contacts', $scope.contacts);
		$http.put('/pages', $scope.contacts).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set('contacts', '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}

function postsPageController($scope, $http, $timeout, $location) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#posts').addClass('active');
	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();
	$scope.add = function(array, init) {
		if (init == undefined) array.push({});
		else array.push(init);
	};

	$scope.del = function(i, array) {
		array.remove(i);
	};

	$http.get('/posts/count').success(function(data) {
		if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
			$location.path("/login");
			return;
		}
		$scope.pages = [];
		if (data.length > 10) {
			for (var i = 0, j = 1; i < data.length; i += 10, j++) {
				$scope.pages.push(j);
			}
		}
	});

	var page = new String($location.path());
	page = page.substring(page.lastIndexOf('/') + 1, page.length);
	if (isNaN(page)) page = "1";
	$http.get('/posts/page/' + page).success(function(data) {
		$scope.posts = data;
	});

	$scope.save = function() {
		$http.put('/posts', $scope.posts).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}

function singlePostController($scope, $http, $timeout, $location, dateFormat, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();
	$scope.add = function(array, init) {
		if (!array) array = [];
		if (init == undefined) array.push({});
		else array.push(init);
		console.log(array);
	};

	var page = new String($location.path());
	page = page.substring(page.lastIndexOf('/') + 1, page.length);
	$scope.post = {
		tag: [],
		comments: []
	};
	var post = storage.get('post');
	if (post) $scope.post = post;
	if (page != '0' && !post) {
		$http.get('/post/' + page).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.post = data;
		});
	}

	$scope.del = function(i, array) {
		array.remove(i);
	};

	$scope.remove = function() {

		$http.delete('/posts/' + $scope.post._id).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			$location.path("/posts");
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};

	$scope.save = function() {
		storage.set("post", $scope.post);
		if (page == '0') {
			$scope.post.time = dateFormat.now();
			$http.post('/posts', $scope.post).success(function(data) {
				if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
					$location.path("/login");
					return;
				}
				$scope.saved = true;
				$timeout(reset, 3000);
				storage.set("post", '');
			}).error(function() {
				$scope.error = true;
				$timeout(reset, 3000);
			});
		} else $http.put('/posts', $scope.post).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set("post", '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};
}


function questionsController($scope, $http, $timeout, $location, storage) {
	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#questions').addClass('active');
	var reset = function() {
		$scope.saved = false;
		$scope.error = false;
	};
	reset();

	$http.get('/questions/all/count').success(function(data) {
		if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
			$location.path("/login");
			return;
		}
		$scope.pages = [];
		if (data.length > 10) {
			for (var i = 0, j = 1; i < data.length; i += 10, j++) {
				$scope.pages.push(j);
			}
		}
	});

	var page = new String($location.path());
	page = page.substring(page.lastIndexOf('/') + 1, page.length);
	if (isNaN(page)) page = "1";
	var questions = storage.get('questions');
	if (questions) $scope.questions = questions;
	else getQuestions();

	function getQuestions() {
		$http.get('/questions/all/page/' + page).success(function(data) {
			$scope.questions = data;
		});
	}

	$scope.remove = function(q, id) {
		$http.delete('/questions/' + id).success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.questions.remove(q);
			$scope.saved = true;
			$timeout(reset, 3000);
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};

	$scope.save = function(i) {
		$scope.questions[i].answered = true;
		storage.set('questions', $scope.questions);
		$http.put('/questions', $scope.questions[i]).success(function(data) {
			if (data && typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.saved = true;
			$timeout(reset, 3000);
			storage.set('questions', '');
		}).error(function() {
			$scope.error = true;
			$timeout(reset, 3000);
		});
	};

	$scope.onQuestion = function(obj) {
		var e = '#' + obj.question._id;
		if ($(e).children(':first-child').next().is(":visible")) {
			$(e).children(':first-child').next().hide(500);
			$(e).animate({
				margin: "0",
				backgroundColor: '#DDDDDD'
			}, {
				duration: 500
			});
		} else {
			$(e).children(':first-child').next().show(500);
			$(e).animate({
				margin: "10px 0 10px 0",
				backgroundColor: '#FFFFFF'
			}, {
				duration: 500
			});
		}
	};
}


function StatisticsController($scope, $http, $location, $timeout) {
	$scope.data = [{
		content: "data",
		count: "1"
	}];


	$('ul.nav-list>li.active').removeClass('active');
	$('ul.nav-list>li#statistics').addClass('active');
	$scope.refresh = function() {
		$http.get('/server/statistics').success(function(data) {
			if (typeof(data)==String && data.indexOf("<!doctype html>") == 0) {
				$location.path("/login");
				return;
			}
			$scope.data = data;
		});
	};

	$scope.refresh();
}

function LoginController($scope) {
	$("#loginModal").modal('show');
}

function ErrorController($scope, $http, $location, $timeout) {

}