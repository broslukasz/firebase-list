# firebase-list
Simple list based on firebase

This task is a refactor from AngularJs code:

    /* User object
        {
          id: string,
          name: string,
          surname: string,
          birthDate: string,
          phone: string,
          city: string,
          street: string,
          number: string
        },
    */

'use strict';

angular.module('interviewApp', [])
  .component('interviewComponent', {
    controller: function ($scope, $http, $state) {    
      $scope.users = [] // confidential

      $scope.findAll = function () {
        $http({
          method: 'GET',
          url: '/findall'
        }).success(function (data, status, headers, config) {
          $scope.users = data;
        }).error(function (data, status, headers, config) {
          alert('Error');
        });
      };

      $scope.find = function (userId) {
        $http({
          method: 'GET',
          url: '/find',
          data: {userId: userId}
        }).success(function (data, status, headers, config) {
          $state.go('userDetails');
        });
      };

      $scope.edit = function (user) {
        if (_.isArray(user)) {
          var ids = [];
          for (var i = 0; i < user.length; i++) {
            ids.push(user[i].id);
          }
          $http({
            method: 'POST',
            url: '/edit',
            data: {userId: ids},
          }).success(function (data, status, headers, config) {
            for (var i = 0; i < $scope.users.length; i++) {
              if ($scope.users[i].id === data.id) {
                $scope.users[i] === data;
              }
            }
            alert('User Updated');
          }).error(function (data, status, headers, config) {
            alert('Couldnt update user');
          });
        } else {
          $http({
            method: 'POST',
            url: '/edit',
            data: {userId: iser.id},
          }).success(function (data, status, headers, config) {
            $scope.users[$scope.users.indexOf(user.id)] = data;
            alert('User Saved');
          }).error(function (data, status, headers, config) {
            alert('Couldnt Save');
          });
        }
      };

      $scope.remove = function (userId) {
        $http({
          method: 'POST',
          url: '/remove',
          data: {userId: userId}
        }).success(function (data, status, headers, config) {
          var index = $scope.users.indexOf(userId);
          $scope.users.splice(index, 1);
          alert('User Removed');
        }).error(function (data, status, headers, config) {
          alert('Couldnt Remove');
        });
      };
    });


