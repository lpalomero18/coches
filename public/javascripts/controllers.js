'use strict';
angular.module("buscaCochesApp")
 .controller('CochesController', ['$scope', 'menuFactory', function($scope, menuFactory){

	$scope.tab=1;
	$scope.filtText = '';
	$scope.showDetails = false;

	$scope.coches = {};
	menuFactory.getCoches().then(
		function(response){
			$scope.coches=response.data;
			console.log($scope.coches);
		});

	$scope.select=function(setTab){
		$scope.tab=setTab;
		if (setTab === 2){
			$scope.filtText='appetizers';}
		else if (setTab === 3){
					$scope.filtText='mains';}
		else if (setTab === 4){
					$scope.filtText='desserts';}
		else {$scope.filtText = '';}
	};
	$scope.isSelected=function(checkTab){
		return ($scope.tab === checkTab);
	};
}])

	.controller('ContactController', ['$scope', function($scope){
		$scope.feedback = {mychannel:"", firstName:"d", lastName:"", agree:false,email:""};
		var channels=[{value:"tel",label:"Tel."},
					  {value:"Email", label:"Email"}];
		$scope.channels = channels;
		$scope.invalidChannelSelection = false;
	}])
	.controller('FeedbackController', ['$scope', function($scope){
//		$scope.sendFeedback = function()
	}])

;