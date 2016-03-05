console.log("I'm running");

//var app = angular.module("myApp", ['btford.socket-io'])
var app = angular.module("myApp", [])

.factory('socketIO', function () {

    var socket = io("https://xfactoryyc.herokuapp.com");
    //var socket = io("localhost:1337");  // Use for localhost
    return socket;
});

app.controller("myCtrl", function($scope, socketIO) {
    $scope.myString = "Hello";
    $scope.ret = "";


    $scope.emit = function() {
      alert("send hello");
      socketIO.emit('sendMsg', $scope.myString);
    }   

    socketIO.on('receiveMsg', function(ret) {
      $scope.$apply(function(){
        //$scope.ret = JSON.stringify(ret);
        $scope.ret = JSON.parse(ret);
        var answer = JSON.parse($scope.ret.answer);

        $scope.myString = $scope.myString + " " + ret;
      });
    });


});
