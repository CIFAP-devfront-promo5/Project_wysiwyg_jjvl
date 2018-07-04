$(function() {
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
            $("#tools").addClass("disabled");
            // La fonction text() est comme la fonction html()
            // sauf qu'elle prend un texte brut et ne construit pas le DOM

            $(".icone").removeClass("active");

            // Apparence "disabled" des boutons et select :
            $(".headings , .icone").css("opacity", 0.5);

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
            $("#tools").removeClass("disabled");
            // On transforme une chaine de caractères
            // en du code pouvant géngérer du DOM
            var HTML_content = $("#main").html();
            $("#main").html(unescapeHTML(HTML_content));

            $(".code , .visuel").toggleClass("activeOnglet").toggleClass("inactiveOnglet");

            //Apparence "enabled" des boutons et select :
            $(".icone , .headings").css("opacity", 1);
            $("select").attr("disabled", false);

        }
    });
});