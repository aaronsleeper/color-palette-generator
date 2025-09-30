import React from 'react';
import ReactDOM from 'react-dom/client';
import ColorPaletteGenerator from './ColorPaletteGenerator.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ColorPaletteGenerator />
	</React.StrictMode>
);
