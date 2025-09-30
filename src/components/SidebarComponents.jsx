import React from 'react';
import { Copy } from 'lucide-react';
import { generateCSS, copyToClipboard, handleInputFocus } from '../utils/colorUtils';

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
	const handleChange = (e) => {
		if (validateAndSetError && fieldId) {
			const val = validateAndSetError(e.target.value, min, max, fieldId);
			if (val !== null) {
				onChange(val);
			}
		} else {
			onChange(e.target.value);
		}
	};

	return (
		<div className="form-group">
			<label className="form-label">{label}</label>
			<input
				type={type}
				min={min}
				max={max}
				step={step}
				value={value}
				onFocus={handleInputFocus}
				onChange={handleChange}
				className={`form-input ${error ? 'error' : ''} ${className}`}
				{...props}
			/>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

// Transform Controls Component
export const TransformControls = ({ title, values, onChange, inputErrors, validateAndSetError }) => (
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
							value={values[channel]}
							onFocus={handleInputFocus}
							onChange={(e) => {
								const val = parseFloat(e.target.value);
								const validated = validateAndSetError(val, min, max, fieldId);
								if (validated !== null) {
									onChange({ ...values, [channel]: validated });
								}
							}}
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

	return (
		<div className="export-section">
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
				>
					<Copy size={16} />
				</button>
			</div>
			<pre className="export-code">{cssCode}</pre>
		</div>
	);
};
