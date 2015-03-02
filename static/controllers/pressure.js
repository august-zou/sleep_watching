angular.module('sleepWatchingApp').controller('PressureCtrl',function($scope,socket) {
  var TOTAL_DATA_LENGTH = 1000;
  $scope.data = new Array(TOTAL_DATA_LENGTH);
  for(var i=0;i<$scope.data.length;++i)$scope.data[i] = 0;
  socket.on('pressure.read',function(data) {
   $scope.data = data.concat($scope.chartConfig.series[0].data.slice(0,TOTAL_DATA_LENGTH-data.length-1));

   $scope.chartConfig.series[0].data = $scope.data;
   //var series =  $scope.chartConfig.series[0];
   //series.addPoint(data,true,true,true);
  });
  $scope.chartSeries = [
    {"name": "pressure data", "data": $scope.data},
   ];

  $scope.addPoints = function () {
    var seriesArray = $scope.chartConfig.series;
    var rndIdx = Math.floor(Math.random() * seriesArray.length);
    seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'spline',
        animation:false

      },
      plotOptions: {
        series: {
          //stacking: ''
          animation:false
        }
      },
    },
    series: $scope.chartSeries,
    yAxis:{
      max: 255,
      min:0
    },
    xAxis:{
      tickInterval: 240,
      labels: {
        formatter: function () {
          return this.value / 60 + 's';
          }
         } 
    },
    title: {
      text: '压力变化'
    },
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  };

});
