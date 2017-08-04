
var adminApp = angular.module('fwrk.admin', [
	'ui.router',
	'btford.markdown',
	'fwrk.posts'
]);

adminApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('allPosts', {
			url: '/',
			templateUrl: '/admin/templates/allPosts.html',
			resolve: {
				postList: function(Posts){
					return Posts.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'AllPostsCtrl'
		})
		.state('addPost', {
			url: '/addPost',
			templateUrl: '/admin/templates/addPost.html',
			controller: 'AddPostCtrl'
                        
		})
                 .state('editPost', {
			url: '/editPost/:paraml',
			templateUrl: '/admin/templates/editPost.html',
			controller: 'EditPostsCtrl'
		});
                 
                
});

