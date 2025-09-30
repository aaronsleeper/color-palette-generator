import React from 'react';
import { generateSwatches, colorToCSS } from '../utils/colorUtils';

// Color Swatch Component
export const ColorSwatch = ({ swatch, familyName, index }) => (
	<div
		className="color-swatch"
		style={{ backgroundColor: colorToCSS(swatch) }}
		title={`${familyName}-${String(index + 1).padStart(2, '0')}`}
	/>
);

// Color Family Component
export const ColorFamily = ({
	family,
	index,
	isSelected,
	onSelect,
	stepsMin,
	stepsMax,
	transformMin,
	transformMax,
	curveType,
}) => {
	const swatches = generateSwatches(family, stepsMin, stepsMax, transformMin, transformMax, curveType);

	return (
		<div
			className={`color-family ${isSelected ? 'selected' : ''}`}
			onClick={() => onSelect(index)}
		>
			<div className="color-family-label">
				<div className={`color-family-name ${family.customName ? '' : 'auto-generated'}`}>{family.name}</div>
			</div>
			<div className="color-family-swatches">
				{swatches.map((swatch, si) => (
					<ColorSwatch
						key={si}
						swatch={swatch}
						familyName={family.name}
						index={si}
					/>
				))}
			</div>
		</div>
	);
};

// Color Families List Component
export const ColorFamiliesList = ({
	families,
	selectedFamily,
	setSelectedFamily,
	stepsMin,
	stepsMax,
	transformMin,
	transformMax,
	curveType,
}) => (
	<div className="color-families">
		{families.map((family, fi) => (
			<ColorFamily
				key={fi}
				family={family}
				index={fi}
				isSelected={selectedFamily === fi}
				onSelect={setSelectedFamily}
				stepsMin={stepsMin}
				stepsMax={stepsMax}
				transformMin={transformMin}
				transformMax={transformMax}
				curveType={curveType}
			/>
		))}
	</div>
);
