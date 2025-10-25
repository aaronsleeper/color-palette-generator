# Context7 Resources

This document lists the Context7-compatible library IDs for documentation lookup.

## Chroma.js
- **Context7 ID**: `/gka/chroma.js`
- **Official Docs**: https://gka.github.io/chroma.js/
- **Purpose**: All color functions, transforms, and color naming

### Key Topics to Fetch
- OKLCH color space operations
- Color interpolation and mixing
- Color naming functions
- CSS color format generation

## Vue 3
- **Context7 ID**: Search for "Vue 3" or "vue"
- **Official Docs**: https://vuejs.org/
- **Purpose**: Component framework, Composition API, reactivity

### Key Topics to Fetch
- Composition API patterns
- Reactive state management
- Component lifecycle
- Template syntax

## Vite
- **Context7 ID**: Search for "Vite"
- **Official Docs**: https://vitejs.dev/
- **Purpose**: Build tool and dev server

### Key Topics to Fetch
- Project setup and configuration
- Dev server features
- Build optimization
- Plugin system

## Usage Instructions

When implementing features:

1. Fetch relevant documentation using Context7 tools
2. Reference `context7CompatibleLibraryID` format: `/org/project`
3. Specify topic when fetching to narrow results
4. Use examples from documentation to guide implementation

## Example Context7 Query

```javascript
// Fetch Chroma.js documentation on OKLCH
mcp_context7_get-library-docs({
  context7CompatibleLibraryID: '/gka/chroma.js',
  topic: 'OKLCH color space interpolation',
  tokens: 3000
})
```

