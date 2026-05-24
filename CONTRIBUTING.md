# Contributing to Harmony Player

Thank you for your interest in contributing to Harmony Player! We appreciate your effort and want to make the contribution process as smooth as possible.

## Code of Conduct

By participating in this project, you agree to be respectful and constructive in all interactions.

## How to Contribute

### Reporting Issues

Before creating an issue, please search existing issues to avoid duplicates.

When reporting an issue, include:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment (browser, OS, Node version)

### Submitting Changes

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/harmony-player.git
   cd harmony-player
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, concise code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add feature description"
   ```

   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for test additions
   - `style:` for code style changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference related issues
   - Ensure all tests pass

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names
- Add JSDoc comments for exported functions and components

### Component Guidelines

- Keep components focused and single-responsibility
- Use React hooks for state management
- Props should be TypeScript interfaces
- Add prop documentation in JSDoc comments

Example:
```typescript
/**
 * Displays a song progress bar with seek functionality.
 *
 * @param currentTime - Current playback time in seconds
 * @param duration - Total song duration in seconds
 * @param onSeek - Callback function when user seeks to a position
 */
const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  // Implementation
};
```

### Testing

- Write tests for new features
- Maintain test coverage
- Run tests before submitting PR: `npm run test`

### Documentation

- Update README for new features
- Add comments to complex logic
- Update ARCHITECTURE.md if structure changes

## Questions?

Feel free to open an issue for questions or suggestions.

Thank you for contributing!
