    var app = angular.module('sigfigFE', ["ngRoute"]);

    /** Configs **/
    var api = 'http://localhost:3001';
    var personId = '';

    //Factory to get all companies
    app.factory('getCompanies', function ($http) {
        return {
            async: function () {
                return $http.get(api + '/Companies').then(function (response) {
                    return response.data;
                });
            }
        };
    });


    //Route Provider for all views
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "view/allCompanies.html"
            })
            .when("/Companies/:id", {
                templateUrl: "view/viewCompany.html"
                // controller: 'getComp'
            })
            .when("/Companies/:companyId/people", {
                templateUrl: "view/viewPeople.html"
                // controller: 'getPeople'
            })
            //put /companies/:id
            .when("/Companies/:companyId/edit", {
                templateUrl: "view/editCompany.html"
            })
            //put '/person/:id
            .when("/Companies/:id/person/edit", {
                templateUrl: "view/editPerson.html"
            })
    });

    // New component for creating new Company and Person
    app.component('createNew', {
        templateUrl: 'view/createNewData.html'
    });


    /** Companies/Company Controllers **/

    //Get All  Companies
    app.controller('getComps', function (getCompanies, $scope) {
        getCompanies.async().then(function (response) {
            $scope.comps = response;

            $scope.getCompanyID = function (id) {
                return $scope.id = id;
            }
        });
    });


    //Get a single company
    app.controller('getComp', function ($scope, $http) {

        $http.get(api + '/Companies/' + $scope.id).then(function (response) {
            $scope.companyData = response.data;

        });
    });


    //Creating new companies
    app.controller('createNewComp', function ($scope, $http, $location) {
        $scope.saveComp = function () {
            var newCompData = {
                name: $scope.compName,
                address: $scope.compAddress,
                revenue: $scope.compRev,
                phone: $scope.compPhone
            };

            var config = {
                headers: {'Content-Type': 'application/json'}
            };

            $http.post(api + '/Companies', newCompData, config)
                .then(function (response) {
                    $scope.comps = response.data;
                    $location.path('/');

                });


            $scope.compName = "";
            $scope.compAddress = "";
            $scope.compRev = "";
            $scope.compPhone = "";


        };

    });

    /** People/Person Controllers **/

    //Get people that works for a certain company
    app.controller('getPeople', function ($scope, $http) {
        $http.get(api + '/Companies/' + $scope.id + '/people').then(function (response) {
            $scope.people = response.data;

            //get person id
            $scope.getPersonID = function (id) {
                return personId = id;
            }

        });
    });


    //Update a single company
    app.controller('updateCompany', function ($scope, $http, $location) {

        $scope.saveCompUpdate = function () {
            var newCompData = {
                name: $scope.updateCompName,
                address: $scope.updateCompAddress,
                revenue: $scope.updateCompRev,
                phone: $scope.updateCompPhone
            };

            var config = {
                headers: {'Content-Type': 'application/json'}
            };

            $http.put(api + '/Companies' + $scope.id, newCompData, config)
                .then(function (response) {
                    $scope.comps = response.data;
                    $location.path('/');

                });


            $scope.compName = "";
            $scope.compAddress = "";
            $scope.compRev = "";
            $scope.compPhone = "";


        };

    });


    //Get a single Person
    app.controller('getPerson', function ($scope, $http) {


        $http.get(api + '/Person/' + personId).then(function (response) {
            $scope.person = response.data;
            console.log($scope.person);

        });
    });

    // Update Person Method
    // passed in getCompanies factory function to populate company dropdown
    app.controller('updatePerson', function (getCompanies, $scope, $http) {

        getCompanies.async().then(function (response) {
            $scope.companyDetail = response;
            $scope.perCompId = $scope.companyDetail[0];

            $scope.savePerUpdate = function () {
                var newPerData = {
                    name: $scope.toUpdateName,
                    companyId: $scope.perCompId,
                    email: $scope.toUpdateEmail

                };

                var config = {
                    headers: {'Content-Type': 'application/json'}
                };

                console.log(newPerData);
                $http.put(api + '/Person/' + personId, newPerData, config)
                    .then(function (response) {
                        $scope.people = response.data;

                    });

            };
        });
    });


    //Creating a new person
    app.controller('createNewPer', function (getCompanies, $scope, $http) {

        getCompanies.async().then(function (response) {
            $scope.companyDetail = response;
            $scope.perCompId = $scope.companyDetail[0];

            $scope.savePer = function () {
                var newPerData = {
                    name: $scope.perName,
                    companyId: $scope.perCompId,
                    email: $scope.perEmail

                };

                var config = {
                    headers: {'Content-Type': 'application/json'}
                };

                console.log(newPerData);
                $http.post(api + '/Person', newPerData, config)
                    .then(function (response) {
                        $scope.people = response.data;

                    });


                $scope.perName = "";
                $scope.perCompId = "";
                $scope.perEmail = "";

            };
        });
    });



