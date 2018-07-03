# EasyWIG

<!--  //décrire en anglais// -->

## DESCRIPTION
Nous proposons un site WYSIWYG composé comme suit :

A : une partie de saisie de texte avec un cententEditable,
B : un onglet de gestion du backoffice (codage HTML),
C : un large menu de customisation de votre texte.

fonctionnalités :
.Choix de mise en forme de titre ou paragraphe,
.Police en Bold ou italic,
.Liste à puce ou numérique,
.aligner le texte à droite, au centre à gauche ou justifié
.ajouter un lien ou le supprimer,
.ajouter une image,
.modifier la couleur de la police,
.effacer les styles de votre texte.



## Usage
Un plugIn Jquery à insérer à votre html:


 Ajoute ou retire la classe active sur les boutons :
 function rend_les_boutons_actifs_ou_inactifs() {
        FontTagFound = false;
        $(".icone").removeClass("active");
        var selection = window.getSelection();
        $('option').removeAttr('selected');
        HeadingFound = false;
 
 Teste toutes les valeurs de balise du Node gérées par les boutons:
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

Création d'un onglet code, qui Transforme du texte HTML en chaine de caractère :
$('.code').on("click", function () {

        if ($(".visuel").hasClass("activeOnglet"))
        {          
            $("#main").text($("#main").html());
            $(".icone").removeClass("active");
            // Apparence "disabled" des boutons et select//
            $(".first , .icone").css("opacity", 0.5);
            $("select").attr("disabled", true);
            $(".code , .visuel").toggleClass("activeOnglet").toggleClass("inactiveOnglet");
        }
    });



## License
28 june to 5 july 2018

### Authors
by Jean, (https://github.com/jeanjean91),
Julie (https://github.com/mailye), 
Lionel (https://github.com/Lionel5656), 
Vincent (https://github.com/fvince25)

