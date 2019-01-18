var app = angular.module('emgs', ['ngRoute']);
	//$scope.errorMessage = "";
	//$rootScope.loggedInUser = "";
	//$rootScope.groupId = "";
	app.controller('loginController', function($scope, $http){
		var loginData = {};
			$scope.submitForm = function(login) {
			loginData=angular.copy(login);
			var config = {
	                headers : {
	                    'Content-Type': 'application/json;charset=utf-8;'
	                }
	            }
			$http.post('https://sbd-eventmg.herokuapp.com/users/login', loginData, config).then(function mySuccess(response) {
								console(response.data);
								$rootScope.loggedInUser = response.data.id;
								$rootScope.groupId = response.data.group.id;
								$location.path('/events');
								//$scope.myWelcome = response.data;
							}, function myError(response) {
									$scope.myWelcome = response.statusText;
							});
			};
	});
	
	
	app.controller('eventController', function($scope, $http){
		
		//var $scope.events = [];
		
		$http.get('https://sbd-eventmg.herokuapp.com/events/'+$rootScope.groupId).then(function mySuccess(response) {
			$scope.events = response.data;
		}, function myError(response) {
				$scope.errorMessage = response.statusText;
		});

	});
	
	
app.config(function($routeProvider){
		$routeProvider.when("/", {
			templateUrl: './login.html',
			controller: 'loginController',
			access: { requiredLogin: false }
		}).when("/events", {
			templateUrl: "./events.html",
			controller: "eventController"
		}).otherwise({
			template: "Not available",
			redirectTo: '/'
		})
})