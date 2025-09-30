import React from 'react';

// Sidebar Layout Component
export const Sidebar = ({ children }) => (
	<div className="sidebar">
		<div className="sidebar-content">{children}</div>
	</div>
);

// Main Content Layout Component
export const MainContent = ({ children }) => <div className="main-content">{children}</div>;

// Right Panel Layout Component
export const RightPanel = ({ children }) => <div className="right-panel">{children}</div>;

// Main Layout Component
export const PaletteLayout = ({ sidebar, mainContent, rightPanel }) => (
	<div className="palette-generator">
		{sidebar}
		{mainContent}
		{rightPanel}
	</div>
);
