# Reign Of Kings Calculator Logic

# A list of all the block types, linking to a list of all the materials needed to craft that block.

blocks = {"block" : [["stone", 2], ["wood", 100]],
          "cobble" : [["stone", 30]]
          }
# The parameters needed

user_block = str(input("Block: "))

user_perimeter = int(input("Perimeter: "))

user_height = int(input("Height: "))

# If details are valid
if user_block in blocks:

    # Print out the calculated details

    print("\n\n\n========\nBlocks And Materials\n========")

    block_count = user_perimeter * 4 * user_height

    print("Total Blocks: " + str(block_count))

    materials = blocks[user_block]

    # Work and print out the total number of blocks and materials

    for i in materials:
        i[1] *= block_count
        print(i[0] + ": " + str(i[1]))

        
