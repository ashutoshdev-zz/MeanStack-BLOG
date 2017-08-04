/**
 * NavCtrl
 * @param {type} param1
 * @param {type} param2
 */
adminApp.controller('NavCtrl', function($scope, $state) {
    $scope.active = $state;
    $scope.isActive = function(viewLocation) {
        var active = (viewLocation === $state.current.name);
        return active;
    };
})
/**
 * AllPostsCtrl
 */
adminApp.controller('AllPostsCtrl', function($scope, postList,Posts,$location) {
    $scope.posts = postList;
    $scope.activePost = false;
    $scope.setActive = function(post) {
        $scope.activePost = post;
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Posts.remove($scope.data).then(function(res) {
           // console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
})
/**
 * EditPostsCtrl
 */
adminApp.controller('EditPostsCtrl', function($scope, Posts, $stateParams) {
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Posts.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            // console.log(res);
            $scope.post.description = res.description;
            $scope.post.himage = res.himage;
            $scope.post.simage = res.simage;
            $scope.post.title = res.title;
            $scope.post.paramal = res.paramal;
            $scope.post.metadescription = res.metadescription;
            $scope.post.metakeywords = res.metakeywords;
            $scope.post.id = res._id;
        }
    });
    $scope.editPost = function() {

        $scope.newPost = {};
        $scope.newPost.simage = this.post.simage;
        $scope.newPost.himage = this.post.himage;
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.metadescription = this.post.metadescription;
        $scope.newPost.metakeywords = this.post.metakeywords;
        $scope.newPost.paramal = this.post.paramal;
        $scope.newPost.id = this.post.id;
        Posts.update($scope.newPost).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
})
/**
 * AddPostCtrl
 */
adminApp.controller('AddPostCtrl', function($scope, Posts) {
    $scope.post = {};
    function shuffle(array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    ;

    $scope.addPost = function() {
        // console.log(this.post);
        $scope.s_city = this.post.city.split(',');
        $scope.s_title = this.post.title;
        $scope.s_param = this.post.paramal;
        $scope.s_description = this.post.description;
        $scope.s_metadescription = this.post.metadescription;
        $scope.s_metakeywords = this.post.metakeywords;
        $scope.keywords = this.post.keywords.split(',');
        $scope.simage = this.post.simage;
        $scope.himage = this.post.himage;

        for (var i in $scope.s_city) {
            $scope.newPost = {};


            $scope.newPost.simage = $scope.simage;
            $scope.newPost.himage = $scope.himage;


//            // title    
            $scope.f_title = $scope.s_title.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.title = $scope.f_title;
//            // param
            $scope.f_param = $scope.s_param.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.paramal = $scope.f_param;
            //description
            $scope.f_description = $scope.s_description.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.description = $scope.f_description;
            //metadescription
            $scope.f_metadescription = $scope.s_metadescription.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.metadescription = $scope.f_metadescription;
            //metakeywords
            $scope.f_metakeywords = $scope.s_metakeywords.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.metakeywords = $scope.f_metakeywords;
//            // add keyworrs
            $scope.k_description = $scope.newPost.description;

            $scope.shuffled = shuffle($scope.keywords);
            $scope.count = $scope.k_description.match(/{keywords}/gi).length;
            for (var k = 0; k <= $scope.count; k++) {
                for (var j in $scope.shuffled) {
                    $scope.m_description = $scope.newPost.description;
                    $scope.l_description = $scope.m_description.replace('{keywords}', $scope.shuffled[j]);
                    $scope.newPost.description = $scope.l_description;
                }
            }
            console.log($scope.newPost);
            Posts.add($scope.newPost).then(function(res) {
                console.log(res);
            });

            // Posts.add($scope.newPost);
            this.post = {};
        }


    };


});