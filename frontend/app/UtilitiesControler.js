app.controller('UtilitiesControler', [
    '$scope', '$timeout', '$q', '$http', 'Utilities',
    function ($scope,$timeout, $q, $http, Utilities){
        $scope.getAguas = getAguas;

        function getAguas(){
            Utilities.getAll({
            }).$promise.then(function(response){
                $scope.aguas = response
                console.log($scope.aguas);                
            },
            function(error){
                $scope.aguas = null
            })           
        }
    }
]);
