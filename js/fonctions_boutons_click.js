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

function getCaretPosition(element) {
    var caretOffset = 0;
    if (w3) {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (ie) {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function getCaretHTMLBegin(element) {
    var caretOffset = 0;
    if (w3) {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.beginOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (ie) {
        caretOffset = 'n/a';
    }
    return caretOffset;
}

function getCaretBegin(element) {
    var caretOffset = 0;
    if (w3) {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.beginOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (ie) {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function getSelectionBegin(element) {
    var caretOffset = 0;
    if (w3) {
    }
    else if (ie) {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

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

function NoTextWasSelected() {
    var sel = window.getSelection();
    return (sel.baseNode == sel.extentNode) && (sel.baseOffset == sel.extentNode);
}




