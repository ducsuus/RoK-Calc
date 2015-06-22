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

// Function to move a layer upwards (increase index)
function moveLayerUp(id){
    // If the new proposed position is not out of the bounds of the array...
    if (id + 1 < grid_list.length){
        // Copy the target into a temp array
        var temp_grid = grid_list[id];

        // Delete the old copy
        grid_list.splice(id, 1);

        // Add (duplicate) the layer
        grid_list.splice(id + 1, 0, temp_grid);

        // Update the currently displayed grid
        current_grid = id + 1;

        updateGrid();
        updateSideButtons();
    }   
}


// Function to move a layer downwards (decrease index)
function moveLayerDown(id){
    // If the new proposed position is not out of the bounds of the array...
    if (id - 1 >= 0){
        // Copy the target into a temp array
        var temp_grid = grid_list[id];

        // Delete the old copy
        grid_list.splice(id, 1);

        // Add (duplicate) the layer
        grid_list.splice(id - 1, 0, temp_grid);

        // Update the currently displayed grid
        current_grid = id - 1;

        updateGrid();
        updateSideButtons();
    }   
}

// Function to duplicate a layer
function duplicateLayer(id){

    /* So JavaScript loves to copy references to arrays, instead of "actual" arrays... We have to loop through the array and manually make a copy of each value... */

    var new_grid = []
    var size = grid_list[current_grid].length;
    for (var x = 0; x < size; x++){
        new_grid.push([]);
        for (var y = 0; y < size; y++){
            new_grid[x].push(grid_list[id][x][y]);
        }
    }

    grid_list.splice(id, 0, new_grid);
    // TODO: this could possible be an useless function call - if not needed, remove
    updateGrid();
    updateSideButtons();
    updateTable();

}

// Function to switch to a layer, using a given ID (the id being the index of the layer in grid_list)
function switchLayer(id){
    current_grid = id;
    updateGrid();
    updateSideButtons();
}

// Function to update (re-do) all of the side buttons
function updateSideButtons(){

    // Get the sidebar button container
    var sidebar = document.getElementById("sidebar-button-container");

    // Re-set the sidebar
    sidebar.innerHTML = "" ;

    // Loop through all the layers, each time add the new button
    for (var i = 0; i < grid_list.length; i++){

        // The button 'string' - this just generates the button HTML, and plugs the ID for that button into it
        var button_string = "<div id=\"layer-button-" + i + "\" class=\"sidebar-button" + ((i == current_grid) ? " sidebar-button-current" : "") + "\"><div onclick=\"switchLayer(" + i + ");\" class=\"sidebar-button-clickbox\"></div><div onclick=\"switchLayer(" + i + ");\" class=\"sidebar-button-text\">" + i + "</div><i onclick=\"duplicateLayer(" + i + ");\" class=\"fa fa-3x fa-plus sidebar-button-duplicate\"></i><i onclick=\"removeLayer('" + i + "');\" class=\"fa fa-3x fa-times sidebar-button-remove\"></i><i onclick=\"moveLayerUp(" + i + ");\" class=\"fa fa-3x fa-arrow-up sidebar-button-moveup\"></i><i onclick=\"moveLayerDown(" + i + ");\" class=\"fa fa-3x fa-arrow-down sidebar-button-movedown\"></i></div>";
        // Add the button HTML to the begining of the sidebar (so it appears at the top)
        sidebar.innerHTML = button_string + sidebar.innerHTML;
    }

}

// Function to add an empty layer to the grid_list
function addLayer(){

    /* Generate and add the new grid */

    // Find ourselves an ID to use for the next layer
    var id = grid_list.length;

    // Generate a new empty layer
    var new_grid = []
    var size = grid_list[current_grid].length;
    for (var x = 0; x < size; x++){
        new_grid.push([]);
        for (var y = 0; y < size; y++){
            new_grid[x].push("e");
        }
    }

    // Push it to the grid_list
    grid_list.push(new_grid);

    // We should just be able to use this now
    updateSideButtons();

}

// Function to remove layers using a given ID. This ID is the index of the grid in the grid_list
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
        var squareSize = canvas.width / grid_list[current_grid].length;

        var xcoord = Math.floor(mouse_x / squareSize);
        var ycoord = Math.floor(mouse_y / squareSize);

        if (event.which == 1)
            grid_list[current_grid][xcoord][ycoord] = paint_item;
        if (event.which == 3)
            grid_list[current_grid][xcoord][ycoord] = "e";

        updateGrid();
        updateTable();
    }
}

// Function called when we release the mouse
// TODO: this is rather redundant, remove it or make it usefull?
function mouseUp(event){

    var rect = canvas.getBoundingClientRect();
    var mouse_x = event.clientX - rect.left;
    var mouse_y = event.clientY - rect.top;

}

// Function called when the mouse moves
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

        updateGrid();
        updateTable();
    }
}

// Funtion to clear the grid
function clearGrid(){
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to re-size the grid, clearing out the old grid contents
function changeSize(size){

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
    // Ensure the grid is never bigger than 100*100 TODO: re-evaluate if this is a good size; it doesn't lag, but maybe people need bigger?
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

// Function to draw an icon of something, like a block
// (x-coord, y-coord, width, height, name of the icon in the images object)
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

// Function to update the materials table.
function updateTable(){

    /* Get a list of the materials for the table */

    var materials = [];

    // Loop through all the layers
    for (var grid_index_iterator = 0; grid_index_iterator < grid_list.length; grid_index_iterator++){
        // Loop through the x axis
        for (var x = 0; x < grid_list[grid_index_iterator].length; x++){
            // Loop through the y axis
            for (var y = 0; y < grid_list[grid_index_iterator][x].length; y++){
                // Loop through the different materials in the recipe of the item in the current block
                for (var i = 0; i < item[grid_list[grid_index_iterator][x][y]].length; i++) {
                    // If the material is not already in the materials list insert it
                    if (typeof materials[item[grid_list[grid_index_iterator][x][y]][i][0]] == "undefined"){
                        materials[item[grid_list[grid_index_iterator][x][y]][i][0]] = item[grid_list[grid_index_iterator][x][y]][i][1];
                    } 
                    // Otherwise add it on to the existing material
                    else{
                        materials[item[grid_list[grid_index_iterator][x][y]][i][0]] += item[grid_list[grid_index_iterator][x][y]][i][1];
                    }
                }

            }
        }
    }

    /* Update the table */

    var table_string = "<tr><td>Material</td><td>Quantity</td></tr>"

    for (var property in materials){
        table_string += "<tr><td>" + property + "</td><td>" + materials[property] + "</td></tr>";

    }

    document.getElementById("table-materials").innerHTML = table_string;

}

// Function to update the grid which the user sees
function updateGrid(){

    // Variable to store list of variables
    var materials = new Array();

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
        }
    }

}

changeSize(10);
updateGrid();
updateSideButtons();
updateTable();
