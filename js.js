/* RoK-Calc wallselect test js */

var canvas = document.getElementById("wallselect");

// Set the default canvas sizes
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

// Background image
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

// Grid to store on screen blocks TODO: remove; replaced with grid_list[current_grid]
var grid = [];

// List of all the grid layers
var grid_list = [[]];

// The grid currently being used on screen
var current_grid = 0;

// The item currently being used to paint, TODO: re-evalutate the default value (its cobble for debug reasons)
var paint_item = "cobble";

// Function to switch to a layer, using a given ID (the id being the index of the layer in grid_list)
function switchLayer(id){
    current_grid = id;
    updateGrid();
}

// Function to update (re-do) all of the side buttons
function updateSideButtons(){

    // Get the sidebar button container
    var sidebar = document.getElementById("sidebar-button-container");

    // Re-set the sidebar
    sidebar.innerHTML = "" ;

    // Loop through all the layers, each time add the new button
    for (var i = 0; i < grid_list.length; i++){
        // TODO: Update this to make sure that all the onclicks are correct - replace the alert()s with an actual function!
        var button_string = "<div id=\"layer-button-" + i + "\" class=\"sidebar-button\"><div onclick=\"switchLayer(" + i + ");\" class=\"sidebar-button-clickbox\"></div><div onclick=\"switchLayer(" + i + ");\" class=\"sidebar-button-text\">" + i + "</div><i onclick=\"alert('" + i + "-2');\" class=\"fa fa-3x fa-plus sidebar-button-duplicate\"></i><i onclick=\"removeLayer('" + i + "');\" class=\"fa fa-3x fa-times sidebar-button-remove\"></i><i onclick=\"alert('" + i + "-4');\" class=\"fa fa-3x fa-arrow-up sidebar-button-moveup\"></i><i onclick=\"alert('" + i + "-5');\" class=\"fa fa-3x fa-arrow-down sidebar-button-movedown\"></i></div>";
        sidebar.innerHTML += button_string;
    }

}

// Function to add an empty layer to the grid_list
function addLayer(){

    /* Generate and add the new grid */

    // Find ourselves an ID to use for the next layer
    var id = grid_list.length;

    var size = grid_list[current_grid].length;

    // Generate a new empty layer
    var new_grid = []
    for (var x = 0; x < size; x++){
        new_grid.push([]);
        for (var y = 0; y < size; y++){
            new_grid[x].push("e");
        }
    }

    // Push it to the grid_list
    grid_list.push(new_grid);

    /* Generate and add the new button 

    var sidebar = document.getElementById("sidebar");

    // TODO: Update this to make sure that all the onclicks are correct - replace the alert()s with an actual function!
    var button_string = "<div id=\"layer-button-" + id + "\" class=\"sidebar-button\"><div onclick=\"alert('" + id + "-1');\" class=\"sidebar-button-clickbox\"></div><div onclick=\"alert('" + id + "-1');\" class=\"sidebar-button-text\">" + id + "</div><i onclick=\"alert('" + id + "-2');\" class=\"fa fa-3x fa-plus sidebar-button-duplicate\"></i><i onclick=\"removeLayer('" + id + "');\" class=\"fa fa-3x fa-times sidebar-button-remove\"></i><i onclick=\"alert('" + id + "-4');\" class=\"fa fa-3x fa-arrow-up sidebar-button-moveup\"></i><i onclick=\"alert('" + id + "-5');\" class=\"fa fa-3x fa-arrow-down sidebar-button-movedown\"></i></div>";

    sidebar.innerHTML += button_string;*/

    // We should just be able to use this now
    updateSideButtons();

}

// Function to remove layers using a given ID. This ID is the index of the grid in the grid_list

/* TODO WARNING:

 As of writing this, there was a massive flaw in the design of the naming system; buttons with a higher index than that of the button being deleted tend to have an index that is no longer valid; different to what it was. It therefore causes the delete button to not work properly.

 Joe may have fixed this bug, however it is also likely he managed to forget about it. To check if the bug is still there, add 12 buttons, then remove the second lowest number 6 times. If when you add a new layer it is not named correctly (the total number of layers) the bug is still here. Probably. */
function removeLayer(id){

    if(grid_list.length > 1 && confirm("Are you sure you want to delete this layer? (Layer " + id + ")")){
    // Remove the grid: remove 1 elements starting from the index id
    grid_list.splice(id, 1);

    // Update the grid
    updateSideButtons();
    }
}

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

    var rect = canvas.getBoundingClientRect();
    var mouse_x = event.clientX - rect.left;
    var mouse_y = event.clientY - rect.top;

    // If we are pressing left click (1) or right click (3)
    if(event.which == 1 || event.which == 3){
        console.log(grid_list[current_grid].length);
        var squareSize = canvas.width / grid_list[current_grid].length;

        var xcoord = Math.floor(mouse_x / squareSize);
        var ycoord = Math.floor(mouse_y / squareSize);

        if (event.which == 1)
            grid_list[current_grid][xcoord][ycoord] = paint_item;
        if (event.which == 3)
            grid_list[current_grid][xcoord][ycoord] = "e";

        updateGrid()
    }
}

function mouseUp(event){

    var rect = canvas.getBoundingClientRect();
    var mouse_x = event.clientX - rect.left;
    var mouse_y = event.clientY - rect.top;

}

function mouseMove(event){

    var rect = canvas.getBoundingClientRect();
    var mouse_x = event.clientX - rect.left;
    var mouse_y = event.clientY - rect.top;

    // If we are pressing left click (1) or right click (3)
    if(event.which == 1 || event.which == 3){
        var squareSize = canvas.width / grid_list[current_grid].length;

        var xcoord = Math.floor(mouse_x / squareSize);
        var ycoord = Math.floor(mouse_y / squareSize);

        if (event.which == 1)
            grid_list[current_grid][xcoord][ycoord] = paint_item;
        if (event.which == 3)
            grid_list[current_grid][xcoord][ycoord] = "e";

        updateGrid()
    }
}

function clearGrid(){
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to re-size the grid, clearing out the old grid contents
function changeSize(size){
    // Legacy code when layers were not a thing...
    /*grid = []
    for (var x = 0; x < size; x++){
        grid.push([]);
        for (var y = 0; y < size; y++){
            grid[x].push("e");
        }
    }*/

    grid_list = [[]];

    current_grid = 0;

    for (var x = 0; x < size; x++){
        grid_list[current_grid].push([]);
        for (var y = 0; y < size; y++){
            grid_list[current_grid][x].push("e");
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

// Generate random color
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
    var width = grid_list[current_grid].length;
    var height = grid_list[current_grid][0].length;

    // Workout each square's size
    var squareSize = canvas.width / width;

    // Loop through the grid array and fill out each icon.
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            drawIcon(x * squareSize, y * squareSize, squareSize, squareSize, grid_list[current_grid][x][y]);

            // For the current tile add its materials to the material list in preparation for updating the table next
            // Loop through the recipe, copy, and adjust all recipe materials
            for (var i = 0; i < item[grid_list[current_grid][x][y]].length; i++) {
                if (typeof materials[item[grid_list[current_grid][x][y]][i][0]] == "undefined"){
                    materials[item[grid_list[current_grid][x][y]][i][0]] = item[grid_list[current_grid][x][y]][i][1];
                } else{
                    materials[item[grid_list[current_grid][x][y]][i][0]] += item[grid_list[current_grid][x][y]][i][1];
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
