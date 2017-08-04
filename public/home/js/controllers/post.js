/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('PostCtrl', function($scope, Posts, Pages,Portfolios, $location) {
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    
    Posts.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.description = res.description;
            $scope.himage = res.himage;
            $scope.simage = res.simage;
            $scope.title = res.title;
        }
    });
    Pages.singlepost().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
           // console.log(res);
                    $scope.single_name=res.name;
                    $scope.single_desc=res.description;
                    $scope.single_image=res.image;
                    $scope.single_dest=res.designation;                      
        }
    });
     Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);
                     
        }
    });
});