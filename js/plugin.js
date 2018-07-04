var color;
var HeadingFound = false;
var FontTagFound = false;
var colorWell;
var defaultColor = "#0000ff";
var ie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
var w3 = (typeof window.getSelection != "undefined") && true;


function iif($condition,$siok,$siko){
    if ($condition == true)	return($siok);	else	return($siko);
}


function get_HTML_buttons(command) {
    var html_li;
    switch (command) {
        case 'headings':
            html_li = '<li unselectable="on" class="headings">' +
                            '<div class="dropdown heading">' +
                                '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" ' +
                                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '    Paragraphe' +
                                '</button>' +
                                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                                    '<a class="dropdown-item pp P" href="#">Paragraphe</a>' +
                                    '<a class="dropdown-item t1 H1" href="#">Titre 1</a>' +
                                    '<a class="dropdown-item t2 H2" href="#">Titre 2</a>' +
                                    '<a class="dropdown-item t3 H3" href="#">Titre 3</a>' +
                                    '<a class="dropdown-item t4 H4" href="#">Titre 4</a>' +
                                '</div>' +
                            '</div>' +
                        '</li>';
            break;

        case 'bold':
            html_li = '<li unselectable="on" class="icone bold"' +
                      'data-title="Gras">' +
                          '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-bold"></i>' +
                '     </li>';
            break;

        case 'italic':
            html_li = '<li unselectable="on" class="icone italic"' +
                'data-title="Italique">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-italic"></i>' +
                '     </li>';
            break;

        case 'insertUnorderedList':
            html_li = '<li unselectable="on" class="icone insertUnorderedList"' +
                'data-title="Liste à puce">' +
                '<a href="#"></a>' +
                '<i class="fas fa-list-ul"></i>' +
                '     </li>';
            break;

        case 'insertOrderedList':
            html_li = '<li unselectable="on" class="icone insertOrderedList"' +
                'data-title="Liste ordonnée">' +
                '<a href="#"></a>' +
                '          <i class="fas fa-list-ol"></i>' +
                '     </li>';
            break;

        case 'justifyLeft':
            html_li = '<li unselectable="on" class="icone justifyLeft"' +
                'data-title="Aligner à gauche">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-align-left"></i>' +
                '     </li>';
            break;

        case 'justifyCenter':
            html_li = '<li unselectable="on" class="icone justifyCenter"' +
                'data-title="Centrer">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-align-center"></i>' +
                '     </li>';
            break;

        case 'justifyRight':
            html_li = '<li unselectable="on" class="icone justifyRight"' +
                'data-title="Aligner à droite">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-align-right"></i>' +
                '     </li>';
            break;

        case 'justifyFull':
            html_li = '<li unselectable="on" class="icone justifyFull"' +
                'data-title="Justifier">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-align-justify"></i>' +
                '     </li>';
            break;

        case 'createLink':
            html_li = '<li unselectable="on" class="icone createLink"' +
                'data-title="Insérer un lien">' +
                '<a href="#"></a>' +
                '          <i class="fas fa-link"></i>' +
                '     </li>';
            break;

        case 'unlink':
            html_li = '<li unselectable="on" class="icone unlink"' +
                'data-title="Supprimer le lien">' +
                '<a href="#"></a>' +
                '          <i class="fas fa-unlink"></i>' +
                '     </li>';
            break;

        case 'justifyFull':
            html_li = '<li unselectable="on" class="icone justifyFull"' +
                'data-title="Justifier">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-align-justify"></i>' +
                '     </li>';
            break;

        case 'foreColor':
            html_li = '<li unselectable="on" class="icone"' +
            '           data-title="Couleur">' +
            '               <i class="glyphicon glyphicon-font bas  foreColor">' +
            '                   <input type="color" value="#ff0000" id="colorWell">' +
            '               </i>' +
            '           </li>';
            break;

        case 'insertImage':
            html_li = '<li unselectable="on" class="icone insertImage"' +
                'data-title="Image">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-picture bas"></i>' +
                '     </li>';
            break;

        case 'removeFormat':
            html_li = '<li unselectable="on" class="icone removeFormat"' +
                'data-title="Effacer">' +
                '<a href="#"></a>' +
                '          <i class="glyphicon glyphicon-erase bas"></i>' +
                '     </li>';
            break;
    }
    return html_li;
}



jQuery.fn.initiateEditor = function (features) {

    var string_header =
        '<header ' + iif(features.backGroundColorFunctions != undefined ,
                    'style="background:'+ features.backGroundColorFunctions + '"',
                    '')+
                    '>' +
        '   <section id="premiere">' +
        '       <ul>' +
        '               <li unselectable="on" class="activeOnglet visuel">' +
        '                  Visuel' +
        '               </li>'+
iif(features.VisuCode,' <li unselectable="on" class="inactiveOnglet code">' +
        '                  Code' +
        '               </li>',
                        '') +
        '       </ul>' +
        '   </section>' +
        '   <section id="tools">' +
            '   <ul>' +
            (function() {
                    var list_HTML = '';
                    features.list_functions.forEach(function(command) {
                        list_HTML += get_HTML_buttons(command);
                    });
                    return list_HTML;
                })() +
            '   </ul>' +
        '   </section>' +
        '</header>' +
        '<section id="main" contenteditable>' +
        '</section>';

    $(this).html(string_header);


    // Ajoute ou retire la classe active sur les boutons suivants s'ils ont le Node concerné :
    //---------------------------------------------------------------------------------------


    initialiseLeColorPicker();

    $(".icone").on("mouseover", function() {


        $(this).append('<div class="tooltip_">' + $(this).attr("data-title") + '</div>');
        console.log($(this).attr("data-title"));
    }).on("mouseout", function() {

        $('.tooltip_').remove();

    });

    $('#main').on('input', function () {
        var el = $(this).get(0);
        console.log(getCaretPosition(el));
        console.log(window.getSelection());

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

};

