app.controller('MainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.openShifts = [{name: 'Cameron', date: '24/11/2017', start: '6AM', end: '2:30PM'}];
  $scope.shifts = [];
  $scope.expanded = [];
  $scope.requests = [];


  $scope.expand = (id) => {
    $http({method: 'GET', url: '/shifts/' + id})
    .then((res) => {
      $scope.expanded = new Array(res.data);
    }, (e) => {
      console.log(e.data);
    });
  };

  $scope.requestShift = (id) => {
    console.log($scope.requests);
    $http({
      method: 'PUT',
      url: '/shifts/' + id,
      data: $scope.requests
    }).then((res) => {
      refresh();
    }, (e) => {
      console.log(e.data);
    });
  };

  var refresh = () => {
    $http({
      method: 'GET',
      url: '/shifts'
    }).then((res) => {
      $scope.shifts = res.data;
      $scope.shift = null;
      $scope.requests = new Array(res.data.requests);
      $scope.request = null;
    }, (e) => {
      console.log(e.data);
    });
  };

  refresh();

  $scope.add = () => {
    $http({
      method: 'POST',
      url: '/shifts',
      data: $scope.shift
    }).then((res) => {
      refresh();
    }, (e) => {
      console.log(e.data);
    });
  };

  $scope.delete = (id) => {
    $http({
      method: 'DELETE',
      url: '/shifts/' + id
    }).then((res) => {
      refresh();
    }, (e) => {
      console.log(e.data);
    });
  };

}]);
