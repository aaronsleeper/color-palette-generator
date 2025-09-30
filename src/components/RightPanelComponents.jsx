import React from 'react';
import { RotateCcw } from 'lucide-react';
import { handleInputFocus } from '../utils/colorUtils';

// Family Name Control Component
export const FamilyNameControl = ({ family, onUpdateName, onResetName }) => (
	<div className="form-group">
		<label className="form-label">Family Name</label>
		<div className="family-name-controls">
			<input
				type="text"
				value={family.name}
				onChange={(e) => onUpdateName('name', e.target.value)}
				className={`form-input ${family.customName ? '' : 'auto-generated'}`}
			/>
			<button
				onClick={onResetName}
				className="btn btn-secondary"
			>
				<RotateCcw size={16} />
			</button>
		</div>
	</div>
);

// Channel Control Component
export const ChannelControl = ({ channel, value, onChange, error }) => {
	const min = 0;
	const max = channel === 'h' ? 360 : 100;
	const unit = channel === 'h' ? '°' : '%';
	const fieldId = `base-${channel}`;

	return (
		<div className="channel-control">
			<label className="channel-label">{channel.toUpperCase()}</label>
			<input
				type="range"
				min={min}
				max={max}
				step={channel === 'h' ? 1 : 0.1}
				value={value}
				onChange={(e) => onChange(channel, parseFloat(e.target.value))}
				className="range-input"
			/>
			<div className="form-input-number">
				<input
					type="number"
					min={min}
					max={max}
					step={channel === 'h' ? 1 : 0.1}
					value={value.toFixed(channel === 'h' ? 0 : 1)}
					onFocus={handleInputFocus}
					onChange={(e) => onChange(channel, parseFloat(e.target.value))}
					className={`form-input ${error ? 'error' : ''}`}
				/>
				<span className="form-input-unit">{unit}</span>
			</div>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

// Family Controls Component
export const FamilyControls = ({ family, onUpdateFamily, onResetName, inputErrors }) => {
	if (!family) return null;

	return (
		<div className="family-controls">
			<FamilyNameControl
				family={family}
				onUpdateName={onUpdateFamily}
				onResetName={onResetName}
			/>

			{['l', 'c', 'h'].map((channel) => (
				<ChannelControl
					key={channel}
					channel={channel}
					value={family.base[channel]}
					onChange={onUpdateFamily}
					error={inputErrors[`base-${channel}`]}
				/>
			))}
		</div>
	);
};
