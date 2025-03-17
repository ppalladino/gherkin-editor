# CLAUDE.md - Gherkin Editor Code Guidelines

## Commands

- **Development**: `npm run dev` (uses turbopack)
- **Build**: `npm run build`
- **Start (prod)**: `npm run start`
- **Lint**: `npm run lint`

## Code Style Guidelines

### TypeScript & React
- Use strict TypeScript with explicit types for component props using interfaces
- Follow Next.js 15+ App Router patterns with "use client" directive when needed
- Utilize React 19 features with proper hooks management

### Structure
- Component files use PascalCase (e.g., `SemanticStepSorter.tsx`)
- Folders prefixed with underscore for non-routes (`_components`, `_lib`)
- Group related functionality in feature folders

### Imports
- Use absolute imports with `@/` alias (e.g., `@/components/ui/button`)
- Group imports: React, external libraries, internal components/utils

### Styling
- Use Chakra UI with Tailwind for component styling
- Follow the project's color scheme using `brand.*` tokens

### Error Handling
- Use try/catch blocks with specific error logging
- Handle loading/error states gracefully in UI components

### State Management
- Use React Redux (Redux Toolkit) for global state
- Prefer local component state for UI-specific concerns