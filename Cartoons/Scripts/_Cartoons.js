var myApp = angular.module('myApp', ['ngRoute']);
var URL = "https://mahopaavengers.firebaseio.com/.json";
myApp.config(function ($routeProvider) {
    $routeProvider.when("/",
        {
            templateUrl: "/Views/home.html",
            controller: "myCtrl"
        }).when("/detail/:key",
        {
            templateUrl: "/Views/detail.html",
            controller: "myCtrl"
        }).otherwise(
        {
            redirectTo: function () {
                return "/";
            }
        });

});

myApp.controller('myCtrl', function ($scope, $http, $routeParams) {
    $scope.Characters = [];
    if ($routeParams.key) {
        $scope.selected = $routeParams.key;
        
    };
    $scope.addCharacter = function (name, cartoon, pic) {
        var character = { name: name, cartoon: cartoon, picture: pic };
        $scope.name = "";
        $scope.cartoon = "";
        $scope.pic = "";
        $http
        .post(URL, character)
        .success(function (data) {
            alert(JSON.stringify(data));
            character.key = data.name;
            $scope.Characters.push(character);
        })
        .error(function (data) {
        });
    };
    $scope.getCharacters = function () {
        $http.get(URL)
            .success(function (data) {
                if (data != "null") {
                    for (var x in data) {
                        var c = data[x];
                        c.key = x;
                        $scope.Characters.push(c);
                    }
                }
            })
            .error(function () { });
    };
    $scope.getCharacters();
})