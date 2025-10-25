## Channel-control
- important: value of input and slider are synchronized and will always be the same. when the value of one changes, the other also changes
- input:
	- number with stepper controls
	- on focus, entire value is selected
	- attribute value stored can have an arbitrary number of decimal places
	- display of the calculated value in the input will be rounded to 3 decimal places
	- user’s input will not be overridden. e.g. if user inputs a number with 7 decimal places, it is not rounded and remains with 7 decimal places.
	- if value is outside the channel range, value is clamped to the relevant limit, min or max
- slider:
	- min: channel range min e.g. color space LCH, channel L, min would be 0
	- max: channel range max e.g. color space LCH, channel L, max would be 100
	- slider drag control may not leave the bounds of the track. its center will be clamped to min or max even if value provided is outside the range
## Color-control
- a channel control for each channel of the current color space e.g. color space LCH would have 3 channel controls L, C, and H
## Hue-family
- group of related swatches derived from a base color using the global transform values
- on focus:
	- each swatch displays its channel values below the swatch. this can be in a table and the first column can show the channel labels e.g. L, C, and H then each cell under a swatch can just display the values without labels
## Swatch
- element representing a color
- div with a background of the color
- block-size: 100% relative to its immediate parent container
- inline-size: 1fr
