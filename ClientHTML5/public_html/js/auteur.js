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
            url: "http://localhost:8080/bibliotheque/webresources/auteur",  
            type: "GET",  
            headers: {Accept: "application/json"}  
        }).done(function(smg){
            ko.applyBindings(new ViewModel(smg)); 
            
        }); 

    };  
    getData();
var Auteur = function(auteur) {  
                    this.id = ko.observable(auteur.id);  
                    this.nom = ko.observable(auteur.nom);  
                    this.prenom = ko.observable(auteur.prenom); 
                    this.email = ko.observable(auteur.email); 
                    this.sexe = ko.observable(auteur.sexe); 
                    this.dateDenaissance = ko.observable(auteur.dateDenaissance);
                    this.nationalite = ko.observable(auteur.nationalite); 
                    this.aProposDe = ko.observable(auteur.aProposDe); 
                    
                    
                };  

    var ViewModel = function(auteurs) {  
            var self = this;  
            //représente la liste des catégories  
            //La fonction prend la réponse obtenue du serveur en paramètre  
            //Ici nous supposons que vous avez chargé la liste des catégories  
            //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
            self.auteurs = ko.observableArray(ko.utils.arrayMap(auteurs, function(auteur) { return new Auteur(auteur);}));
              self.afficherFormulaire = ko.observable(true);
    };  

    
    });
    
    
                self.remove = function(auteur){ 
                    url="http://localhost:8080/bibliotheque/webresources/auteur/"+auteur.id();
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
                    
                    
                self.update= function(auteur) {
                    
                      url="http://localhost:8080/bibliotheque/webresources/auteur/"+auteur.id();
                      $.ajax({
                      method:"PUT",
                      url: url,
                      data:ko.toJSON(auteur, null, 2),
                      contentType: "application/json",  
                      headers: {Accept : "application/json"}
                  }).done(function(data){
                       getData();
                       location.reload();
                      });
                  };
                   
                  
                    self.add = function() {
                        
                        var nom=$('#nom').val();
                        var prenom=$('#prenom').val();
                        var email=$('#email').val();
                        var sexe=$('#sexe').val();
                        var dateDenaissance=$('#dateDenaissance').val();
                        var nationalite=$('#nationalite').val();
                        var aProposDe=$('#aProposDe').val();
                        
                        
                        var data ="{\"nom\":\""+nom+"\",\"prenom\":\""+prenom+"\",\"email\":\""+email+"\",\"sexe\":\""+sexe+"\",\"dateDenaissance\":\""+dateDenaissance+"\",\"nationalite\":\""+nationalite+"\",\"aProposDe\":\""+aProposDe+"\"}";
                        url="http://localhost:8080/bibliotheque/webresources/auteur";
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