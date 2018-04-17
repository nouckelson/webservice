/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.bibliotheque.services;

import fr.unice.miage.ntdp.bibliotheque.Categorie;
import fr.unice.miage.ntdp.bibliotheque.bean.AbstractFacade;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author dtic
 */
 @Path("categorie")
public class CategorieRessource extends AbstractFacade<Categorie> {
    public CategorieRessource(){
        super(Categorie.class);
    }
     
     @GET
     @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
    // @Path("Listes")
     public String hello(){
         return "La ressource demande existe";
     }
      @GET
     @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
     @Path("Liste")
     public List<Categorie> list(){
            return super.findAll();
     }
     
     @POST
     @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
     @Path("Ajouter")
     public void Update (Categorie entity){
          super.edit(entity);
     }
     
     //Livres->donne nous tous les prets associes
     //Auteur->tous les livre ecrits par cet auteur
     //Categorie tous les livres associes
     //chercher par->auteur
     //chechr par-> livre
}
