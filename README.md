# RoK-Calc
A calculator for building bases in the game Reign Of Kings.

# RoK-Calc Specification

A calculator designed to make working out how many materials are needed to build a base in the game Reign Of Kings.

## Front End

The calculator must be able to allow the use of a custom perimeter, height, and material of wall to be used.

The calculator should then work out the amount of blocks needed, then how many materials will be needed to make all of those blocks. The calculator should then display both values. The calculator may display the time taken to craft all of the blocks. The calculator may be able to work out the raw materials needed.

The calculator may provide a way for progress towards goals to be stored. The calculator may allow for more than one wall, or custom amount of blocks, to be added.

The calculator may have a responsive web design (eg Bootstrap).

## Logic

An object/database should store a list of all block types, which links to or contains a list of all the different materials, and the amount required.

The calculator should receive an input from the use which allows the user to use custom values.

The calculator should then calculate and display the details in question.


