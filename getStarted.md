InitiateEditor Plugin JQuery

## Description:

- A cententEditable section allow you to write text,
- Watch HTML with Code tab,
- A toolbar:

.Select differents titles,
.Bold ou italic,
.Bulleted list or Ordered list,
.Align right, center, left or justify,
.Add link or remove,
.Add image,
.Modify color of font,
.Erase style of the selected text.


### Prerequisites

create an HTML page with an <tag class="YourClassName"> 


### Init HTML

            $("#container").initiateEditor({
                "list_functions":
                    [
                        'headings',
                        'bold',
                        'italic',
                        'insertUnorderedList',
                        'insertOrderedList',
                        'justifyLeft',
                        'justifyCenter',
                        'justifyRight',
                        'justifyFull',
                        'createLink',
                        'unlink',
                        'foreColor',
                        'insertImage',
                        'removeFormat'
                    ],
                "dimensions": {
                    "width": "800px",
                    "height": "800px"
                },
                "responsive": true,
                "backGroundColorFunctions": "#C00",
                "VisuCode": true
            });
  


add  <link rel="stylesheet" type="text/css" href="css/pluginjjvl.css"> <!-- on the head -->
add  <script type="text/javascript" src="js/pluginjjvl.js"></script> <!-- on the bottom of the body -->

## Get Started:

the plugin  is full option by default!


Customize your ToolBox with ### Init HTML :

Choose one of the items on the "list_functions" you want to use


Personnalize toolsbox background-Color :  "backGroundColorFunctions": "#C00", (modify by Exadecimal color)

Personnalize your Dimension : "dimensions": {
                    "width": "800px", 
                    "height": "800px"

Unable html code tag view as an option : "VisuCode": true




