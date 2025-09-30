// Color utility functions
import colorName from 'color-name';
import { formatRgb, oklch } from 'culori';

// Curve functions for color interpolation
export const curves = {
	linear: (t) => t,
	quadratic: (t) => t * t,
	cubic: (t) => t * t * t,
	sinusoidal: (t) => 0.5 - 0.5 * Math.cos(t * Math.PI),
	exponential: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
	smoothstep: (t) => t * t * (3 - 2 * t),
};

// Clamp values between min and max
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// Generate random base color (OKLCH)
// L: 0-100%, C: 0-150 (displayed as 0-100% where 100%=150), H: 0-360°
export const generateRandomBase = () => ({
	l: 40 + Math.random() * 20, // 40-60% lightness
	c: 7.5 + Math.random() * 15, // 5-15% of 150 (7.5-22.5)
	h: Math.random() * 360, // full hue range
});

// Advanced color naming using purpose-built library
export const getColorName = (h, l = 50, c = 10) => {
	try {
		// Convert OKLCH to RGB using culori
		const oklchColor = oklch({
			l: l / 100,
			c: c / 150,
			h: h,
		});

		// Convert to RGB format
		const rgbColor = formatRgb(oklchColor);

		// Extract RGB values
		const rgbMatch = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (!rgbMatch) {
			return getFallbackColorName(h);
		}

		const [, r, g, b] = rgbMatch.map(Number);

		// Find closest named color
		let closestName = '';
		let minDistance = Infinity;

		for (const [name, [namedR, namedG, namedB]] of Object.entries(colorName)) {
			const distance = Math.sqrt(Math.pow(r - namedR, 2) + Math.pow(g - namedG, 2) + Math.pow(b - namedB, 2));

			if (distance < minDistance) {
				minDistance = distance;
				closestName = name;
			}
		}

		return closestName || getFallbackColorName(h);
	} catch (error) {
		console.warn('Color naming failed, using fallback:', error);
		return getFallbackColorName(h);
	}
};

// Fallback color naming based on hue (original implementation)
const getFallbackColorName = (h) => {
	const names = [
		'red',
		'orange',
		'yellow',
		'lime',
		'green',
		'teal',
		'cyan',
		'sky',
		'blue',
		'indigo',
		'purple',
		'magenta',
	];
	return names[Math.floor(h / 30) % 12];
};

// Generate swatches for a family
export const generateSwatches = (family, stepsMin, stepsMax, transformMin, transformMax, curveType) => {
	const swatches = [];
	const curve = curves[curveType];

	const minColor = {
		l: clamp(family.base.l + transformMin.l, 0, 100),
		c: clamp(family.base.c + transformMin.c, 0, 150),
		h: (family.base.h + transformMin.h + 360) % 360,
	};

	const maxColor = {
		l: clamp(family.base.l + transformMax.l, 0, 100),
		c: clamp(family.base.c + transformMax.c, 0, 150),
		h: (family.base.h + transformMax.h + 360) % 360,
	};

	// Interpolate function
	const interpolate = (c1, c2, t) => {
		let hDelta = c2.h - c1.h;
		if (hDelta > 180) hDelta -= 360;
		if (hDelta < -180) hDelta += 360;

		return {
			l: c1.l + (c2.l - c1.l) * t,
			c: c1.c + (c2.c - c1.c) * t,
			h: (c1.h + hDelta * t + 360) % 360,
		};
	};

	// Generate toward min
	for (let i = stepsMin; i > 0; i--) {
		const t = curve(i / stepsMin);
		swatches.push(interpolate(family.base, minColor, t));
	}

	// Base
	swatches.push(family.base);

	// Generate toward max
	for (let i = 1; i <= stepsMax; i++) {
		const t = curve(i / stepsMax);
		swatches.push(interpolate(family.base, maxColor, t));
	}

	return swatches;
};

// Convert OKLCH to CSS
export const colorToCSS = (color, format = 'oklch') => {
	if (format === 'oklch') {
		return `oklch(${color.l.toFixed(1)}% ${((color.c / 150) * 100).toFixed(1)}% ${color.h.toFixed(1)})`;
	}
	return `oklch(${color.l.toFixed(1)}% ${((color.c / 150) * 100).toFixed(1)}% ${color.h.toFixed(1)})`;
};

// Generate CSS export
export const generateCSS = (families, stepsMin, stepsMax, transformMin, transformMax, curveType, exportFormat) => {
	let css = ':root {\n';
	families.forEach((family) => {
		const swatches = generateSwatches(family, stepsMin, stepsMax, transformMin, transformMax, curveType);
		swatches.forEach((swatch, si) => {
			const name = `--${family.name}-${String(si + 1).padStart(2, '0')}`;
			css += `  ${name}: ${colorToCSS(swatch, exportFormat)};\n`;
		});
	});
	css += '}';
	return css;
};

// Align channels across families
export const alignChannel = (families, channel) => {
	if (families.length === 0) return families;

	const newFamilies = [...families];

	if (channel === 'h') {
		// Distribute hues evenly
		const step = 360 / families.length;
		newFamilies.forEach((family, i) => {
			family.base.h = (i * step) % 360;
			if (!family.customName) {
				family.name = getColorName(family.base.h, family.base.l, family.base.c);
			}
		});
	} else {
		// Align to first family's value
		const targetValue = newFamilies[0].base[channel];
		newFamilies.forEach((family, i) => {
			if (i > 0) {
				family.base[channel] = targetValue;
			}
		});
	}

	return newFamilies;
};

// Input validation utilities
export const parseValueWithUnit = (valueStr) => {
	return parseFloat(valueStr.replace(/[^\d.-]/g, ''));
};

export const validateInput = (value, min, max, fieldId, inputErrors, setInputErrors) => {
	const numValue = parseFloat(value);

	if (isNaN(numValue)) {
		setInputErrors({ ...inputErrors, [fieldId]: `Must be a number` });
		return null;
	}

	if (numValue < min || numValue > max) {
		setInputErrors({ ...inputErrors, [fieldId]: `Must be between ${min} and ${max}` });
		return clamp(numValue, min, max);
	}

	// Clear error for this field
	const newErrors = { ...inputErrors };
	delete newErrors[fieldId];
	setInputErrors(newErrors);

	return numValue;
};

// Copy to clipboard utility
export const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		alert('Copied to clipboard!');
	} catch (err) {
		console.error('Failed to copy:', err);
	}
};

// Handle input focus - select all text
export const handleInputFocus = (e) => {
	e.target.select();
};
