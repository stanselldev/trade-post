app.controller('MainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.openShifts = [{name: 'Cameron', date: '24/11/2017', start: '6AM', end: '2:30PM'}];
  $scope.shifts = [];
  $scope.expanded = null;
  $scope.requests = null;

  var refresh = () => {
    $http({
      method: 'GET',
      url: '/shifts'
    }).then((res) => {
      $scope.shifts = res.data;
      $scope.requests = res.data[0].requests;
      $scope.expanded = null;
      $scope.requests = null;
    }, (e) => {
      console.log(e.data);
    });
  };

  refresh();

  $scope.expand = (id) => {
    $http({method: 'GET', url: '/shifts/' + id})
    .then((res) => {
      $scope.expanded = new Array(res.data);
      $scope.requests = $scope.expanded[0].requests;
    }, (e) => {
      console.log(e);
    });
  };

  $scope.deleteRequest = (id, request) => {
    $http({
      method: 'PUT',
      url: `/shifts/delete/${id}/${request}`
    }).then((doc) => {
      $scope.requests = doc.data.requests
    }, (e) => {
      console.log(e);
    });
  };

  $scope.requestShift = (id) => {
    $http({
      method: 'PUT',
      url: '/shifts/' + id,
      data: $scope.request
    }).then((doc) => {
      $scope.requests = doc.data.requests
      $scope.request = null;
    }, (e) => {
      console.log(e);
    });
  };

  $scope.add = () => {
    $http({
      method: 'POST',
      url: '/shifts',
      data: $scope.shift
    }).then((doc) => {
      $scope.shifts.push(doc.data);
      $scope.shift = null;
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
