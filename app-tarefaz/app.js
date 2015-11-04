(function(){

angular.module('tarefaz', ['ngRoute'])
.config(
    function($routeProvider){
        $routeProvider
            .when('/tarefaz', {
                templateUrl: 'views/tarefaz/lista.html',
                controller: 'TarefazListaController'
            })
            .when('/tarefaz/editor', {
                templateUrl: 'views/tarefaz/editor.html',
                controller: 'TarefazEditorController'
            })
            .when('/tarefaz/:id/editor', {
                templateUrl: 'views/tarefaz/editor.html',
                controller: 'TarefazEditorController'
            })
            .otherwise({
                redirectTo: '/tarefaz'
            });
    }
);

angular.module('tarefaz').controller('TarefazListaController',
function($scope, $http, $location){
    $http.get('dados/tarefaz.json').success(function(dados){
        $scope.tarefaz = dados;
    });

    $scope.excluir = function(index) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            $scope.tarefaz.splice(index, 1);
        }
    };

    $scope.editar = function(index) {
        $location.path('/tarefaz/' + index + '/editor');
    }
    $scope.marcar = function(index, tipo) {
        /* Metodo para marca tarefa como true, não sera feito pois estamos
         * usando armazenamento em arquivo apena para teste e não editaremos
         * o arquivo atulizando, sendo assim ficara para posterior atualização 
         */        
    }
});

angular.module('tarefaz').controller('TarefazEditorController',
function($scope, $http, $routeParams, $location){    

    $http.get('dados/tarefaz.json').success(function(dados){
        $scope.tarefaz = dados;
        
        if ($routeParams.id) {
            $scope.tarefa = $scope.tarefaz[$routeParams.id];
        }
    });

    $scope.salvar = function(tarefa) {
        $location.path('/tarefaz');
    };

    $scope.cancelar = function() {
        $location.path('/tarefaz');
    };
});
})();
