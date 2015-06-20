// RoK-Calc JavaScript

var results = document.getElementById("info-calc-results");

var block = new Array();

block["block"] = [
    ["stone", 9999],
    ["wood", 9999]
];
block["cobble"] = [
    ["stone", 30]
];


function updateInfo(total_blocks, materials) {
    results.innerHTML = materials;
}

function getMaterials(total_blocks, block_type) {
    /* Note that the array cannot be directly copied, therefore the following code is non functional and serves as an example of what not to do (JavaScript cannot copy arrays)*/
    /*
    console.log("materials: " + block[block_type]);
    var materials = block[block_type].slice(0);

    for(var i = 0; i < materials.length; i++){
    	materials[i][1] *= total_blocks;
    }*/

    // Create new array to store materials list in
    var materials = [];

    // Loop through the recipe, copy, and adjust all recipe materials
    for (var i = 0; i < block[block_type].length; i++) {
        materials.push([block[block_type][i][0], block[block_type][i][1] * total_blocks]);
    }

    return materials
}

function submitdata() {
    var block_type = "cobble";
    var side_length = document.getElementById("side_length").value;
    var wall_height = document.getElementById("wall_height").value;

    if (!isNaN(side_length) && !isNaN(wall_height)) {

        var total_blocks = side_length * 4 * wall_height;
        var materials = getMaterials(total_blocks, block_type);

        updateInfo(total_blocks, materials);
    }
}