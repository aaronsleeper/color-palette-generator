# Development Workflow Instructions

This document provides step-by-step instructions for the LLM to follow when implementing features.

## General Workflow

For each task in the plan:

### 1. Find Next Step
- Review the task list in `vue-palette-generator.plan.md`
- Identify the next pending task
- Ensure dependencies are completed

### 2. Look Up Documentation
- Use Context7 to fetch latest documentation for:
  - Chroma.js: `/gka/chroma.js`
  - Vue 3: Search for Vue 3 Composition API docs
  - Vite: Search for Vite configuration docs
- Read relevant sections based on the current task

### 3. Understand Existing Code
- Search the codebase for similar components or functions
- Identify reusable code before creating new components
- Review state management patterns already established
- Check for existing utilities or helpers

### 4. Write Code
- Follow Vue 3 Composition API patterns
- Use existing component structure conventions
- Ensure proper prop types and event handling
- Keep components focused and single-purpose
- Write clear, readable code with comments

### 5. Test Your Work
- **Start the dev server**: `npm run dev`
- **Open browser**: Navigate to the app URL
- **Verify functionality**:
  - Feature works as specified in requirements
  - No console errors or warnings
  - No build errors
  - Colors display correctly
  - Controls respond to user input
- **Test edge cases**:
  - Extreme values
  - Rapid changes
  - Missing data
- **Only mark complete** when all tests pass

### 6. Commit and Push
- Stage all changes: `git add .`
- Write descriptive commit message
- Push to remote: `git push origin main`
- Restart dev server to ensure clean state

## Specific Component Guidelines

### ChannelControl Component
- Use `<input type="number">` and `<input type="range">`
- Implement bidirectional sync between input and slider
- Handle focus event to select all text
- Preserve exact user input values
- Clamp to min/max on blur

### ColorControl Component
- Iterate over color space channels dynamically
- Use `v-for` to render ChannelControl instances
- Emit updates when any channel changes
- Handle array updates correctly

### Swatch Component
- Keep minimal logic, focus on display
- Use CSS custom properties for color
- Ensure proper sizing (`block-size: 100%`, `inline-size: 1fr`)

### HueFamily Component
- Display swatches in horizontal grid
- Show value table only when focused
- Handle label editing and override tracking
- Emit focus events to parent

### GlobalControls Component
- Group controls logically by function
- Use consistent spacing and layout
- Render ChannelControl for numeric inputs
- Use select dropdown for easing curves

### ColorEditor Component
- Only render when family is focused
- Provide close/done button
- Handle name override toggle
- Emit updates to parent

## State Management Guidelines

### useColorState.js
- Use `ref()` for primitive values
- Use `reactive()` for objects
- Use `computed()` for derived values
- Export state and methods separately
- Keep state mutations centralized

### Color Utilities
- Keep pure functions (no side effects)
- Handle edge cases (NaN, null, undefined)
- Return consistent data structures
- Document function signatures

## CSS Guidelines

### File Organization
- `main.css`: Global styles, CSS variables, resets
- `layout.css`: Grid/flexbox layouts
- `components.css`: Component-specific styles
- `controls.css`: Form control styles

### Modern CSS Features
- Use CSS Grid for complex layouts
- Use Flexbox for alignment
- Use CSS Custom Properties for theming
- Use logical properties (`block-size`, `inline-size`)

### Responsive Design
- Mobile-first approach
- Stack panels vertically on small screens
- Maintain readability at all sizes
- Touch-friendly controls (min 44px touch targets)

## Testing Checklist

Before marking a task complete:

- [ ] Feature functions as specified
- [ ] No console errors
- [ ] No build errors
- [ ] Colors render correctly
- [ ] Controls are responsive
- [ ] Edge cases handled gracefully
- [ ] Code follows existing patterns
- [ ] Comments explain complex logic

## Git Commit Messages

Format: `feat: [component/feature] description`

Examples:
- `feat: ChannelControl component with synchronized input/slider`
- `feat: GlobalControls sidebar with transform settings`
- `fix: Hue wrapping in color interpolation`
- `style: Add responsive layout for mobile`

## Performance Considerations

- Use `computed()` for expensive calculations
- Debounce slider inputs during drag
- Avoid unnecessary re-renders
- Cache color calculations where possible
- Lazy load components if needed

## Debugging Tips

- Use Vue DevTools to inspect component state
- Check browser console for Chroma.js errors
- Verify OKLCH values are in valid ranges
- Test with different color spaces if issues arise
- Use `console.log()` sparingly for debugging

## Before You Begin

Make sure you have:
1. Read all documentation files
2. Understood the component specifications
3. Reviewed the development workflow
4. Fetched Context7 documentation
5. Initialized the Vue + Vite project
6. Set up git and connected to remote

## Questions?

If you encounter ambiguities or need clarification:
- Check existing code patterns
- Review documentation files
- Test incrementally
- Ask user if still unclear

