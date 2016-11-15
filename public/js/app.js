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
            .when("/act/:actId", {
                templateUrl: "act_view.html",
                controller: "ViewActController"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Legislation", function($http) {
        this.getLegislation = function() {
            console.log("getting list of legislation");
            return $http.get("/legislation").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding legislation.");
                });
        }
        this.getAct = function(actId) {
            console.log("getting act text");
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
    });

    // .controller("ViewActController", function(act, $scope) {
    //     $scope.act = act.data;
    // });

    //     $scope.back = function() {
    //         $scope.editMode = false;
    //         $scope.contactFormUrl = "";
    //     }
    // });