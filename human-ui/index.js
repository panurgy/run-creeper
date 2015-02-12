/**
 * JavaScript source that goes along well with the index.html page.
 */

(function(angular){
'use strict';

  angular
      .module('RunCreeperApp', ['ngMaterial'])
      .controller('SearchCtrl', ['$scope', '$log', '$http', SearchController ])
      .config(function($mdThemingProvider) {

        // Use the 'brown' theme - override default 'blue' theme

        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('yellow');

      });

function SearchController($scope, $log, $http) {

    $scope.blah = { text:"Hello world!" };
    $scope.search = {};

    $scope.doSearch = function() {
        console.log("Searching for ", $scope.search);

        $http.post('/search', $scope.search)
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = data;
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    $scope.clearSearch = function() {
        $scope.search = {};
        $scope.results = null;
    };

}

})(angular);

