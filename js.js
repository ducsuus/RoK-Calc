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

var grid = [];

function getBlockCoords(x, y){
    var squareSize = canvas.width / grid.length;

    var xcoord = Math.floor(x / squareSize);
    var ycoord = Math.floor(y / squareSize);

}

// Function called on mouse down. Note that this will not work if the canvas does not start at the top left of the page.
function mouseDown(event){

    var mouse_x = event.pageX;
    var mouse_y = event.pageY;

    updateGrid();
}

function mouseUp(event){

    var mouse_x = event.pageX;
    var mouse_y = event.pageY;

}

function mouseMove(event){

    var mouse_x = event.pageX;
    var mouse_y = event.pageY;

    if(event.which == 1)
        console.log(mouse_x + " " + mouse_y);

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

    if (icon == "e")
        c.fillStyle = getRandomColor();
    if (icon == "r")
        c.fillStyle = "#FF0000";

    c.fillRect(x, y, x + w, y + h);

}

// Function to update the grid which the user sees
function updateGrid(){
    clearGrid();
    var width = grid.length;
    var height = grid[0].length;

    var squareSize = canvas.width / width;

    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){
            drawIcon(x * squareSize, y * squareSize, squareSize, squareSize, grid[x][y]);
        }
    }
}

changeSize(10);
updateGrid();
