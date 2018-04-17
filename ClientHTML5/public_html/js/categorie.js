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
            ko.applyBindings(new ViewModel(smg)); 
            
        }); 

    };  
    getData();
var Category = function(categorie) {  
                    this.id = ko.observable(categorie.id);  
                    this.nom = ko.observable(categorie.nom);  
                    this.description = ko.observable(categorie.description); 
                    
                };  

    var ViewModel = function(categories) {  
            var self = this;  
            //représente la liste des catégories  
            //La fonction prend la réponse obtenue du serveur en paramètre  
            //Ici nous supposons que vous avez chargé la liste des catégories  
            //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
            self.categories = ko.observableArray(ko.utils.arrayMap(categories, function(categorie) { return new Category(categorie);}));
              self.afficherFormulaire = ko.observable(true);
    };  

    
    });
    
    
                self.remove = function(categorie){ 
                    url="http://localhost:8080/bibliotheque/webresources/categories/"+categorie.id();
                        $.ajax({  
                            url: url,  
                            type: "DELETE",  
                            contentType: "application/json",  
                            headers: {Accept : "application/json"}  
                        }).done(function(data) {  
                          getData();
                          location.reload();
                        }); 
                };  
                    
                    
                self.update= function(categorie) {
                    
                      url="http://localhost:8080/bibliotheque/webresources/categories/"+categorie.id();
                      $.ajax({
                      method:"PUT",
                      url: url,
                      data:ko.toJSON(categorie, null, 2),
                      contentType: "application/json",  
                      headers: {Accept : "application/json"}
                  }).done(function(data){
                       getData();
                       location.reload();
                      });
                  };
                   
                  
                    self.add = function() {
                        
                        var nom=$('#nom').val();
                        var des=$('#description').val();
                        var data ="{\"nom\":\""+nom+"\",\"description\":\""+des+"\"}";
                        url="http://localhost:8080/bibliotheque/webresources/categories";
                            $.ajax({
                            method:"POST",
                            url: url,
                            dataType: "json",
                            contentType: 'application/json',
                            data: data
                            }).done(function(data){
                                    getData();
                                    location.reload();
                                    
                            });
                    };
                  /*
     * 
     * .success(function(data, status, jq) {  
    //Cette fonction indique à knockout d'appliquer les données aux éléments de la page  ////Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois 
            ko.applyBindings(new ViewModel(data));  
        }).error(function(jq, status, error) {  
            $(".error").text(JSON.stringify(status + " " + error));  
      
        }); 
     */