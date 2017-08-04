
var app = angular.module('fwrk.home', [
	'ui.router',
        'fwrk.posts',
        'fwrk.pages',
        'fwrk.portfolios'
])
.factory('Page', function() {//now this is not working 
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
})
.controller('TitleCtrl', function($scope, Page) {
    $scope.Page = Page;
})

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "/home/templates/index.html",
			controller: 'MainCtrl'
		})
                .state('post', {
			url: "/*",
			templateUrl: "/home/templates/post.html",
			controller: 'PostCtrl'
		});

	$urlRouterProvider.otherwise("/");
});