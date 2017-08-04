/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MainCtrl', function ($scope,Portfolios) {
      Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);                  
        }
    });
    
//    $scope.contactus=function(form){
//         console.log(form);
//   Portfolios.sendEmail(form).then(function(res) {
//                console.log(res);
//            });   
//    }

  })
    