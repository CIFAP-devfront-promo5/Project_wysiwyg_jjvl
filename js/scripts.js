var color;
var HeadingFound = false;
var FontTagFound = false;


$(function () {

    // Ajoute ou retire la classe active sur les boutons suivants s'ils ont le Node concerné :
    //---------------------------------------------------------------------------------------

    function rend_les_boutons_actifs_ou_inactifs() {
        FontTagFound = false;
        $(".icone").removeClass("active");
        var selection = window.getSelection();
        $('option').removeAttr('selected');
        HeadingFound = false;

        var Node = selection.baseNode.parentNode;

        // On parcourt tous les nodes qui encapsulent la selection en partant du node le plus profond
        // Jusqu'à atteindre la div contenteditable (dont l'id est main) ou le container principal
        // (dont l'id est container)

        while (Node.id != 'main' && Node.id != 'container') {

            // Pour chaque node on vérifie s'il y a une propriété text-align :
            //----------------------------------------------------------------
            verifier_si_le_node_contient_un_aligntext(Node);

            // On teste toutes les valeurs de balise du Node gérées par les boutons:
            //----------------------------------------------------------------------

            switch (Node.tagName) {
                case 'I':
                    $(".italic").addClass("active");
                    break;

                case 'B':
                    $(".bold").addClass("active");
                    break;

                case 'UL':
                    $(".insertUnorderedList").addClass("active");
                    break;

                case 'OL':
                    $(".insertOrderedList").addClass("active");
                    break;

                case 'FONT':
                    $("#colorWell").val(Node.color);
                    FontTagFound = true;
                    break;

                // Cas H1, H2, H3, H4, H5 ou H6 :
                // On force à selected le node ayant la valeur Hx concernée
                //--------------------------------------------------------
                case 'H1':
                case 'H2':
                case 'H3':
                case 'H4':
                case 'H5':
                case 'H6':
                    $('[value="' + Node.tagName + '"]').prop("selected", true);
                    // On a trouvé un heading !
                    if (Node.tagName[0] == 'H')
                        HeadingFound = true;
                    break;
            }
            // Le node devient son parent.
            Node = Node.parentNode;
        }

        // Si on n'a trouvé aucun heading en parcourant les nodes de la selection,
        // c'est qu'il s'agit d'un P (par élimination)

        if (!HeadingFound)
            $('[value="P"]').prop("selected", true);

        // Si on n'a trouvé aucun font en parcourant les nodes de la selection,
        // c'est que la couleur du texte est noir (valeur par défaut)

        // if (!FontTagFound) {
        //     $("#colorWell").val("#F00ff");
        // }

    }

    function NoTextWasSelected() {
        var sel = window.getSelection();
        return (sel.baseNode == sel.extentNode) && (sel.baseOffset == sel.extentNode);
    }


    // Application du style :
    //------------------------------------

    function applyStyle(action) {

        var val = "";

        // Pour certaines actions, il y a besoin d'un paramètre (val)
        //-----------------------------------------------------------

        if (action == "createLink")
            val = prompt('Saississez un lien :');

        if (action == "insertImage")
            val = prompt('Saississez une url d\'image:');

        document.execCommand(action, false, val);
    }

    // Vérification si la propriété text-align est valorisée :
    //--------------------------------------------------------

    function verifier_si_le_node_contient_un_aligntext(Node) {
        $(".justifyLeft").removeClass("active");
        switch (Node.style.textAlign) {

            case 'justify':
                $(".justifyFull").addClass("active");
                break;

            case 'right':
                $(".justifyRight").addClass("active");
                break;

            case 'center':
                $(".justifyCenter").addClass("active");
                break;

            case 'left':
                $(".justifyLeft").addClass("active");
                break;

            case '':
                if (!$(".justifyRight").hasClass("active") &&
                    !$(".justifyCenter").hasClass("active") &&
                    !$(".justifyFull").hasClass("active"))
                    $(".justifyLeft").addClass("active");
                break;
        }

    }


    function unescapeHTML(escapedHTML) {
        return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }



    // Ne sert pas pour l'instant.
    //----------------------------
    function maintainCaretPosition() {
        var caretPos = 0,
            sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode == editableDiv) {
                    caretPos = range.endOffset;
                }
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            if (range.parentElement() == editableDiv) {
                var tempEl = document.createElement("span");
                editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                var tempRange = range.duplicate();
                tempRange.moveToElementText(tempEl);
                tempRange.setEndPoint("EndToEnd", range);
                caretPos = tempRange.text.length;
            }
        }
        return caretPos;
    }


    function initialiseLeColorPicker() {
        colorWell = document.querySelector("#colorWell");
        colorWell.value = defaultColor;
        colorWell.addEventListener("input", updateColor, false);
        colorWell.addEventListener("change", updateColor, false);
        colorWell.select();
    }

    function updateColor(event) {
        color = event.target.value;
        document.execCommand("foreColor", false, color);
    }

    var colorWell;
    var defaultColor = "#0000ff";

    initialiseLeColorPicker();


    // $('#main').on('input', function () {
    //     console.log(this);
    //     // console.log(getCaretPosition(this));
    // });

    // S'il y a un changement dans le select des headings,
    // on passe la commande "Format-block"
    $('.heading').on("change", function () {
        document.execCommand("formatBlock", false, "<" + $(this).val() + ">");
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

    // Ecouteur du bouton onglet "Code"
    //---------------------------------------------

    $('.code').on("click", function () {

        // On ne peut cliquer sur visuel que si on était précédement sur code
        //-------------------------------------------------------------------

        if ($(".visuel").hasClass("activeOnglet"))
        {
            // Transforme du texte HTML en chaine de caractère :
            //--------------------------------------------------
            $("#main").text($("#main").html());
            // La fonction text() est comme la fonction html()
            // sauf qu'elle prend un texte brut et ne construit pas le DOM

            $(".icone").removeClass("active");

            // Apparence "disabled" des boutons et select :
            $(".first , .icone").css("opacity", 0.5);

            $("select").attr("disabled", true);
            $(".code , .visuel").toggleClass("activeOnglet").toggleClass("inactiveOnglet");
        }
    });



    // Ecouteur du bouton onglet "Visuel"
    //---------------------------------------------
    $('.visuel').on("click", function () {

        // On ne peut cliquer sur code que si on était précédement sur visuel
        //-------------------------------------------------------------------
        if ($(".code").hasClass("activeOnglet"))
        {
            // On transforme une chaine de caractères
            // en du code pouvant géngérer du DOM
            var HTML_content = $("#main").html();
            $("#main").html(unescapeHTML(HTML_content));

            $(".code , .visuel").toggleClass("activeOnglet").toggleClass("inactiveOnglet");

            //Apparence "enabled" des boutons et select :
            $(".icone , .first").css("opacity", 1);
            $("select").attr("disabled", false);

        }
    })
    //partie select mise en forme//

    $('.dropdown-item').on("click",function() {
    $("#dropdownMenuButton").html($(this).html(e));
})
});