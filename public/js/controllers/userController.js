angular.module('myApp')
  .controller('userController', ['$scope' , '$window', 'UserService', function($scope, $window, UserService) {
    $scope.user = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        user_role:''
      };

      $scope.createUser = function(){
        newUser ={
          firstName:$scope.user.firstName,
          lastName:$scope.user.lastName,
          email:$scope.user.email,
          password:$scope.user.password,
          user_role:$scope.user.user_role,
          project_id: "1"
        };

        UserService.createUser(newUser)
        .then(user => {
          $scope.user.firstName = '';
          $scope.user.lastName = '';
          $scope.user.email = '';
          $scope.user.password = '';
          $scope.user.user_role = '';
        });
      };


      $scope.loggedInUserName = localStorage.getItem('loggedInUserName');
      $scope.user = { email: '' };
      $scope.login = function () {
        UserService.login($scope.user)
        .then(function (response) {
          localStorage.removeItem('loggedInUserName');
          localStorage.setItem('loggedInUserName', response.firstName);
          localStorage.removeItem('loggedInUserName');
          localStorage.setItem('loggedInUserName',response.firstName);
          window.location.href = '/';
        });
      };


       $scope.logout = function () {
          localStorage.removeItem('loggedInUserName');
          localStorage.setItem('loggedInUserName', '');
          window.location.href = '/login';
      };


}]);