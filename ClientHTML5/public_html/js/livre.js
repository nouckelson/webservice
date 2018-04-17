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
        //Category();
        $.ajax({  
            url: "http://localhost:8080/bibliotheque/webresources/livre",  
            type: "GET",  
            headers: {Accept: "application/json"}  
        }).done(function(smg){
            ko.applyBindings(new ViewModel(smg)); 
            
        }); 

    };  
    getData();
            var Livre = function(livre) {  
                    this.id = ko.observable(livre.id);  
                    this.titre = ko.observable(livre.titre);  
                    this.resume = ko.observable(livre.resume); 
                    this.isbn = ko.observable(livre.isbn);
                    this.quantite = ko.observable(livre.quantite); 
                    this.categorie = ko.observable(livre.categorie);
                    this.categories = ko.observable(livre.categorie.nom);
                };  

            var ViewModel = function(livres) { 
                   var self = this;  
                   self.livres = ko.observableArray(ko.utils.arrayMap(livres, function(livre) { return new Livre(livre);}));             
            };  

    
    });

 getCategory();
 function getCategory() {
     url="http://localhost:8080/bibliotheque/webresources/categories";
    $.ajax({
        url: url,
        contentType: "application/json", 
        headers: {Accept : "application/json"}, 
        success: function (data) {
            $.each(data, function (i, item) {
                 var donnees= "<option value=" +item.id + ">" + item.nom + "</option>";
                 $("#categorie").append(donnees);

            });
        },
        error: function () {}
      });
  }
                
self.remove = function(livre){ 
                    url="http://localhost:8080/bibliotheque/webresources/livre/"+livre.id();
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
                    
                    
                self.update= function(livre) {
                    
                      url="http://localhost:8080/bibliotheque/webresources/livre/"+livre.id();
                      $.ajax({
                      method:"PUT",
                      url: url,
                      data:ko.toJSON(livre, null, 2),
                      contentType: "application/json",  
                      headers: {Accept : "application/json"}
                  }).done(function(data){
                       getData();
                       location.reload();
                      });
                  };
                   
                  
                    self.add = function() {
                   
                        var titre=$('#titre').val();
                        var resume=$('#resume').val();
                        var isbn=$('#isbn').val();
                        var quantite=$('#quantite').val();
                        var cate=$('#categorie').val();
                        categorie='{"id":"'+cate+'"}';
                        var data ="{\"titre\":\""+titre+"\",\"resume\":\""+resume+"\",\"isbn\":\""+isbn+"\",\"quantite\":\""+quantite+"\",\"categorie\":"+categorie+"}";
                        url="http://localhost:8080/bibliotheque/webresources/livre";
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

