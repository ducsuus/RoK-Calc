// RoK-Calc JavaScript

var results = document.getElementById("info-calc-results");

var block = new Array();

block["block"] = [
		["stone", 9999], 
		["wood", 9999], 
		["dirt", 9999], 
		["hay", 9999], 
		["clay", 9999], 
		["iron", 9999], 
		["stone slab", 9999]
		];

block["sod"] = [["dirt", 5]];
block["thatch"] = [["hay", 5]];
block["clay"] = [["clay", 10]]
block["wood"] = [["wood", 30]];
block["log"] = [["wood", 70]];
block["cobble"] = [["stone", 30]];
block["iron"] = [["wood", 50], ["iron", 1]];
block["stone"] = [["stone slab", 1], ["clay", 5]];


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

	var block_type = document.getElementById("block_type").value;
    var side_length = document.getElementById("side_length").value;
    var wall_height = document.getElementById("wall_height").value;

    if (!isNaN(side_length) && !isNaN(wall_height)) {

        var total_blocks = side_length * 4 * wall_height;
        var materials = getMaterials(total_blocks, block_type);

        updateInfo(total_blocks, materials);
    }
    else{

    }
}