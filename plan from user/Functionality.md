## Variables
### Global
- color space: array: 
	- name: the color space in which all calculations will happen and how color values will be edited. Default: OKLCH
	- channels: array: for each channel
		- label: e.g. Lightness
		- abbreviation: e.g. L
		- min: e.g. 0
		- max: e.g. 100
- families: integer: the number of hue families
	- default: 1, min: 1, max: 21
- variations: array: the number of swatches toward the respective direction (min or max) from the hue family's base color in the middle
	- to min: integer: default: 1, min: 1, max: 21
	- to max: integer: default: 1, min: 1, max: 21
- transform: array
	- to min: array:
		- for each channel store its numeric value as a percentage of the channel's range to an arbitrary number of decimal places as needed. e.g. L: +40, C: -8, H: +4
	- to max: array:
		- for each channel store its numeric value as a percentage of the channel's range to an arbitrary number of decimal places as needed. e.g. L: +40, C: -8, H: +4
	- curve: 
		- pre-defined bezier curves: the easing function used when calculating the delta between variations within a hue family e.g. linear, cubic, quint, etc.
### Scoped
- hue family
	- label: string: name identifying the hue family to be used in UI as well as export
	- base: color: the swatch in the middle from which all other variations in the family are derived
	- min: color: base + transform to min
	- max: color: base + transform to max
## Functions
### Edit hue family
- When hue family has focus: show color channel controls to edit each channel of the family’s base color. update colors on any value change
### Update colors
each time any property that affects colors changes, all affected colors should update along with their family name if the base color changed and that family's name has not been overridden by the user
### Export
- copy svg: each family is a row of 24px squares displaying their swatches in order
- copy css: create css custom properties using the family's name and an increasing integer for each swatch starting at 1