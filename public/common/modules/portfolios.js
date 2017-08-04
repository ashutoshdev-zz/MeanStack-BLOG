
var portfoliosModule = angular.module('fwrk.portfolios', []);

portfoliosModule.service('Portfolios', function($http){
    

	return {
//		all: function(){
//			return $http.get('/api/pages').then(function(postList){
//				return postList.data;
//			});
//		},
//		add: function(newPost){
//			return $http({
//				method: 'post',
//				url: '/api/posts',
//				data: newPost
//			}).then(function(res){
//				// return the new post
//				return res.data;
//			}).catch(function(err){
//				console.error('Something went wrong adding the post!');
//				console.error(err);
//				return err;
//			});
//		},
//		remove: function(){
//
//		},
//		update: function(){
//
//		},
                all: function(){
		return $http.get('/api/all').then(function(all){
				return all.data;
			});
		},
                sendEmail: function(emaildata){
			return $http({
				method: 'post',
				url: '/api/sendEmail',
				data: emaildata
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the post!');
				console.error(err);
				return err;
			});
		},
	};
});