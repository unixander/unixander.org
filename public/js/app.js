'use strict';

var unixander_org=angular.module('unixander_org',['dateFormatter']).
	config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
		$routeProvider.
			when('/', {
			    templateUrl: 'tpl/home.html',
			    controller: homeController
			}).
			when('/projects', {
			    templateUrl: 'tpl/projects.html',
			    controller: projectsController
			}).
			when('/cv', {
			    templateUrl: 'tpl/cv.html',
			    controller: cvController
			}).
			when('/blog', {
			    templateUrl: 'tpl/blog.html',
			    controller: blogEntriesController
			}).
			when("/blog/:page", {
			    templateUrl: 'tpl/blog.html',
			    controller: blogEntriesController
			}).
			when("/blog/tag/:tag",{
				templateUrl: 'tpl/blog.html',
				controller:blogTagsController

			}).
			when('/blog/post/:id', {
			    templateUrl: 'tpl/post.html',
			    controller: blogPostController
			}).
			when('/contacts', {
			    templateUrl: 'tpl/contact.html',
			    controller: contactsController
			}).
			when('/ask', {
			    templateUrl: 'tpl/questions.html',
			    controller: questionsController
			}).
			when('/ask/:page', {
			    templateUrl: 'tpl/questions.html',
			    controller: questionsController
			}).
			when('/404', {
			    templateUrl: 'tpl/404.html',
			    controller: ErrorController
			})
			    .otherwise({
			    redirectTo: '/404'
			});
	}]);


