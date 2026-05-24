# Development Guide

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or equivalent package manager
- Git

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shaariff53/Music-Player.git
   cd Music-Player
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` with hot module replacement enabled.

## Development Workflow

### Project Structure

```
src/
├── components/          # React components
│   ├── music/          # Music player specific components
│   │   ├── MusicPlayer.tsx       # Main orchestrator component
│   │   ├── PlayerControls.tsx    # Control buttons (play, pause, etc.)
│   │   ├── ProgressBar.tsx       # Progress and seeking functionality
│   │   ├── VolumeControl.tsx     # Volume slider and mute button
│   │   ├── Playlist.tsx          # Song list view
│   │   ├── AlbumArt.tsx          # Album cover display
│   │   └── NowPlayingIndicator.tsx # Animated soundwave indicator
│   ├── ui/             # Reusable UI components from shadcn/ui
│   └── NavLink.tsx     # Navigation component
├── pages/              # Page-level components
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
├── data/               # Static application data
│   └── songs.ts        # Sample song data
├── types/              # TypeScript type definitions
│   └── music.ts        # Music-related interfaces
├── utils/              # Utility functions
│   └── formatTime.ts   # Time formatting helper
├── hooks/              # Custom React hooks
├── lib/                # Library utilities
├── test/               # Test files
├── App.tsx             # Main application component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

### Available Commands

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run build:dev        # Build with development mode enabled
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint checks
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode

# Package Management
npm install              # Install dependencies
npm audit                # Check for security vulnerabilities
npm audit fix            # Automatically fix vulnerabilities
```

## Code Quality Standards

### TypeScript

- Strictly use TypeScript for type safety
- Define interfaces for component props
- Avoid using `any` type
- Use discriminated unions for complex state

### React

- Use functional components with hooks
- Implement proper error boundaries
- Maintain single responsibility principle
- Use proper hook dependencies

### Component Documentation

All components should include JSDoc comments:

```typescript
/**
 * Brief description of what the component does.
 *
 * Longer description if needed.
 *
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 * @returns JSX element
 */
const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // Implementation
};
```

### Naming Conventions

- **Components**: PascalCase (e.g., `PlayerControls.tsx`)
- **Utilities**: camelCase (e.g., `formatTime.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase with suffix (e.g., `PlayerState`, `SongProps`)

## Testing

### Running Tests

```bash
npm run test             # Run all tests once
npm run test:watch       # Run tests in watch mode
```

### Test Structure

Tests are located in `src/test/` directory. Use Vitest for testing:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

## Styling

- Use Tailwind CSS for styling
- Use shadcn/ui components for consistent UI
- Follow existing dark theme and color scheme
- Maintain responsive design (mobile-first approach)

### Color Scheme

- Primary accent: Cyan/Teal (`#22d3ee`)
- Background: Dark (`#0f0f0f`)
- Surface: Dark gray (`#1a1a1a`)

## Version Control

### Commit Message Format

Use conventional commit format:

```
<type>(<scope>): <subject>
<blank line>
<body>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic change)
- `refactor`: Code refactoring
- `test`: Test additions or updates
- `chore`: Build process, dependencies, etc.

Examples:
```
feat(player): add repeat mode functionality
fix(progress-bar): correct seeking calculation
docs(readme): update installation instructions
refactor(components): extract volume control logic
```

### Branch Naming

Use descriptive branch names:
```
feature/new-feature-name
bugfix/issue-description
docs/documentation-update
```

## Performance Optimization

### Key Areas

- Lazy load components with React.lazy()
- Memoize expensive computations with useMemo()
- Prevent unnecessary re-renders with React.memo()
- Use useCallback for event handlers
- Optimize images and assets

### Monitoring

- Use React DevTools Profiler
- Check lighthouse scores
- Monitor bundle size with `npm run build`

## Debugging

### Browser DevTools

- Use React DevTools extension for component inspection
- Redux DevTools for state inspection
- Network tab for API calls
- Console for error messages

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## Dependencies

### Core Dependencies

- **React 18+**: UI library
- **React Router**: Client-side routing
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Vite**: Fast build tool

### Dev Dependencies

- **ESLint**: Code quality
- **Vitest**: Unit testing
- **PostCSS**: CSS processing
- **Tailwind CSS**: Styling framework

### UI Components (shadcn/ui)

Pre-built, accessible components based on Radix UI.

## Common Issues and Solutions

### Module Resolution Issues

If you see module import errors, ensure:
1. Path alias `@` is configured in `tsconfig.json`
2. Import paths match the alias configuration
3. Files exist in the specified locations

### Hot Reload Not Working

1. Check if Vite dev server is running
2. Verify HMR configuration in `vite.config.ts`
3. Clear browser cache and refresh

### TypeScript Compilation Errors

```bash
npm install                    # Reinstall dependencies
npm run build                  # Check build errors
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [shadcn/ui Components](https://ui.shadcn.com)

## Getting Help

- Check existing GitHub issues
- Create a new issue with detailed description
- Refer to CONTRIBUTING.md for contribution guidelines
