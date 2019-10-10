/* 
 * on commence par une variable qui stockera l'URL:
 * https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query=
 * 
 * 1) On veut recupérer le champs input.
 * 2) On crée un evenement qui detecte les touches appuyées.
 * 3) Dans l'evenement on veut:
 *   a) crée un objet XMLHttpRequest
 *   b) on fait une concatenation dans une nouvelle variable de
 *          la valeur sasie (dans 'event') et
 *          et l'URL précédement crée.
 *   c) on ouvre une requête de type GET, avec la nouvelle URL, de maniere
 *          asynchrone
 *   d) On definit la fonction onLoad() (cf point 4) et ce qu'elle doit faire avec le 
 *      resultat de la fonction 
 *   e) On definit la fonction onError() et ce qu'elle doit faire
 *   d) on envoie la requete
 * 
 * 4) dans onLoad():
 *   a) on verifie que le status est bien 200. 
 *   b) si il est a 200, on parse la Reponse JSON en objet.
 *   c) on affiche la reponse grace a la fonction display(cf point 5) et 
 *          la reponse qu'on lui passe ne parametre
 *   d) si ce n'est pas 200, on affiche le status de la reponse et onError. 
 * 
 * 5) dans la fonction display(reponse) 
 *  a) on stock le lien pour recuperer l'image : https://image.tmdb.org/t/p/w500/
 *  b) on recupere la zone d'affichage
 *  c) on remet la zone d'affichage a 0, car on veut effacer les recherches
 *          precedentes
 *  d) on stock les resultats du parametre reponse avec 'reponse.results' 
 *      on parcours les resultats et on les affiches dans la zone de texte avec
 *      le l'image, lupe titre, la description
 * */

const url = "https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query="
let btn1 = document.querySelector(`input[type="Search"]`);
// let btn1 = document.querySelector("button")
// let inputElt = form.children[0];
// let btn = form.children[1];
let query = "";

btn1.addEventListener("keyup", function (event) {
    //event.preventDefault();

    let req = new XMLHttpRequest()
   
console.log(req)

    query = event.target.value;
    let concat = url + query

    req.open("GET", concat, true)
    req.onload = onLoad
    req.onerror = onError
    req.send()
});

function onLoad() {
    if (this.status === 200) {
        console.log(this.status)
        let reponse = JSON.parse(this.responseText)
        display(reponse)
    }
    else {
        console.log(this.status)
        onError()
    }

}

function display(reponse) {
    console.log(reponse)
    let lien = "https://image.tmdb.org/t/p/w500/"
    let listFilms = document.querySelector("#content")


    for (el of reponse.results) {
        // TODO: ligne 75 à supprimer. 
        // listFilms.textContent += lien + el.poster_path + "\n" <- probleme
        let title = document.createElement("h2")
        let img = document.createElement("img")
        //Tu as mis un lien a la place du titre du film
        title.textContent = lien + el.original_title
        img.src = lien + el.poster_path
        listFilms.appendChild(title)
        listFilms.appendChild(img)
    }



}

function onError(event) {
    console.log("une erreur est survenue" + event.target.status)
}