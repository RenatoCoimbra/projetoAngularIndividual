
var app = angular.module('blog', ['ngRoute'])


app.controller('home', function ($scope) {
  $scope.nome = "artigos"
});


app.controller('leitura',function($scope,$http,$route){
  
  $scope.ArtigoAtual = $route.current.params.art
  $scope.ArtigoCarregado =  ""
  $scope.Sugeridos = []

 
  var Artigo_Carregdo = $http.get("../data/artigos.json")
  .then(function(response){   
    response.data.forEach(element =>{
      if(element.id == $scope.ArtigoAtual){
        $scope.ArtigoCarregado = element
      }
    })
  })


  
  var Artigo_Carregdo = $http.get("../data/artigos.json")
  .then(function(response){   
    response.data.forEach(element =>{
      
      if($scope.ArtigoCarregado.Assunto == element.Assunto){
        $scope.Sugeridos.push(element)
      }
    })
  })
})


app.controller('artigo', function ($scope, $http) {

  $scope.teste = function (TituloArtigo) {
    alert(TituloArtigo)
  }


  $scope.Lista_Add = []

  var Lista_ler = $http.get("../data/artigos.json")
    .then(function (response) {
      response.data.forEach(element => {
      
        $scope.Lista_Add.push(element)
      });

    })

})


app.controller('artigos_base', function ($scope,$http) {
  $scope.ListaArtigos = []

  var Artigo_Carregdo = $http.get("../data/artigos.json")
  .then(function(response){
    response.data.forEach(element =>{
      $scope.ListaArtigos.push(element)
    })
  })

});


app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./templates/main.html",
      controller: "artigos_base"
    })
    .when("/artigos", {
      templateUrl: "./templates/artigos.html",
      controller: "artigo"
    })
    .when("/leitura/:art", {
      templateUrl: "./templates/leitura.html",
      controller: "leitura"
    })

});