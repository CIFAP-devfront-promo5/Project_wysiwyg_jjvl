var color;
var atLeast1Heading = false;
var thereIsFontTag = false;



$(function () {


    // Ajoute ou retire la classe active :
    //--------------------------------------------------

    function check_style_for_buttons()
    {
        thereIsFontTag = false;
        $(".icone").removeClass("active");
        selection = window.getSelection();
        $('option').removeAttr('selected');
        atLeast1Heading = false;

        var Node = selection.baseNode.parentNode;

        while (Node.tagName != 'DIV' && Node.tagName != 'BODY') {

            check_align(Node);

            switch (Node.tagName) {
                case 'I':
                    $(".italic").addClass("active");break;

                case 'B':
                    $(".bold").addClass("active");break;

                case 'UL':
                    $(".insertUnorderedList").addClass("active");break;

                case 'OL':
                    $(".insertOrderedList").addClass("active");break;

                case 'FONT':
                    $("#colorWell").val(Node.color);
                    thereIsFontTag = true;
                    break;

                case 'H1':
                case 'H2':
                case 'H3':
                case 'H4':
                case 'H5':
                case 'H6':
                    $('[value="' + Node.tagName + '"]').prop("selected", true);
                    if (Node.tagName[0] == 'H')
                        atLeast1Heading = true;
                    break;
            }
            Node = Node.parentNode;
        }
        check_align(Node);

        if (!atLeast1Heading)
            $('[value="P"]').prop("selected", true);

        if(!thereIsFontTag) {
            $("#colorWell").val("#000");
        }

    }

    function NoTextWasSelected() {
        var sel = window.getSelection();
        return (sel.baseNode == sel.extentNode) && (sel.baseOffset == sel.extentNode);
    }

    // function getCaretPosition(editableDiv) {
    //     var caretPos = 0,
    //         sel, range;
    //     if (window.getSelection) {
    //         sel = window.getSelection();
    //         if (sel.rangeCount) {
    //             range = sel.getRangeAt(0);
    //             if (range.commonAncestorContainer.parentNode == editableDiv) {
    //                 caretPos = range.endOffset;
    //             }
    //         }
    //     } else if (document.selection && document.selection.createRange) {
    //         range = document.selection.createRange();
    //         if (range.parentElement() == editableDiv) {
    //             var tempEl = document.createElement("span");
    //             editableDiv.insertBefore(tempEl, editableDiv.firstChild);
    //             var tempRange = range.duplicate();
    //             tempRange.moveToElementText(tempEl);
    //             tempRange.setEndPoint("EndToEnd", range);
    //             caretPos = tempRange.text.length;
    //         }
    //     }
    //     return caretPos;
    // }


    // Application du style :
    //------------------------------------

    function applyStyle(style) {

        var val = "";
        if (style == "createLink")
            val = prompt('Saississez un lien :');

        if (style == "insertImage")
            val = prompt('Saississez une url d\'image:');

        document.execCommand(style, false,val);
    }

    // Vérification si text-align a une valeur :
    //--------------------------------------------

    function check_align(Node) {
        $(".justifyLeft").removeClass("active");
        switch (Node.style.textAlign) {

            case 'justify':
                $(".justifyFull").addClass("active");break;

            case 'right':
                $(".justifyRight").addClass("active");break;

            case 'center':
                $(".justifyCenter").addClass("active");break;

            case 'left':
                $(".justifyLeft").addClass("active");break;

            case '':
                if (!$(".justifyRight").hasClass("active") &&
                    !$(".justifyCenter").hasClass("active") &&
                    !$(".justifyFull").hasClass("active"))
                    $(".justifyLeft").addClass("active");
                break;
        }

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


    function startup() {
        colorWell = document.querySelector("#colorWell");
        colorWell.value = defaultColor;
        colorWell.addEventListener("input", updateFirst, false);
        colorWell.addEventListener("change", updateAll, false);
        colorWell.select();
    }

    function updateFirst(event) {
            color = event.target.value;
        document.execCommand("foreColor", false,color);
    }

    function updateAll(event) {
        color = event.target.value;
        document.execCommand("foreColor", false,color);
    }

    var colorWell;
    var defaultColor = "#0000ff";

    window.addEventListener("load", startup, false);

    $('#main').on('input', function(){
        console.log(this);
        // console.log(getCaretPosition(this));
    });

    $('.heading').on("change", function() {
        document.execCommand("formatBlock", false,"<" + $(this).val() + ">");
    });

    $("#main").on("click", function() {
        check_style_for_buttons();
    });



    $(".icone").on("click", function() {
        var action = $(this).attr("class").split(" ")[1];
        applyStyle(action);

        // maintainCaretonPositionIfNoSelection()
        check_style_for_buttons();
        // if (NoTextWasSelected())
        //     maintainCaretPosition();
            
    });




});