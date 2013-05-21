'use strict';

var admin = angular.module('admin',['ui','dateFormatter','LocalStorage']).
	config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
		$routeProvider.
			when('/',{
			    templateUrl: 'admin/tpl/home.html',
			    controller: homePageController
			}).
			when('/home', {
			    templateUrl: 'admin/tpl/home.html',
			    controller: homePageController
			}).
			when('/projects',{
				templateUrl: 'admin/tpl/projects.html',
				controller: projectsPageController
			}).
			when('/cv',{
				templateUrl: 'admin/tpl/cv.html',
				controller: cvPageController
			}).
			when('/contacts',{
				templateUrl: 'admin/tpl/contacts.html',
				controller: contactsPageController
			}).
			when('/posts',{
				templateUrl: 'admin/tpl/posts.html',
				controller: postsPageController
			}).
			when('/posts/:page',{
				templateUrl: 'admin/tpl/posts.html',
				controller: postsPageController
			}).
			when('/post/:id',{
				templateUrl: 'admin/tpl/singlepost.html',
				controller: singlePostController
			}).
			when('/questions',{
				templateUrl: 'admin/tpl/questions.html',
				controller: questionsController
			}).
			when('/404', {
			    templateUrl: 'admin/tpl/404.html',
			    controller: ErrorController
			}).
			when('/statistics',{
				templateUrl: 'admin/tpl/statistics.html',
				controller: StatisticsController
			}).
			when('/login',{
				templateUrl: 'admin/tpl/login.html',
				controller: LoginController
			})
			.otherwise({
			   redirectTo: '/404'
			});
	}]);


