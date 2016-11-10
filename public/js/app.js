angular.module("legislationSearchApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    legislation: function(Legislation) {
                        return Legislation.getLegislation();
                    }
                }
            })
            .when("/legislation/:actId", {
                controller: "ViewActController",
                templateUrl: "actView.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Legislation", function($http) {
        this.getLegislation = function() {
            return $http.get("/legislation").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding legislation.");
                });
        }
        this.getAct = function(actId) {
            var url = "/legislation/" + actId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this act.");
                });
        }
    })
    .controller("ListController", function(legislation, $scope) {
        $scope.legislation = legislation.data;
    })
    .controller("ViewActController", function($scope, $routeParams, Legislation) {
        Legislation.getAct($routeParams.actId).then(function(doc) {
            $scope.act = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }
    });