/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    /* 
    Ceci est equivalent à une classe Java, on veut faire propre! 
    */    
    /* global ko, self */
    $(function(){

    getData=function () {  
        $.ajax({  
            url: "http://localhost:8080/bibliotheque/webresources/categories",  
            type: "GET",  
            headers: {Accept: "application/json"}  
        }).done(function(smg){
            //Category(smg);
            ko.applyBindings(new ViewModel(smg)); 
        }); 

    }  
    getData();
var Category = function(categorie) {  
                    this.id = ko.observable(categorie.id);  
                    this.nom = ko.observable(categorie.nom);  
                    this.description = ko.observable(categorie.description);  
                };  

    var ViewModel = function(categories) {  
        var CategorieApiUrl = 'http://localhost:8080/bibliotheque/webresources/categories/';
            var self = this;  
            //représente la liste des catégories  
            //La fonction prend la réponse obtenue du serveur en paramètre  
            //Ici nous supposons que vous avez chargé la liste des catégories  
            //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
            self.categories = ko.observableArray(ko.utils.arrayMap(categories, function(categorie) { return new Category(categorie);}));
            

    };  
    
    var deal=function(categorie){
        alert(categorie);
    };
    
            self.SupprimerUneCategorie = function(categorie, evt) {
                alert(categorie.id)
                  Del(categorie.id, function() {self.categories.remove(categorie);},CategorieApiUrl); console.log(categorie);
              }
             
             self.ActualiserUneCategorie = function(categorie, evt) {
                  update(categorie.id, function() {self.categories.replace(categorie);},CategorieApiUrl); console.log(categorie);
              }    
                var Del = function(id, callback, url) {
                      $.ajax({
                      method:"DELETE",
                      url: url + id,
                      contentType: "application/json",  
                      headers: {Accept : "application/json"}, 
                      success: function(data){
                          return callback(data);
                      },
                      error: function(error) {
                        console.log(error);
                        return callback(error);
                      }
                      });
                  }
                  
                var update= function(id, callback, url) {
                      $.ajax({
                      method:"PUT",
                      url: url + id,
                      contentType: "application/json",  
                      headers: {Accept : "application/json"}, 
                      success: function(data){
                          return callback(data);
                      },
                      error: function(error) {
                        console.log(error);
                        return callback(error);
                      }
                      });
                  }
    });
   