import { useState, useEffect } from 'react';
import { generateRandomBase, getColorName, validateInput, alignChannel } from '../utils/colorUtils';

// Custom hook for managing color families
export const useColorFamilies = (familyCount) => {
	const [families, setFamilies] = useState([]);
	const [selectedFamily, setSelectedFamily] = useState(null);

	// Initialize families
	useEffect(() => {
		if (families.length === 0) {
			const newFamilies = [];
			for (let i = 0; i < familyCount; i++) {
				const base = generateRandomBase();
				newFamilies.push({
					base,
					name: getColorName(base.h, base.l, base.c),
					customName: false,
				});
			}
			setFamilies(newFamilies);
			if (newFamilies.length > 0) setSelectedFamily(0);
		}
	}, [familyCount]);

	// Update family count
	useEffect(() => {
		if (families.length < familyCount) {
			const newFamilies = [...families];
			while (newFamilies.length < familyCount) {
				const base = generateRandomBase();
				newFamilies.push({
					base,
					name: getColorName(base.h, base.l, base.c),
					customName: false,
				});
			}
			setFamilies(newFamilies);
		} else if (families.length > familyCount) {
			setFamilies(families.slice(0, familyCount));
			if (selectedFamily >= familyCount) {
				setSelectedFamily(familyCount - 1);
			}
		}
	}, [familyCount, families.length, selectedFamily]);

	const updateSelectedFamily = (field, value) => {
		if (selectedFamily === null) return;
		const newFamilies = [...families];
		const family = newFamilies[selectedFamily];

		if (field === 'name') {
			family.name = value;
			family.customName = true;
		} else {
			const min = 0;
			const max = field === 'h' ? 360 : 100;

			const numValue = typeof value === 'string' ? parseFloat(value) : value;
			if (!isNaN(numValue)) {
				family.base[field] = Math.max(min, Math.min(max, numValue));
				if (!family.customName) {
					family.name = getColorName(family.base.h, family.base.l, family.base.c);
				}
			}
		}
		setFamilies(newFamilies);
	};

	const resetFamilyName = () => {
		if (selectedFamily === null) return;
		const newFamilies = [...families];
		newFamilies[selectedFamily].customName = false;
		newFamilies[selectedFamily].name = getColorName(
			newFamilies[selectedFamily].base.h,
			newFamilies[selectedFamily].base.l,
			newFamilies[selectedFamily].base.c
		);
		setFamilies(newFamilies);
	};

	const alignFamiliesChannel = (channel) => {
		const alignedFamilies = alignChannel(families, channel, selectedFamily);
		setFamilies(alignedFamilies);
	};

	return {
		families,
		selectedFamily,
		setSelectedFamily,
		updateSelectedFamily,
		resetFamilyName,
		alignFamiliesChannel,
	};
};

// Custom hook for managing input validation
export const useInputValidation = () => {
	const [inputErrors, setInputErrors] = useState({});

	const validateAndSetError = (value, min, max, fieldId) => {
		return validateInput(value, min, max, fieldId, inputErrors, setInputErrors);
	};

	return {
		inputErrors,
		validateAndSetError,
	};
};

// Custom hook for managing global controls
export const useGlobalControls = () => {
	const [familyCount, setFamilyCount] = useState(1);
	const [stepsMin, setStepsMin] = useState(3);
	const [stepsMax, setStepsMax] = useState(3);
	const [transformMin, setTransformMin] = useState({ l: -42, c: 8, h: -4 });
	const [transformMax, setTransformMax] = useState({ l: 42, c: -8, h: 4 });
	const [curveType, setCurveType] = useState('sinusoidal');
	const [exportFormat, setExportFormat] = useState('oklch');

	return {
		familyCount,
		setFamilyCount,
		stepsMin,
		setStepsMin,
		stepsMax,
		setStepsMax,
		transformMin,
		setTransformMin,
		transformMax,
		setTransformMax,
		curveType,
		setCurveType,
		exportFormat,
		setExportFormat,
	};
};
