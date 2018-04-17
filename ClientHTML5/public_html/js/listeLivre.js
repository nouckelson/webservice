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

    getData=function (id) {  
        //Category();
        $.ajax({  
            url: "http://localhost:8080/bibliotheque/webresources/livre/by/"+id,  
            type: "GET",  
            headers: {Accept: "application/json"}  
        }).done(function(data){
            $.each(data, function (i, item) {
                 var donnees= "<tr><td>"+item.id+"</td><td>"+item.titre+"</td><td>"+item.isbn+"</td><td>"+item.resume+"</td><td>"+item.categorie.nom+"</td></tr>";
               $("#show").html(donnees);

            });
            
        }); 

    };  
    
    $("#categorie").on('change',function(){
        var id=$(this).val();
        getData(id);
    });


    
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
 