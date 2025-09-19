import React, { useState, useEffect, useRef } from 'react';

// Enhanced color naming function with more accurate names
const getColorName = (l, c, h) => {
	// Normalize hue to 0-360
	const hue = ((h % 360) + 360) % 360;
	const lightness = l * 100;
	const chroma = c * 100;

	// Achromatic colors (very low chroma)
	if (chroma < 2) {
		if (lightness < 10) return 'black';
		if (lightness < 20) return 'charcoal';
		if (lightness < 30) return 'dark gray';
		if (lightness < 50) return 'gray';
		if (lightness < 70) return 'light gray';
		if (lightness < 85) return 'silver';
		if (lightness < 95) return 'white';
		return 'white';
	}

	// Very low chroma colors
	if (chroma < 5) {
		if (lightness < 20) return 'dark gray';
		if (lightness < 40) return 'gray';
		if (lightness < 60) return 'light gray';
		return 'pale gray';
	}

	// Low chroma colors
	if (chroma < 15) {
		if (hue >= 345 || hue < 15) {
			if (lightness < 30) return 'dark red';
			if (lightness < 50) return 'red';
			if (lightness < 70) return 'light red';
			return 'pale red';
		}
		if (hue < 45) {
			if (lightness < 30) return 'dark orange';
			if (lightness < 50) return 'orange';
			if (lightness < 70) return 'light orange';
			return 'pale orange';
		}
		if (hue < 75) {
			if (lightness < 30) return 'dark yellow';
			if (lightness < 50) return 'yellow';
			if (lightness < 70) return 'light yellow';
			return 'pale yellow';
		}
		if (hue < 165) {
			if (lightness < 30) return 'dark green';
			if (lightness < 50) return 'green';
			if (lightness < 70) return 'light green';
			return 'pale green';
		}
		if (hue < 195) {
			if (lightness < 30) return 'dark cyan';
			if (lightness < 50) return 'cyan';
			if (lightness < 70) return 'light cyan';
			return 'pale cyan';
		}
		if (hue < 255) {
			if (lightness < 30) return 'dark blue';
			if (lightness < 50) return 'blue';
			if (lightness < 70) return 'light blue';
			return 'pale blue';
		}
		if (hue < 285) {
			if (lightness < 30) return 'dark purple';
			if (lightness < 50) return 'purple';
			if (lightness < 70) return 'light purple';
			return 'pale purple';
		}
		if (hue < 315) {
			if (lightness < 30) return 'dark magenta';
			if (lightness < 50) return 'magenta';
			if (lightness < 70) return 'light magenta';
			return 'pale magenta';
		}
		return 'pink';
	}

	// Medium chroma colors
	if (chroma < 25) {
		if (hue >= 345 || hue < 15) {
			if (lightness < 25) return 'burgundy';
			if (lightness < 40) return 'crimson';
			if (lightness < 55) return 'red';
			if (lightness < 70) return 'coral';
			return 'salmon';
		}
		if (hue < 45) {
			if (lightness < 25) return 'brown';
			if (lightness < 40) return 'orange';
			if (lightness < 55) return 'amber';
			if (lightness < 70) return 'peach';
			return 'cream';
		}
		if (hue < 75) {
			if (lightness < 25) return 'olive';
			if (lightness < 40) return 'gold';
			if (lightness < 55) return 'yellow';
			if (lightness < 70) return 'lemon';
			return 'ivory';
		}
		if (hue < 165) {
			if (lightness < 25) return 'forest';
			if (lightness < 40) return 'emerald';
			if (lightness < 55) return 'green';
			if (lightness < 70) return 'lime';
			return 'mint';
		}
		if (hue < 195) {
			if (lightness < 25) return 'teal';
			if (lightness < 40) return 'turquoise';
			if (lightness < 55) return 'cyan';
			if (lightness < 70) return 'aqua';
			return 'mint';
		}
		if (hue < 255) {
			if (lightness < 25) return 'navy';
			if (lightness < 40) return 'royal blue';
			if (lightness < 55) return 'blue';
			if (lightness < 70) return 'sky blue';
			return 'powder blue';
		}
		if (hue < 285) {
			if (lightness < 25) return 'indigo';
			if (lightness < 40) return 'violet';
			if (lightness < 55) return 'purple';
			if (lightness < 70) return 'lavender';
			return 'lilac';
		}
		if (hue < 315) {
			if (lightness < 25) return 'maroon';
			if (lightness < 40) return 'magenta';
			if (lightness < 55) return 'fuchsia';
			if (lightness < 70) return 'pink';
			return 'rose';
		}
		return 'pink';
	}

	// High chroma colors
	if (hue >= 345 || hue < 15) {
		if (lightness < 30) return 'burgundy';
		if (lightness < 45) return 'crimson';
		if (lightness < 60) return 'red';
		if (lightness < 75) return 'coral';
		return 'salmon';
	}
	if (hue < 45) {
		if (lightness < 30) return 'brown';
		if (lightness < 45) return 'orange';
		if (lightness < 60) return 'amber';
		if (lightness < 75) return 'peach';
		return 'cream';
	}
	if (hue < 75) {
		if (lightness < 30) return 'olive';
		if (lightness < 45) return 'gold';
		if (lightness < 60) return 'yellow';
		if (lightness < 75) return 'lemon';
		return 'ivory';
	}
	if (hue < 165) {
		if (lightness < 30) return 'forest';
		if (lightness < 45) return 'emerald';
		if (lightness < 60) return 'green';
		if (lightness < 75) return 'lime';
		return 'mint';
	}
	if (hue < 195) {
		if (lightness < 30) return 'teal';
		if (lightness < 45) return 'turquoise';
		if (lightness < 60) return 'cyan';
		if (lightness < 75) return 'aqua';
		return 'mint';
	}
	if (hue < 255) {
		if (lightness < 30) return 'navy';
		if (lightness < 45) return 'royal blue';
		if (lightness < 60) return 'blue';
		if (lightness < 75) return 'sky blue';
		return 'powder blue';
	}
	if (hue < 285) {
		if (lightness < 30) return 'indigo';
		if (lightness < 45) return 'violet';
		if (lightness < 60) return 'purple';
		if (lightness < 75) return 'lavender';
		return 'lilac';
	}
	if (hue < 315) {
		if (lightness < 30) return 'maroon';
		if (lightness < 45) return 'magenta';
		if (lightness < 60) return 'fuchsia';
		if (lightness < 75) return 'pink';
		return 'rose';
	}
	return 'pink';
};

// Easing functions
const easingFunctions = {
	linear: (t) => t,
	ease: (t) => t * t * (3 - 2 * t),
	'ease-in': (t) => t * t,
	'ease-out': (t) => 1 - (1 - t) * (1 - t),
	'ease-in-out': (t) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)),
	sine: (t) => 1 - Math.cos((t * Math.PI) / 2),
	quart: (t) => t * t * t * t,
	custom: (t, points) => {
		// Simple cubic bezier implementation
		if (!points || points.length !== 4) return t;
		const [p0, p1, p2, p3] = points;
		const u = 1 - t;
		return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
	},
};

// Curve Icons for different easing types
const CurveIcon = ({ type, size = 16 }) => {
	const pathsByType = {
		linear: 'M2,14 L14,2',
		ease: 'M2,14 Q6,10 8,8 T14,2',
		'ease-in': 'M2,14 Q2,12 4,10 Q8,6 14,2',
		'ease-out': 'M2,14 Q8,10 12,6 Q14,4 14,2',
		'ease-in-out': 'M2,14 Q2,10 6,8 Q10,6 14,2',
		sine: 'M2,14 Q6,12 8,8 Q10,4 14,2',
		quart: 'M2,14 Q4,14 6,12 Q10,6 14,2',
		custom: 'M2,14 Q4,10 8,8 Q12,6 14,2',
	};

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 16 16"
			fill="none"
			style={{ flexShrink: 0 }}
		>
			<path
				d={pathsByType[type] || pathsByType.linear}
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>
		</svg>
	);
};

// Simple Bezier Curve Editor Component
const BezierEditor = ({ points, onChange, disabled }) => {
	const svgRef = useRef(null);
	const [dragging, setDragging] = useState(null);

	const handleMouseDown = (index, e) => {
		if (disabled) return;
		e.preventDefault();
		setDragging(index);
	};

	const handleMouseMove = (e) => {
		if (!dragging || disabled) return;
		const svg = svgRef.current;
		const rect = svg.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = 1 - (e.clientY - rect.top) / rect.height;

		const newPoints = [...points];
		newPoints[dragging] = Math.max(0, Math.min(1, y));
		onChange(newPoints);
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	useEffect(() => {
		if (dragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [dragging]);

	return (
		<svg
			ref={svgRef}
			width="100"
			height="60"
			viewBox="0 0 100 60"
			style={{ border: '1px solid #d1d5db', borderRadius: '4px' }}
		>
			{/* Grid */}
			<defs>
				<pattern
					id="grid"
					width="10"
					height="6"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M 10 0 L 0 0 0 6"
						fill="none"
						stroke="#d1d5db"
						strokeWidth="0.5"
						opacity="0.3"
					/>
				</pattern>
			</defs>
			<rect
				width="100"
				height="60"
				fill="url(#grid)"
			/>

			{/* Curve */}
			<path
				d={`M 0 ${60 - points[0] * 60} Q ${33} ${60 - points[1] * 60} ${66} ${60 - points[2] * 60} T 100 ${
					60 - points[3] * 60
				}`}
				fill="none"
				stroke="#3b82f6"
				strokeWidth="2"
			/>

			{/* Control points */}
			{points.map((point, index) => (
				<circle
					key={index}
					cx={index * 33.33}
					cy={60 - point * 60}
					r="4"
					fill="#3b82f6"
					stroke="white"
					strokeWidth="2"
					style={{ cursor: disabled ? 'default' : 'pointer' }}
					onMouseDown={(e) => handleMouseDown(index, e)}
				/>
			))}
		</svg>
	);
};

// Custom Dropdown Component matching UI3 style
const EasingDropdown = ({ value, onChange, options, customCurve, onCustomCurveChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			style={{ position: 'relative', minWidth: '200px' }}
			ref={dropdownRef}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 12px',
					border: '1px solid #d1d5db',
					borderRadius: '6px',
					backgroundColor: 'white',
					fontSize: '14px',
					color: '#374151',
					cursor: 'pointer',
					textAlign: 'left',
				}}
			>
				<CurveIcon
					type={value}
					size={16}
				/>
				<span style={{ flex: 1, textTransform: 'capitalize' }}>{value.replace('-', ' ')}</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<polyline points="6,9 12,15 18,9"></polyline>
				</svg>
			</button>

			{isOpen && (
				<div
					style={{
						position: 'absolute',
						top: '100%',
						left: 0,
						right: 0,
						backgroundColor: 'white',
						border: '1px solid #d1d5db',
						borderRadius: '6px',
						boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						zIndex: 50,
						maxHeight: '200px',
						overflowY: 'auto',
						marginTop: '4px',
					}}
				>
					{options.map((option) => (
						<button
							key={option}
							onClick={() => {
								onChange(option);
								setIsOpen(false);
							}}
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								padding: '8px 12px',
								border: 'none',
								backgroundColor: value === option ? '#f3f4f6' : 'transparent',
								fontSize: '14px',
								color: '#374151',
								cursor: 'pointer',
								textAlign: 'left',
								borderRadius: 0,
							}}
							onMouseEnter={(e) => {
								if (value !== option) {
									e.target.style.backgroundColor = '#f9fafb';
								}
							}}
							onMouseLeave={(e) => {
								if (value !== option) {
									e.target.style.backgroundColor = 'transparent';
								}
							}}
						>
							<CurveIcon
								type={option}
								size={16}
							/>
							<span style={{ textTransform: 'capitalize' }}>{option.replace('-', ' ')}</span>
						</button>
					))}
				</div>
			)}

			{/* Custom Bezier Editor */}
			{value === 'custom' && (
				<div style={{ marginTop: '12px' }}>
					<BezierEditor
						points={customCurve}
						onChange={onCustomCurveChange}
					/>
				</div>
			)}
		</div>
	);
};

// Custom Color Slider Component for Transform Controls
const TransformSlider = ({ label, value, min, max, step, onChange, channel, currentColor }) => {
	const [inputValue, setInputValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const getSliderBackground = () => {
		if (channel === 'hue') {
			return 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)';
		} else if (channel === 'chroma') {
			const [l, , h] = currentColor;
			return `linear-gradient(to right, oklch(${l} 0 ${h}), oklch(${l} 0.37 ${h}))`;
		} else if (channel === 'lightness') {
			const [, c, h] = currentColor;
			return `linear-gradient(to right, oklch(0 ${c} ${h}), oklch(1 ${c} ${h}))`;
		}
		return '#e5e7eb';
	};

	const getHandleColor = () => {
		const [l, c, h] = currentColor;
		return `oklch(${l} ${c} ${h})`;
	};

	const percentage = ((value - min) / (max - min)) * 100;

	// Get single letter label
	const getShortLabel = () => {
		if (channel === 'lightness') return 'L';
		if (channel === 'chroma') return 'C';
		if (channel === 'hue') return 'H';
		return label.charAt(0).toUpperCase();
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
			{/* Left side: Label and Input */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '80px' }}>
				<span
					style={{
						fontSize: '13px',
						fontWeight: '500',
						color: '#9ca3af',
						letterSpacing: '0.5px',
						minWidth: '12px',
					}}
				>
					{getShortLabel()}
				</span>
				<input
					type="number"
					value={
						isEditing
							? inputValue
							: channel === 'lightness' || channel === 'chroma'
							? value.toFixed(6)
							: channel === 'hue'
							? value.toFixed(6)
							: typeof value === 'number'
							? value < 1
								? value.toFixed(6)
								: Math.round(value)
							: value
					}
					onFocus={(e) => {
						setIsEditing(true);
						setInputValue(
							channel === 'lightness' || channel === 'chroma'
								? value.toFixed(6)
								: channel === 'hue'
								? value.toFixed(6)
								: typeof value === 'number'
								? value < 1
									? value.toFixed(6)
									: Math.round(value).toString()
								: value.toString()
						);
						// Select all text after setting the value
						setTimeout(() => e.target.select(), 0);
					}}
					onBlur={() => {
						setIsEditing(false);
						// Handle empty input
						if (inputValue === '' || inputValue === '-') {
							return;
						}

						const newValue = parseFloat(inputValue);
						if (!isNaN(newValue)) {
							const clampedValue = Math.max(min, Math.min(max, newValue));
							// Only update if the value actually changed
							if (clampedValue !== value) {
								onChange({ target: { value: clampedValue } });
							}
						}
					}}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.target.blur(); // This will trigger onBlur
						}
					}}
					style={{
						width: '56px',
						padding: '4px 6px',
						border: '1px solid #d1d5db',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#374151',
						backgroundColor: 'white',
					}}
				/>
			</div>

			{/* Right side: Slider */}
			<div style={{ position: 'relative', height: '32px', display: 'flex', alignItems: 'center', flex: 1 }}>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					style={{
						width: '100%',
						height: '8px',
						background: getSliderBackground(),
						borderRadius: '4px',
						outline: 'none',
						WebkitAppearance: 'none',
						appearance: 'none',
						cursor: 'pointer',
						position: 'relative',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: `calc(${percentage}% - 12px)`,
						top: '50%',
						transform: 'translateY(-50%)',
						width: '24px',
						height: '24px',
						borderRadius: '50%',
						backgroundColor: 'white',
						border: '2px solid #e5e7eb',
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						pointerEvents: 'none',
					}}
				>
					<div
						style={{
							width: '12px',
							height: '12px',
							borderRadius: '50%',
							backgroundColor: getHandleColor(),
							border: '1px solid rgba(0, 0, 0, 0.1)',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

// Global Control Slider Component (for families and variations)
const GlobalControlSlider = ({ label, value, min, max, step, onChange }) => {
	const [inputValue, setInputValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const percentage = ((value - min) / (max - min)) * 100;

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
			{/* Left side: Label and Input */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '140px' }}>
				<span
					style={{
						fontSize: '13px',
						fontWeight: '500',
						color: '#374151',
						letterSpacing: '0.5px',
					}}
				>
					{label}
				</span>
				<input
					type="number"
					value={isEditing ? inputValue : value}
					onFocus={(e) => {
						setIsEditing(true);
						setInputValue(value.toString());
						e.target.select();
					}}
					onBlur={() => {
						setIsEditing(false);
						// Handle empty input
						if (inputValue === '' || inputValue === '-') {
							return;
						}

						const newValue = parseInt(inputValue);
						if (isNaN(newValue)) {
							return;
						}

						const clampedValue = Math.max(min, Math.min(max, newValue));
						// Only update if the value actually changed
						if (clampedValue !== value) {
							onChange({ target: { value: clampedValue } });
						}
					}}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.target.blur(); // This will trigger onBlur
						}
					}}
					style={{
						width: '60px',
						padding: '4px 8px',
						border: '1px solid #d1d5db',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#374151',
						backgroundColor: 'white',
					}}
				/>
			</div>

			{/* Right side: Slider */}
			<div style={{ position: 'relative', height: '32px', display: 'flex', alignItems: 'center', flex: 1 }}>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					style={{
						width: '100%',
						height: '8px',
						background: '#e5e7eb',
						borderRadius: '4px',
						outline: 'none',
						WebkitAppearance: 'none',
						appearance: 'none',
						cursor: 'pointer',
						position: 'relative',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: `calc(${percentage}% - 12px)`,
						top: '50%',
						transform: 'translateY(-50%)',
						width: '24px',
						height: '24px',
						borderRadius: '50%',
						backgroundColor: 'white',
						border: '2px solid #e5e7eb',
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						pointerEvents: 'none',
					}}
				>
					<div
						style={{
							width: '12px',
							height: '12px',
							borderRadius: '50%',
							backgroundColor: '#3b82f6',
							border: '1px solid rgba(0, 0, 0, 0.1)',
						}}
					/>
				</div>
			</div>
		</div>
	);
};
const ColorSlider = ({ label, value, min, max, step, onChange, channel, currentColor }) => {
	const [inputValue, setInputValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const getSliderBackground = () => {
		if (channel === 'hue') {
			return 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)';
		} else if (channel === 'chroma') {
			const [l, , h] = currentColor;
			return `linear-gradient(to right, oklch(${l} 0 ${h}), oklch(${l} 0.37 ${h}))`;
		} else if (channel === 'lightness') {
			const [, c, h] = currentColor;
			return `linear-gradient(to right, oklch(0 ${c} ${h}), oklch(1 ${c} ${h}))`;
		}
		return '#e5e7eb';
	};

	const getHandleColor = () => {
		const [l, c, h] = currentColor;
		return `oklch(${l} ${c} ${h})`;
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
			{/* Left side: Label and Input */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '100px' }}>
				<div
					style={{
						width: '12px',
						height: '12px',
						borderRadius: '2px',
						backgroundColor: getHandleColor(),
						border: '1px solid #d1d5db',
					}}
				/>
				<span
					style={{
						fontSize: '13px',
						fontWeight: '500',
						color: '#374151',
						letterSpacing: '0.5px',
						minWidth: '12px',
					}}
				>
					{label}
				</span>
				<input
					type="number"
					value={
						isEditing
							? inputValue
							: channel === 'lightness' || channel === 'chroma'
							? (value * 100).toFixed(6)
							: channel === 'hue'
							? value.toFixed(6)
							: typeof value === 'number'
							? value < 1
								? value.toFixed(6)
								: Math.round(value)
							: value
					}
					onFocus={(e) => {
						setIsEditing(true);
						setInputValue(
							channel === 'lightness' || channel === 'chroma'
								? (value * 100).toFixed(6)
								: channel === 'hue'
								? value.toFixed(6)
								: typeof value === 'number'
								? value < 1
									? value.toFixed(6)
									: Math.round(value).toString()
								: value.toString()
						);
						e.target.select();
					}}
					onBlur={() => {
						setIsEditing(false);
						// Handle empty input
						if (inputValue === '' || inputValue === '-') {
							return;
						}

						const newValue = parseFloat(inputValue);
						if (isNaN(newValue)) {
							return;
						}

						let clampedValue;
						if (channel === 'lightness' || channel === 'chroma') {
							// Convert percentage back to 0-1 range
							clampedValue = Math.max(0, Math.min(100, newValue)) / 100;
						} else {
							clampedValue = Math.max(min, Math.min(max, newValue));
						}
						// Only update if the value actually changed
						if (clampedValue !== value) {
							onChange({ target: { value: clampedValue } });
						}
					}}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.target.blur(); // This will trigger onBlur
						}
					}}
					style={{
						width: '80px',
						padding: '4px 8px',
						border: '1px solid #d1d5db',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#374151',
						backgroundColor: 'white',
					}}
				/>
				<span style={{ fontSize: '12px', color: '#6b7280' }}>
					{channel === 'lightness' || channel === 'chroma' ? '%' : channel === 'hue' ? '°' : ''}
				</span>
			</div>

			{/* Right side: Slider */}
			<div style={{ height: '32px', display: 'flex', alignItems: 'center', flex: 1 }}>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					style={{
						width: '100%',
						height: '8px',
						background: getSliderBackground(),
						borderRadius: '4px',
						outline: 'none',
						WebkitAppearance: 'none',
						appearance: 'none',
						cursor: 'pointer',
						position: 'relative',
					}}
				/>
			</div>
		</div>
	);
};

const ColorPaletteGenerator = () => {
	const [familyCount, setFamilyCount] = useState(1);
	const [variationCount, setVariationCount] = useState(11);
	const [colorSpace, setColorSpace] = useState('OKLCH');
	const [transformMin, setTransformMin] = useState([-40, 0, 0, 'linear']);
	const [transformMax, setTransformMax] = useState([40, 0, 0, 'linear']);
	const [customMinCurve, setCustomMinCurve] = useState([0, 0.33, 0.66, 1]);
	const [customMaxCurve, setCustomMaxCurve] = useState([0, 0.33, 0.66, 1]);
	const [families, setFamilies] = useState([]);
	const [expandedFamilies, setExpandedFamilies] = useState(new Set());
	const [showSwatches, setShowSwatches] = useState(true);
	const familiesInitialized = useRef(false);
	const cssTextareaRef = useRef(null);

	// Local state for family count input
	const [familyCountInput, setFamilyCountInput] = useState('');
	const [familyCountEditing, setFamilyCountEditing] = useState(false);

	// Local state for variation count input
	const [variationCountInput, setVariationCountInput] = useState('');
	const [variationCountEditing, setVariationCountEditing] = useState(false);

	// Generate random base color
	const generateRandomColor = () => {
		const l = 0.4 + Math.random() * 0.2; // 40-60% lightness
		const c = 0.02 + Math.random() * 0.15; // 2-17% chroma (minimum 20% of ~0.37 max)
		const h = Math.random() * 360; // 0-360 hue
		return [l, c, h];
	};

	// Manage families based on familyCount
	useEffect(() => {
		setFamilies((currentFamilies) => {
			// If this is the first render and we have no families, initialize with the current familyCount
			if (!familiesInitialized.current && currentFamilies.length === 0) {
				familiesInitialized.current = true;
				const newFamilies = [];
				for (let i = 0; i < familyCount; i++) {
					const baseColor = generateRandomColor();
					const colorName = getColorName(...baseColor);
					newFamilies.push({
						id: Math.random(),
						name: colorName,
						nameEdited: false,
						baseColor,
					});
				}
				return newFamilies;
			}

			// If family count matches current families, no change needed
			if (currentFamilies.length === familyCount) {
				return currentFamilies;
			}

			// If we need more families, add them
			if (currentFamilies.length < familyCount) {
				const newFamilies = [...currentFamilies];
				for (let i = currentFamilies.length; i < familyCount; i++) {
					const baseColor = generateRandomColor();
					const colorName = getColorName(...baseColor);
					newFamilies.push({
						id: Math.random(),
						name: colorName,
						nameEdited: false,
						baseColor,
					});
				}
				return newFamilies;
			}

			// If we need fewer families, remove excess ones
			return currentFamilies.slice(0, familyCount);
		});
	}, [familyCount]);

	// Auto-adjust textarea height based on content
	useEffect(() => {
		if (cssTextareaRef.current) {
			cssTextareaRef.current.style.height = 'auto';
			cssTextareaRef.current.style.height = cssTextareaRef.current.scrollHeight + 'px';
		}
	}, [families, variationCount, transformMin, transformMax, customMinCurve, customMaxCurve]);

	// Calculate color variations for a family
	const calculateVariations = (baseColor) => {
		const variations = [];
		const baseIndex = Math.floor(variationCount / 2);

		for (let i = 0; i < variationCount; i++) {
			if (i === baseIndex) {
				variations.push(baseColor);
				continue;
			}

			const isMin = i < baseIndex;
			const transform = isMin ? transformMin : transformMax;
			const customCurve = isMin ? customMinCurve : customMaxCurve;
			const easingType = transform[3];

			// Calculate progress (0-1) from base to min/max
			const steps = isMin ? baseIndex : variationCount - 1 - baseIndex;
			const step = isMin ? baseIndex - i : i - baseIndex;
			let progress = step / steps;

			// Apply easing
			if (easingType === 'custom') {
				progress = easingFunctions.custom(progress, customCurve);
			} else {
				progress = easingFunctions[easingType] ? easingFunctions[easingType](progress) : progress;
			}

			// Apply transform to each channel
			const newColor = [
				Math.max(0, Math.min(1, baseColor[0] + (transform[0] / 100) * progress)),
				Math.max(0, Math.min(0.37, baseColor[1] + (transform[1] / 100) * progress)),
				(baseColor[2] + transform[2] * progress + 360) % 360,
			];

			variations.push(newColor);
		}

		return variations;
	};

	// Add new family
	const addFamily = () => {
		const baseColor = generateRandomColor();
		const colorName = getColorName(...baseColor);
		setFamilies([
			...families,
			{
				id: Math.random(),
				name: colorName,
				nameEdited: false,
				baseColor,
			},
		]);
	};

	// Remove family
	const removeFamily = (id) => {
		setFamilies(families.filter((f) => f.id !== id));
	};

	// Update family
	const updateFamily = (id, updates) => {
		setFamilies(
			families.map((f) => {
				if (f.id === id) {
					const updated = { ...f, ...updates };
					// Auto-update name if not manually edited
					if ('baseColor' in updates && !updated.nameEdited) {
						updated.name = getColorName(...updated.baseColor);
					}
					return updated;
				}
				return f;
			})
		);
	};

	// Toggle accordion for family
	const toggleFamilyAccordion = (id) => {
		const newExpanded = new Set(expandedFamilies);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedFamilies(newExpanded);
	};

	// Synchronize channel across all families
	const synchronizeChannel = (channel) => {
		if (families.length === 0) return;

		const firstFamily = families[0];
		const value = firstFamily.baseColor[channel === 'lightness' ? 0 : channel === 'chroma' ? 1 : 2];

		if (channel === 'hue') {
			// For hue, distribute evenly across the hue range (360 degrees)
			const hueRange = 360;
			const hueIncrement = hueRange / families.length;
			const baseHue = firstFamily.baseColor[2];

			setFamilies(
				families.map((family, index) => ({
					...family,
					baseColor: [family.baseColor[0], family.baseColor[1], (baseHue + index * hueIncrement) % 360],
				}))
			);
		} else {
			// For lightness and chroma, use the same value for all families
			setFamilies(
				families.map((family) => ({
					...family,
					baseColor: [
						channel === 'lightness' ? value : family.baseColor[0],
						channel === 'chroma' ? value : family.baseColor[1],
						family.baseColor[2],
					],
				}))
			);
		}
	};

	// Generate CSS variables
	const generateCSS = () => {
		let css = ':root {\n';
		families.forEach((family) => {
			const variations = calculateVariations(family.baseColor);
			variations.forEach((color, index) => {
				const [l, c, h] = color;
				css += `  --${family.name}-${index}: oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)});\n`;
			});
		});
		css += '}';
		return css;
	};

	// Generate SVG
	const generateSVG = () => {
		const swatchWidth = 50;
		const swatchHeight = 50;
		const gradientHeight = 20;
		const spacing = 5;
		const familySpacing = 30;

		let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${
			variationCount * swatchWidth + (variationCount - 1) * spacing
		}" height="${families.length * (swatchHeight + gradientHeight + familySpacing)}">`;

		families.forEach((family, familyIndex) => {
			const variations = calculateVariations(family.baseColor);
			const yOffset = familyIndex * (swatchHeight + gradientHeight + familySpacing);

			// Swatches
			variations.forEach((color, index) => {
				const [l, c, h] = color;
				const x = index * (swatchWidth + spacing);
				svg += `<rect x="${x}" y="${yOffset}" width="${swatchWidth}" height="${swatchHeight}" fill="oklch(${l.toFixed(
					3
				)} ${c.toFixed(3)} ${h.toFixed(1)})" data-color="oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(
					1
				)})" data-family="${family.name}" data-index="${index}"/>`;
			});

			// Gradient
			svg += `<defs>
				<linearGradient id="gradient-${familyIndex}" x1="0%" y1="0%" x2="100%" y2="0%">`;
			variations.forEach((color, index) => {
				const [l, c, h] = color;
				const offset = (index / (variations.length - 1)) * 100;
				svg += `<stop offset="${offset}%" stop-color="oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})"/>`;
			});
			svg += `</linearGradient>
				<clipPath id="gradientClip-${familyIndex}">
					<rect x="0" y="0" width="${variationCount * swatchWidth + (variationCount - 1) * spacing}" height="${gradientHeight}"/>
				</clipPath>
			</defs>`;
			svg += `<rect x="0" y="${yOffset + swatchHeight + 5}" width="${
				variationCount * swatchWidth + (variationCount - 1) * spacing
			}" height="${gradientHeight}" fill="url(#gradient-${familyIndex})" clip-path="url(#gradientClip-${familyIndex})"/>`;
		});

		svg += '</svg>';
		return svg;
	};

	// Copy to clipboard
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
	};

	// Download SVG
	const downloadSVG = () => {
		const svg = generateSVG();
		const blob = new Blob([svg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'color-palette.svg';
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<style>
				{`
					.hue-family-swatch-group::after {
						content: '';
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						border-radius: 8px;
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
						pointer-events: none;
						z-index: 1;
					}
				`}
			</style>
			<div
				className="figui"
				style={{
					fontFamily: 'system-ui, -apple-system, sans-serif',
					backgroundColor: '#f8f9fa',
					minHeight: '100vh',
					display: 'flex',
				}}
			>
				{/* Left Sidebar - Global Controls */}
				<div
					style={{
						width: '320px',
						backgroundColor: 'white',
						borderRight: '1px solid #e5e7eb',
						padding: '24px',
						overflowY: 'auto',
						height: '100vh',
						position: 'sticky',
						top: 0,
					}}
				>
					<h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
						Global Controls
					</h2>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
							<span
								style={{
									fontSize: '13px',
									fontWeight: '500',
									color: '#374151',
									letterSpacing: '0.5px',
									minWidth: '80px',
								}}
							>
								Families
							</span>
							<input
								type="number"
								value={familyCountEditing ? familyCountInput : familyCount}
								min={1}
								max={21}
								step={1}
								onFocus={(e) => {
									setFamilyCountEditing(true);
									setFamilyCountInput(familyCount.toString());
									e.target.select();
								}}
								onBlur={() => {
									setFamilyCountEditing(false);
									// Handle empty input
									if (familyCountInput === '' || familyCountInput === '-') {
										return;
									}

									const newValue = parseInt(familyCountInput);
									if (isNaN(newValue)) {
										return;
									}

									const clampedValue = Math.max(1, Math.min(21, newValue));
									setFamilyCount(clampedValue);
								}}
								onChange={(e) => {
									setFamilyCountInput(e.target.value);
									// Also update the actual count immediately for arrow buttons
									const newValue = parseInt(e.target.value);
									if (!isNaN(newValue)) {
										const clampedValue = Math.max(1, Math.min(21, newValue));
										setFamilyCount(clampedValue);
									}
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.target.blur(); // This will trigger onBlur
									}
								}}
								style={{
									width: '60px',
									padding: '4px 8px',
									border: '1px solid #d1d5db',
									borderRadius: '4px',
									fontSize: '12px',
									color: '#374151',
									backgroundColor: 'white',
								}}
							/>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
							<span
								style={{
									fontSize: '13px',
									fontWeight: '500',
									color: '#374151',
									letterSpacing: '0.5px',
									minWidth: 'max-content',
								}}
							>
								Variations
							</span>
							<input
								type="number"
								value={variationCountEditing ? variationCountInput : variationCount}
								min={3}
								max={42}
								step={1}
								onFocus={(e) => {
									setVariationCountEditing(true);
									setVariationCountInput(variationCount.toString());
									e.target.select();
								}}
								onBlur={() => {
									setVariationCountEditing(false);
									// Handle empty input
									if (variationCountInput === '' || variationCountInput === '-') {
										return;
									}

									const newValue = parseInt(variationCountInput);
									if (isNaN(newValue)) {
										return;
									}

									const clampedValue = Math.max(3, Math.min(42, newValue));
									setVariationCount(clampedValue);
								}}
								onChange={(e) => {
									setVariationCountInput(e.target.value);
									// Also update the actual count immediately for arrow buttons
									const newValue = parseInt(e.target.value);
									if (!isNaN(newValue)) {
										const clampedValue = Math.max(3, Math.min(42, newValue));
										setVariationCount(clampedValue);
									}
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.target.blur(); // This will trigger onBlur
									}
								}}
								style={{
									width: '60px',
									padding: '4px 8px',
									border: '1px solid #d1d5db',
									borderRadius: '4px',
									fontSize: '12px',
									color: '#374151',
									backgroundColor: 'white',
								}}
							/>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
							<div style={{ maxWidth: 'max-content' }}>
								<span
									style={{
										fontSize: '13px',
										fontWeight: '500',
										color: '#374151',
										letterSpacing: '0.5px',
									}}
								>
									Display Mode
								</span>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									alignContent: `end`,
									gap: '12px',
									flex: 1,
									width: '100%',
								}}
							>
								<span
									style={{
										fontSize: '13px',
										color: showSwatches ? '#6b7280' : '#374151',
										fontWeight: showSwatches ? '400' : '500',
									}}
								>
									Swatches
								</span>
								<button
									onClick={() => setShowSwatches(!showSwatches)}
									style={{
										width: '48px',
										height: '24px',
										background: showSwatches ? '#3b82f6' : '#d1d5db',
										border: 'none',
										borderRadius: '12px',
										cursor: 'pointer',
										position: 'relative',
										transition: 'all 0.2s ease',
										outline: 'none',
									}}
								>
									<div
										style={{
											width: '20px',
											height: '20px',
											backgroundColor: 'white',
											borderRadius: '50%',
											position: 'absolute',
											top: '2px',
											left: showSwatches ? '26px' : '2px',
											transition: 'all 0.2s ease',
											boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
										}}
									/>
								</button>
								<span
									style={{
										fontSize: '13px',
										color: !showSwatches ? '#6b7280' : '#374151',
										fontWeight: !showSwatches ? '400' : '500',
									}}
								>
									Gradients
								</span>
							</div>
						</div>
					</div>

					{/* Synchronize Controls */}
					<div style={{ marginTop: '32px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
							<span
								style={{
									fontSize: '16px',
									fontWeight: '600',
									color: '#111827',
								}}
							>
								Synchronize
							</span>
							<div style={{ display: 'flex', gap: '8px' }}>
								<button
									onClick={() => synchronizeChannel('lightness')}
									style={{
										padding: '8px 16px',
										background: '#f3f4f6',
										color: '#374151',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										fontSize: '14px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'all 0.15s ease',
									}}
									onMouseEnter={(e) => {
										e.target.style.backgroundColor = '#e5e7eb';
									}}
									onMouseLeave={(e) => {
										e.target.style.backgroundColor = '#f3f4f6';
									}}
								>
									L
								</button>
								<button
									onClick={() => synchronizeChannel('chroma')}
									style={{
										padding: '8px 16px',
										background: '#f3f4f6',
										color: '#374151',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										fontSize: '14px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'all 0.15s ease',
									}}
									onMouseEnter={(e) => {
										e.target.style.backgroundColor = '#e5e7eb';
									}}
									onMouseLeave={(e) => {
										e.target.style.backgroundColor = '#f3f4f6';
									}}
								>
									C
								</button>
								<button
									onClick={() => synchronizeChannel('hue')}
									style={{
										padding: '8px 16px',
										background: '#f3f4f6',
										color: '#374151',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										fontSize: '14px',
										fontWeight: '500',
										cursor: 'pointer',
										transition: 'all 0.15s ease',
									}}
									onMouseEnter={(e) => {
										e.target.style.backgroundColor = '#e5e7eb';
									}}
									onMouseLeave={(e) => {
										e.target.style.backgroundColor = '#f3f4f6';
									}}
								>
									H
								</button>
							</div>
						</div>
					</div>

					{/* Transform Controls */}
					<div style={{ marginTop: '32px' }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
							{/* Transform Min */}
							<div>
								<h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>
									Transform Min
								</h3>
								<div
									style={{
										display: 'grid',
										gridTemplateRows: '1fr 1fr 1fr',
										gap: '16px',
										marginBottom: '16px',
									}}
								>
									<TransformSlider
										label="Lightness"
										value={transformMin[0]}
										min={-100}
										max={100}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMin([newValue, transformMin[1], transformMin[2], transformMin[3]]);
										}}
										channel="lightness"
										currentColor={[0.5, 0.1, 200]}
									/>
									<TransformSlider
										label="Chroma"
										value={transformMin[1]}
										min={-50}
										max={50}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMin([transformMin[0], newValue, transformMin[2], transformMin[3]]);
										}}
										channel="chroma"
										currentColor={[0.5, 0.1, 200]}
									/>
									<TransformSlider
										label="Hue"
										value={transformMin[2]}
										min={-180}
										max={180}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMin([transformMin[0], transformMin[1], newValue, transformMin[3]]);
										}}
										channel="hue"
										currentColor={[0.5, 0.1, 200]}
									/>
								</div>
								<div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
									<div style={{ minWidth: '80px', paddingTop: '8px' }}>
										<span
											style={{
												fontSize: '13px',
												fontWeight: '500',
												color: '#374151',
												letterSpacing: '0.5px',
											}}
										>
											Easing
										</span>
									</div>
									<EasingDropdown
										value={transformMin[3]}
										onChange={(newValue) =>
											setTransformMin([transformMin[0], transformMin[1], transformMin[2], newValue])
										}
										options={['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'sine', 'quart', 'custom']}
										customCurve={customMinCurve}
										onCustomCurveChange={setCustomMinCurve}
									/>
								</div>
							</div>

							{/* Transform Max */}
							<div>
								<h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>
									Transform Max
								</h3>
								<div
									style={{
										display: 'grid',
										gridTemplateRows: '1fr 1fr 1fr',
										gap: '16px',
										marginBottom: '16px',
									}}
								>
									<TransformSlider
										label="Lightness"
										value={transformMax[0]}
										min={-100}
										max={100}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMax([newValue, transformMax[1], transformMax[2], transformMax[3]]);
										}}
										channel="lightness"
										currentColor={[0.5, 0.1, 200]}
									/>
									<TransformSlider
										label="Chroma"
										value={transformMax[1]}
										min={-50}
										max={50}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMax([transformMax[0], newValue, transformMax[2], transformMax[3]]);
										}}
										channel="chroma"
										currentColor={[0.5, 0.1, 200]}
									/>
									<TransformSlider
										label="Hue"
										value={transformMax[2]}
										min={-180}
										max={180}
										step={1}
										onChange={(e) => {
											const inputValue = e.target.value;
											if (inputValue === '' || inputValue === '-') return;
											const newValue = parseInt(inputValue);
											if (isNaN(newValue)) return;
											setTransformMax([transformMax[0], transformMax[1], newValue, transformMax[3]]);
										}}
										channel="hue"
										currentColor={[0.5, 0.1, 200]}
									/>
								</div>
								<div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
									<div style={{ minWidth: '80px', paddingTop: '8px' }}>
										<span
											style={{
												fontSize: '13px',
												fontWeight: '500',
												color: '#374151',
												letterSpacing: '0.5px',
											}}
										>
											Easing
										</span>
									</div>
									<EasingDropdown
										value={transformMax[3]}
										onChange={(newValue) =>
											setTransformMax([transformMax[0], transformMax[1], transformMax[2], newValue])
										}
										options={['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'sine', 'quart', 'custom']}
										customCurve={customMaxCurve}
										onCustomCurveChange={setCustomMaxCurve}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Export Section */}
					<div style={{ marginTop: '32px' }}>
						<div
							style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}
						>
							<h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>Export</h3>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<button
									onClick={downloadSVG}
									style={{
										width: '32px',
										height: '32px',
										background: '#f3f4f6',
										color: '#374151',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										cursor: 'pointer',
										transition: 'all 0.15s ease',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onMouseEnter={(e) => {
										e.target.style.backgroundColor = '#e5e7eb';
									}}
									onMouseLeave={(e) => {
										e.target.style.backgroundColor = '#f3f4f6';
									}}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
										<polyline points="7,10 12,15 17,10"></polyline>
										<line
											x1="12"
											y1="15"
											x2="12"
											y2="3"
										></line>
									</svg>
								</button>
								<button
									onClick={() => copyToClipboard(generateSVG())}
									style={{
										width: '32px',
										height: '32px',
										background: '#f3f4f6',
										color: '#374151',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										cursor: 'pointer',
										transition: 'all 0.15s ease',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onMouseEnter={(e) => {
										e.target.style.backgroundColor = '#e5e7eb';
									}}
									onMouseLeave={(e) => {
										e.target.style.backgroundColor = '#f3f4f6';
									}}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											x="9"
											y="9"
											width="13"
											height="13"
											rx="2"
											ry="2"
										></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</div>

						<div
							ref={cssTextareaRef}
							style={{
								width: '100%',
								height: 'auto',
								minHeight: '150px',
								fontFamily: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
								fontSize: '12px',
								padding: '12px',
								border: 'none',
								borderRadius: '6px',
								backgroundColor: '#f9fafb',
								color: '#374151',
								boxSizing: 'border-box',
								whiteSpace: 'pre',
								overflow: 'hidden',
								position: 'relative',
							}}
						>
							{generateCSS()}
							<button
								onClick={() => copyToClipboard(generateCSS())}
								style={{
									position: 'absolute',
									top: '8px',
									right: '8px',
									width: '32px',
									height: '32px',
									background: '#f3f4f6',
									color: '#374151',
									border: '1px solid #d1d5db',
									borderRadius: '6px',
									cursor: 'pointer',
									transition: 'all 0.15s ease',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '14px',
								}}
								onMouseEnter={(e) => {
									e.target.style.backgroundColor = '#e5e7eb';
								}}
								onMouseLeave={(e) => {
									e.target.style.backgroundColor = '#f3f4f6';
								}}
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect
										x="9"
										y="9"
										width="13"
										height="13"
										rx="2"
										ry="2"
									></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Main Content Area */}
				<div
					style={{
						flex: 1,
						padding: '20px',
						overflowY: 'auto',
					}}
				>
					{/* Color Families Container */}
					<div
						style={{
							padding: '24px',
							backgroundColor: 'white',
							borderRadius: '12px',
							boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
						}}
					>
						{families.map((family) => {
							const variations = calculateVariations(family.baseColor);
							return (
								<div
									key={family.id}
									style={{
										marginBottom: families.indexOf(family) === families.length - 1 ? '0' : '24px',
									}}
								>
									{/* Swatches or Gradient First, then Family Name and Base Color Button */}
									<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
										{/* Swatches or Gradient */}
										<div style={{ flex: 1 }}>
											{showSwatches ? (
												<div
													className="hue-family-swatch-group"
													style={{
														display: 'grid',
														gridTemplateColumns: `repeat(${variationCount}, 1fr)`,
														borderRadius: '8px',
														overflow: 'hidden',
														position: 'relative',
													}}
												>
													{variations.map((color, index) => {
														const [l, c, h] = color;
														const baseIndex = Math.floor(variationCount / 2);
														const isBaseColor = index === baseIndex;
														return (
															<div
																key={index}
																style={{
																	height: '64px',
																	backgroundColor: `oklch(${l} ${c} ${h})`,
																	marginLeft: isBaseColor ? '2px' : '0',
																	marginRight: isBaseColor ? '2px' : '0',
																}}
																title={`oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`}
															/>
														);
													})}
												</div>
											) : (
												<div
													style={{
														height: '64px',
														background: `linear-gradient(to right, ${variations
															.map(([l, c, h]) => `oklch(${l} ${c} ${h})`)
															.join(', ')})`,
														borderRadius: '8px',
														boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
													}}
												/>
											)}
										</div>

										{/* Family Name Input */}
										<input
											type="text"
											value={family.name}
											onChange={(e) => updateFamily(family.id, { name: e.target.value, nameEdited: true })}
											style={{
												padding: '8px 12px',
												border: '1px solid #d1d5db',
												borderRadius: '6px',
												fontSize: '14px',
												fontWeight: '500',
												color: '#374151',
												backgroundColor: 'white',
												minWidth: '120px',
											}}
										/>

										{/* Base Color Edit Button */}
										<button
											onClick={() => toggleFamilyAccordion(family.id)}
											style={{
												width: '32px',
												height: '32px',
												border: '1px solid #d1d5db',
												borderRadius: '6px',
												backgroundColor: `oklch(${family.baseColor[0]} ${family.baseColor[1]} ${family.baseColor[2]})`,
												cursor: 'pointer',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												transition: 'all 0.15s ease',
												flexShrink: 0,
											}}
											title="Edit base color"
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
												<path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
											</svg>
										</button>
									</div>

									{/* Base Color Controls - Now below the color display */}
									{expandedFamilies.has(family.id) && (
										<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
											<ColorSlider
												label="Lightness"
												value={family.baseColor[0]}
												min={0}
												max={1}
												step={0.01}
												onChange={(e) =>
													updateFamily(family.id, {
														baseColor: [parseFloat(e.target.value), family.baseColor[1], family.baseColor[2]],
													})
												}
												channel="lightness"
												currentColor={family.baseColor}
											/>
											<ColorSlider
												label="Chroma"
												value={family.baseColor[1]}
												min={0}
												max={0.37}
												step={0.01}
												onChange={(e) =>
													updateFamily(family.id, {
														baseColor: [family.baseColor[0], parseFloat(e.target.value), family.baseColor[2]],
													})
												}
												channel="chroma"
												currentColor={family.baseColor}
											/>
											<ColorSlider
												label="Hue"
												value={family.baseColor[2]}
												min={0}
												max={360}
												step={1}
												onChange={(e) =>
													updateFamily(family.id, {
														baseColor: [family.baseColor[0], family.baseColor[1], parseFloat(e.target.value)],
													})
												}
												channel="hue"
												currentColor={family.baseColor}
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ColorPaletteGenerator;
