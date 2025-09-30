import React from 'react';
import { useColorFamilies, useInputValidation, useGlobalControls } from './hooks/useColorPalette';
import { PaletteLayout, Sidebar, MainContent, RightPanel } from './components/LayoutComponents';
import {
	ColorSpaceInfo,
	FormInput,
	TransformControls,
	CurveSelection,
	AlignButtons,
	ExportSection,
} from './components/SidebarComponents';
import { ColorFamiliesList } from './components/MainContentComponents';
import { FamilyControls } from './components/RightPanelComponents';

const ColorPaletteGenerator = () => {
	// Custom hooks for state management
	const {
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
	} = useGlobalControls();

	const { families, selectedFamily, setSelectedFamily, updateSelectedFamily, resetFamilyName, alignFamiliesChannel } =
		useColorFamilies(familyCount);

	const { inputErrors, validateAndSetError } = useInputValidation();

	return (
		<PaletteLayout
			sidebar={
				<Sidebar>
					<ColorSpaceInfo />

					<FormInput
						label="Family Count"
						value={familyCount}
						onChange={setFamilyCount}
						min={1}
						max={21}
						error={inputErrors['family-count']}
						fieldId="family-count"
						validateAndSetError={validateAndSetError}
					/>

					<FormInput
						label="Steps toward Min"
						value={stepsMin}
						onChange={setStepsMin}
						min={0}
						max={21}
						error={inputErrors['steps-min']}
						fieldId="steps-min"
						validateAndSetError={validateAndSetError}
					/>

					<FormInput
						label="Steps toward Max"
						value={stepsMax}
						onChange={setStepsMax}
						min={0}
						max={21}
						error={inputErrors['steps-max']}
						fieldId="steps-max"
						validateAndSetError={validateAndSetError}
					/>

					<TransformControls
						title="Transform Min"
						values={transformMin}
						onChange={setTransformMin}
						inputErrors={inputErrors}
						validateAndSetError={validateAndSetError}
					/>

					<TransformControls
						title="Transform Max"
						values={transformMax}
						onChange={setTransformMax}
						inputErrors={inputErrors}
						validateAndSetError={validateAndSetError}
					/>

					<CurveSelection
						curveType={curveType}
						setCurveType={setCurveType}
					/>

					<AlignButtons onAlignChannel={alignFamiliesChannel} />

					<ExportSection
						families={families}
						stepsMin={stepsMin}
						stepsMax={stepsMax}
						transformMin={transformMin}
						transformMax={transformMax}
						curveType={curveType}
						exportFormat={exportFormat}
						setExportFormat={setExportFormat}
					/>
				</Sidebar>
			}
			mainContent={
				<MainContent>
					<ColorFamiliesList
						families={families}
						selectedFamily={selectedFamily}
						setSelectedFamily={setSelectedFamily}
						stepsMin={stepsMin}
						stepsMax={stepsMax}
						transformMin={transformMin}
						transformMax={transformMax}
						curveType={curveType}
					/>
				</MainContent>
			}
			rightPanel={
				<RightPanel>
					{selectedFamily !== null && families[selectedFamily] && (
						<FamilyControls
							family={families[selectedFamily]}
							onUpdateFamily={updateSelectedFamily}
							onResetName={resetFamilyName}
							inputErrors={inputErrors}
						/>
					)}
				</RightPanel>
			}
		/>
	);
};

export default ColorPaletteGenerator;
