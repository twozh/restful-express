"use strict";

/* Controllers */

Date.prototype.toString = function(){
  return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+
    this.getDate()+'日 '+this.getHours()+':'+this.getMinutes();
 };

Array.prototype.delById = function(id){
  for (var i=0; i < this.length; i++){
    if (id === this[i]._id){
      this.splice(i, 1);
    }
  }
};

var msgApp = angular.module('msgApp', []);

msgApp.controller('MsgListCtrl', ['$scope', '$http', function PhoneListCtrl($scope, $http) {
  $http.get('/msgs').success(function(ret){

    $scope.msg_list = ret.data;
  });

  $scope.sendMsg = function(inputMsg){
    var msg = {};
    msg.message = inputMsg;
    msg.user_id = '525e9ef21b4275f211000003';
    $http.post('/msgs', msg).success(function(ret){
      //alert(ret.code);
      $scope.msg_list.unshift(ret.data);
    });

  };

  $scope.delMsg = function(msg){
    $http.delete('/msgs/' + msg._id).success(function(ret){
      alert(ret.code);
      $scope.msg_list.delById(msg._id);
    });
  };

}]);

