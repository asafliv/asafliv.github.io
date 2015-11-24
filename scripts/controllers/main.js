'use strict';

angular.module('asafApp')
    .controller('MainCtrl', function ($scope,$http) {


        $scope.currentPage = 1;

        $http.get('../anomaly.json')
            .then(function(res){
                $scope.jsonFile = res.data;
                $scope.significantVariables = $scope.jsonFile["significantVariables"];
                $scope.numberOfPages = Math.ceil($scope.significantVariables.length / 8);
                $scope.anomalousProperty = $scope.jsonFile["anomalousProperty"];
                $scope.currSigVars=[]
                $scope.updateCurrSigVars()
            });


        $scope.checkFiltersMax = function(significantVariable) {
            if ($scope.variableFilterValueMax == undefined){
                return true
            }
            return  $scope.variableFilterValueMax >= significantVariable.relativeChange
        }

        $scope.checkFiltersMin = function(significantVariable) {
            if ($scope.variableFilterValueMin == undefined){
                return true
            }
            return  $scope.variableFilterValueMin <= significantVariable.relativeChange
        };


        $scope.checkKeyStr = function(significantVariable){
            if (!$scope.keySearch){
                return true
            }
            return (significantVariable.key.indexOf($scope.keySearch) > -1);

        }

        $scope.checkValuestr = function(significantVariable){
            if (!$scope.valueSearch){
                return true
            }
            return (significantVariable.value.indexOf($scope.valueSearch) > -1);

        }



        $scope.updateCurrSigVars = function(){
            debugger
            $scope.currSigVars=[]
            for (var i = $scope.currentPage * 8 - 8; i<= $scope.currentPage * 8-1; i++){
                if (i == $scope.significantVariables.length){
                    return
                }
                $scope.currSigVars.push($scope.significantVariables[i]);
            }
        }
    });
