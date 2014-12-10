'use strict';
angular.module('sleepWatchingApp').controller('PressureCtrl',function($scope,socket) {
  $scope.data = [1, 2, 4, 7, 3];
  socket.on('pressure.read',function(data) {
   $scope.data = data;
   $scope.chartConfig.series[0].data = data;
  });
  $scope.chartSeries = [
    {"name": "Some data", "data": $scope.data},
   ];

  $scope.addPoints = function () {
    var seriesArray = $scope.chartConfig.series;
    var rndIdx = Math.floor(Math.random() * seriesArray.length);
    seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'spline'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.chartSeries,
    yAxis:{
      max: 255,
      min:0
    },
    title: {
      text: '压力变化'
    },
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  };  
});
