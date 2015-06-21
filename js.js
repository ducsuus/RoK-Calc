/* RoK-Calc wallselect test js */

var canvas = document.getElementById("wallselect");

// Wanted to make the canvas small for dev purposes, TODO: maybe remove this.
canvas.style.width = "800px";
canvas.style.height = "800px";
canvas.width = 800;
canvas.height = 800;

// Mouse events
canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);

// Make sure that if the canvas is selected, we unselect it
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

// Create the context
var c = canvas.getContext("2d");

// Get all of the images and place them in a "dictonary"
var images = new Array();

// Background image (John) TODO: change this! John wanted non-flashy colors, so I gave his face instead, turns out I'm not allowed to become a bilionaire off his face!
images["e"] = new Image();
images["e"].src = "e.png";

images["e"].onload = function(){
    updateGrid();
}

// Actual blocks now, obviously named individually
images["sod"] = new Image();
images["sod"].src = "sod.png";

images["thatch"] = new Image();
images["thatch"].src = "thatch.png";

images["clay"] = new Image();
images["clay"].src = "clay.png";

images["wood"] = new Image();
images["wood"].src = "wood.png";

images["log"] = new Image();
images["log"].src = "log.png";

images["cobble"] = new Image();
images["cobble"].src = "cobble.png";

images["iron"] = new Image();
images["iron"].src = "iron.png";

images["stone"] = new Image();
images["stone"].src = "stone.png";

// Item recipe list
var item = new Array();

item["e"] = [];

item["item"] = [
        ["stone", 9999], 
        ["wood", 9999], 
        ["dirt", 9999], 
        ["hay", 9999], 
        ["clay", 9999], 
        ["iron", 9999], 
        ["stone slab", 9999]
        ];

// Blocks
item["sod"] = [["dirt", 5]];
item["thatch"] = [["hay", 5]];
item["clay"] = [["clay", 10]]
item["wood"] = [["wood", 30]];
item["log"] = [["wood", 70]];
item["cobble"] = [["stone", 30]];
item["iron"] = [["wood", 50], ["iron", 1]];
item["stone"] = [["stone slab", 1], ["clay", 5]];

// Grid to store on screen blocks
var grid = [];

var paint_item = "cobble";

// Function to reset button highlighting and highlight the current button
function updateItemPaintButtonHighlight(){

    document.getElementById("button-sod").style.border = "";
    document.getElementById("button-thatch").style.border = "";
    document.getElementById("button-clay").style.border = "";
    document.getElementById("button-wood").style.border = "";
    document.getElementById("button-log").style.border = "";
    document.getElementById("button-cobble").style.border = "";
    document.getElementById("button-iron").style.border = "";
    document.getElementById("button-stone").style.border = "";

    document.getElementById("button-" + paint_item).style.border = "4px solid red";

}

// Function called on mouse down. Note that this will not work if the canvas does not start at the top left of the page.
function mouseDown(event){

    var mouse_x;
    var mouse_y;

    if (event.pageX || event.pageY) { 
        mouse_x = event.pageX;
        mouse_y = event.pageY;
    }
    else { 
        mouse_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        mouse_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    mouse_x -= canvas.offsetLeft;
    mouse_y -= canvas.offsetTop;

    // If we are pressing left click (1) or right click (3)
    if(event.which == 1 || event.which == 3){
        console.log(grid.length);
        var squareSize = canvas.width / grid.length;

        var xcoord = Math.floor(mouse_x / squareSize);
        var ycoord = Math.floor(mouse_y / squareSize);

        if (event.which == 1)
            grid[xcoord][ycoord] = paint_item;
        if (event.which == 3)
            grid[xcoord][ycoord] = "e";

        updateGrid()
    }
}

function mouseUp(event){

    var mouse_x = event.pageX;
    var mouse_y = event.pageY;
}

function mouseMove(event){

    var mouse_x;
    var mouse_y;

    if (event.pageX || event.pageY) { 
        mouse_x = event.pageX;
        mouse_y = event.pageY;
    }
    else { 
        mouse_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        mouse_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    mouse_x -= canvas.offsetLeft;
    mouse_y -= canvas.offsetTop;

    // If we are pressing left click (1) or right click (3)
    if(event.which == 1 || event.which == 3){
        var squareSize = canvas.width / grid.length;

        var xcoord = Math.floor(mouse_x / squareSize);
        var ycoord = Math.floor(mouse_y / squareSize);

        if (event.which == 1)
            grid[xcoord][ycoord] = paint_item;
        if (event.which == 3)
            grid[xcoord][ycoord] = "e";

        updateGrid()
    }
}

function clearGrid(){
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to re-size the grid, clearing out the old grid contents
function changeSize(size){
    grid = []
    for (var x = 0; x < size; x++){
        grid.push([]);
        for (var y = 0; y < size; y++){
            grid[x].push("e");
        }
    }
}

// Function to be called upon the update of the size by the user
function updateSize(){
    // Ensure the grid is never bigger than 1000*1000
    changeSize(Math.min(100, document.getElementById("grid_size").value));
    updateGrid();
}

// Function to be called upon the update of the grid size by the user
function updateGridSize(){
    var grid_display_size = document.getElementById("grid_display_size").value;
    canvas.style.width = grid_display_size.toString() + "px";
    canvas.style.height = grid_display_size.toString() + "px";
    canvas.width = grid_display_size;
    canvas.height = grid_display_size;
    updateGrid();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to draw an icon of something, like a block.
function drawIcon(x, y, w, h, icon){

    if (icon in images){
        c.drawImage(images[icon], x, y, w, h);
        return;
    }

    if (icon == "e")
        c.fillStyle = getRandomColor();
    if (icon == "r")
        c.fillStyle = "#FF0000";

    c.fillRect(x, y, x + w, y + h);

}

// Function to update the grid which the user sees
function updateGrid(){

    // Variable to store list of variables
    var materials = new Array();

    /* Update the grid */

    // Clear the grid
    clearGrid();

    // Work out the height and width of the grid, it may have changed
    var width = grid.length;
    var height = grid[0].length;

    // Workout each square's size
    var squareSize = canvas.width / width;

    // Loop through the grid array and fill out each icon.
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            drawIcon(x * squareSize, y * squareSize, squareSize, squareSize, grid[x][y]);

            // For the current tile add its materials to the material list in preparation for updating the table next
            // Loop through the recipe, copy, and adjust all recipe materials
            for (var i = 0; i < item[grid[x][y]].length; i++) {
                if (typeof materials[item[grid[x][y]][i][0]] == "undefined"){
                    materials[item[grid[x][y]][i][0]] = item[grid[x][y]][i][1];
                } else{
                    materials[item[grid[x][y]][i][0]] += item[grid[x][y]][i][1];
                }
            }
        }
    }

    /* Update the table below the grid */

    var table_string = "<tr><td>Material</td><td>Quantity</td></tr>"

    for (var property in materials){
        table_string += "<tr><td>" + property + "</td><td>" + materials[property] + "</td></tr>";

    }

    document.getElementById("table-materials").innerHTML = table_string;

}

changeSize(10);
updateGrid();
