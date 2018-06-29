var colorWell
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}

// On dispose de deux fonctions qui gèrent les modifications de couleurs. 
// La fonction updateFirst() permet de répondre à l'évènement input et modifie la couleur du 
// premier paragraphe dans le document en utilisant la nouvelle valeur saisie. 
// Étant donné que les évènements input ont lieu à chaque fois qu'un ajustement est fait, 
// cette fonction sera appelée sans cesse lorsque le sélecteur de couleur est utilisé.

function updateFirst(event) {
  var p = document.querySelector("p");

  if (p) {
    p.style.color = event.target.value;
  }
}function updateAll(event) {
  document.querySelectorAll("p").forEach(function(p) {
    p.style.color = event.target.value;
  });
}

// Lorsque le sélecteur est fermé, cela signifie que la valeur ne sera plus modifié 
// avant une prochaine ouverture du sélecteur. 
// Un évènement change est alors envoyé et cela déclenche alors l'appel de la fonction updateAll() :

