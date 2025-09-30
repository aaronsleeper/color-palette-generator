import React from 'react';
import { Copy, Download, Image } from 'lucide-react';
import { generateCSS, generateSVG, downloadSVG, copyToClipboard, handleInputFocus } from '../utils/colorUtils';

// Color Space Info Component
export const ColorSpaceInfo = () => (
	<div className="color-space-info">
		<div>L: 0%-100%</div>
		<div>C: 0%-100% (0-150)</div>
		<div>H: 0°-360°</div>
	</div>
);

// Form Input Component
export const FormInput = ({
	label,
	type = 'number',
	value,
	onChange,
	min,
	max,
	step = 1,
	error,
	fieldId,
	validateAndSetError,
	className = '',
	...props
}) => {
	const [inputValue, setInputValue] = React.useState(value.toString());
	const [isUserTyping, setIsUserTyping] = React.useState(false);

	// Update input value when the actual value changes
	// But only if the user is not currently typing
	React.useEffect(() => {
		if (!isUserTyping) {
			setInputValue(value.toString());
		}
	}, [value, isUserTyping]);

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		setIsUserTyping(true);

		// Immediately update the value if it's valid
		if (validateAndSetError && fieldId) {
			const val = validateAndSetError(newValue, min, max, fieldId);
			if (val !== null) {
				onChange(val);
			}
		} else {
			onChange(newValue);
		}
	};

	const handleInputBlur = () => {
		setIsUserTyping(false);
		// Only reset to current value if the input is invalid on blur
		if (validateAndSetError && fieldId) {
			const val = validateAndSetError(inputValue, min, max, fieldId);
			if (val === null) {
				setInputValue(value.toString());
			}
		}
	};

	const handleInputFocus = (e) => {
		e.target.select();
	};

	return (
		<div className="form-group">
			<label className="form-label">{label}</label>
			<input
				type={type}
				min={min}
				max={max}
				step={step}
				value={inputValue}
				onFocus={handleInputFocus}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				className={`form-input ${error ? 'error' : ''} ${className}`}
				{...props}
			/>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

// Transform Controls Component
export const TransformControls = ({ title, values, onChange, inputErrors, validateAndSetError }) => {
	const [inputValues, setInputValues] = React.useState(() => {
		const initialValues = {};
		['l', 'c', 'h'].forEach((channel) => {
			initialValues[channel] = values[channel].toString();
		});
		return initialValues;
	});
	const [userTypingStates, setUserTypingStates] = React.useState({ l: false, c: false, h: false });

	// Update input values when the actual values change (e.g., from slider)
	// But only if the user is not currently typing in that channel
	React.useEffect(() => {
		const newInputValues = {};
		['l', 'c', 'h'].forEach((channel) => {
			if (!userTypingStates[channel]) {
				newInputValues[channel] = values[channel].toString();
			}
		});
		setInputValues((prev) => ({ ...prev, ...newInputValues }));
	}, [values, userTypingStates]);

	const handleInputChange = (channel, e) => {
		const newValue = e.target.value;
		setInputValues((prev) => ({
			...prev,
			[channel]: newValue,
		}));
		setUserTypingStates((prev) => ({ ...prev, [channel]: true }));

		// Immediately update the value if it's valid
		const numValue = parseFloat(newValue);
		if (!isNaN(numValue)) {
			const validated = validateAndSetError(
				numValue,
				channel === 'h' ? -360 : -100,
				channel === 'h' ? 360 : 100,
				`${title.toLowerCase().replace(' ', '-')}-${channel}`
			);
			if (validated !== null) {
				onChange({ ...values, [channel]: validated });
			}
		}
	};

	const handleInputBlur = (channel) => {
		setUserTypingStates((prev) => ({ ...prev, [channel]: false }));
		// Only reset to current value if the input is invalid on blur
		const numValue = parseFloat(inputValues[channel]);
		if (isNaN(numValue)) {
			setInputValues((prev) => ({
				...prev,
				[channel]: values[channel].toString(),
			}));
		}
	};

	const handleInputFocus = (e) => {
		e.target.select();
	};

	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">{title}</legend>
			{['l', 'c', 'h'].map((channel) => {
				const min = channel === 'h' ? -360 : -100;
				const max = channel === 'h' ? 360 : 100;
				const unit = channel === 'h' ? '°' : '%';
				const fieldId = `${title.toLowerCase().replace(' ', '-')}-${channel}`;

				return (
					<div
						key={channel}
						className="fieldset-content"
					>
						<label className="form-label">{channel.toUpperCase()}</label>
						<input
							type="range"
							min={min}
							max={max}
							value={values[channel]}
							onChange={(e) => onChange({ ...values, [channel]: parseFloat(e.target.value) })}
							className="range-input"
						/>
						<div className="form-input-number">
							<input
								type="number"
								min={min}
								max={max}
								value={inputValues[channel]}
								onFocus={handleInputFocus}
								onChange={(e) => handleInputChange(channel, e)}
								onBlur={() => handleInputBlur(channel)}
								className={`form-input ${inputErrors[fieldId] ? 'error' : ''}`}
							/>
							<span className="form-input-unit form-input-unit-small">{unit}</span>
						</div>
						{inputErrors[fieldId] && <p className="error-message">{inputErrors[fieldId]}</p>}
					</div>
				);
			})}
		</fieldset>
	);
};

// Curve Selection Component
export const CurveSelection = ({ curveType, setCurveType }) => (
	<div className="form-group">
		<label className="form-label">Curve</label>
		<select
			value={curveType}
			onChange={(e) => setCurveType(e.target.value)}
			className="select-input"
		>
			<option value="linear">Linear</option>
			<option value="quadratic">Quadratic</option>
			<option value="cubic">Cubic</option>
			<option value="sinusoidal">Sinusoidal</option>
			<option value="exponential">Exponential</option>
			<option value="smoothstep">Smooth Step</option>
		</select>
	</div>
);

// Align Buttons Component
export const AlignButtons = ({ onAlignChannel }) => (
	<div className="form-group">
		<div className="form-label">Align Channels</div>
		<div className="align-buttons">
			<button
				onClick={() => onAlignChannel('l')}
				className="align-button"
			>
				L
			</button>
			<button
				onClick={() => onAlignChannel('c')}
				className="align-button"
			>
				C
			</button>
			<button
				onClick={() => onAlignChannel('h')}
				className="align-button"
			>
				H
			</button>
		</div>
	</div>
);

// Export Section Component
export const ExportSection = ({
	families,
	stepsMin,
	stepsMax,
	transformMin,
	transformMax,
	curveType,
	exportFormat,
	setExportFormat,
}) => {
	const cssCode = generateCSS(families, stepsMin, stepsMax, transformMin, transformMax, curveType, exportFormat);
	const svgContent = generateSVG(families, stepsMin, stepsMax, transformMin, transformMax, curveType);

	const handleDownloadSVG = () => {
		downloadSVG(svgContent);
	};

	const handleCopySVG = async () => {
		await copyToClipboard(svgContent);
	};

	return (
		<div className="export-section">
			<div className="export-controls">
				<button
					onClick={handleDownloadSVG}
					className="btn btn-primary btn-icon"
					title="Download SVG"
				>
					<Download size={16} />
				</button>
				<button
					onClick={handleCopySVG}
					className="btn btn-primary btn-icon"
					title="Copy SVG to clipboard"
				>
					<Image size={16} />
				</button>
			</div>
			<div className="export-controls">
				<select
					value={exportFormat}
					onChange={(e) => setExportFormat(e.target.value)}
					className="select-input"
				>
					<option value="oklch">OKLCH</option>
					<option value="hex">Hex</option>
					<option value="hsl">HSL</option>
					<option value="rgb">RGB</option>
				</select>
				<button
					onClick={() => copyToClipboard(cssCode)}
					className="btn btn-primary btn-icon"
					title="Copy CSS to clipboard"
				>
					<Copy size={16} />
				</button>
			</div>
			<pre className="export-code">{cssCode}</pre>
		</div>
	);
};
