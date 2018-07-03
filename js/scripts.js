var color;
var HeadingFound = false;
var FontTagFound = false;
var colorWell;
var defaultColor = "#0000ff";
var ie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
var w3 = (typeof window.getSelection != "undefined") && true;


$(function () {



    // Ajoute ou retire la classe active sur les boutons suivants s'ils ont le Node concerné :
    //---------------------------------------------------------------------------------------


    initialiseLeColorPicker();

    $('#main').on('input', function () {
        var el = $(this).get(0);
        console.log(getCaretPosition(el));

    });

    // S'il y a un changement dans le select des headings,
    // on passe la commande "Format-block"
    $('.dropdown-item').on("click", function () {
        var format = $(this).attr('class').split(' ')[2];
        document.execCommand("formatBlock", false, "<" + format + ">");
        var t = format;
        $("#dropdownMenuButton").html('<' + t +
            ' style="margin:0;display:inline-block;">'
            + $(this).html() +
            '</' + t + '>');
    });


    // Si on clique à l'intérieur du contenteditable :
    // On vérifie s'il y a un text-align ou une balise sémantique :
    //                                          - "Italique",
    //                                          - "Gras",
    //                                          - "liste ordonnée/désordonnée",
    //                                          - Font
    // en parcourant les nodes qui encapsulent la selection.

    $("#main").on("click", function () {
        if ($(".visuel").hasClass("activeOnglet"))
            rend_les_boutons_actifs_ou_inactifs();
    });

    // Opérations effectuées sur le click d'un bouton commande
    //--------------------------------------------------------
    $(".icone").on("click", function () {

        // Les commandes de stylisation ne sont disponibles
        // que si on est sur l'onglet "visuel" :
        //-------------------------------------------------

        if ($(".visuel").hasClass("activeOnglet"))
        {
            // Récupération de la classe action :
            var action = $(this).attr("class").split(" ")[1];
            applyStyle(action);
            rend_les_boutons_actifs_ou_inactifs();
        }
    });

    //partie select mise en forme//

    $("#main").resize(function() {
        $("#container").css("width",$(this).css("width"));
    })
});