# Harmony Player Architecture

## Overview

Harmony Player is a React-based single-page application (SPA) that implements a feature-rich music player with a component-driven architecture. The application uses React hooks for state management and TypeScript for type safety.

## Application Structure

### High-Level Flow

```
App (Entry Point)
├── Router Setup (React Router)
├── Query Client Provider (TanStack Query)
├── Tooltip Provider (UI Framework)
└── Index Page
    └── MusicPlayer (Main Component)
        ├── AlbumArt
        ├── PlayerControls
        ├── ProgressBar
        ├── VolumeControl
        └── Playlist
```

## Core Components

### MusicPlayer Component

The main component that orchestrates all music playback logic.

**Responsibilities:**
- Audio playback control (play, pause, skip)
- State management for playback (time, volume, current song)
- Song navigation (previous, next, shuffle, repeat)
- Seeking within tracks
- Playlist selection

**State Variables:**
- `isPlaying`: Boolean indicating current playback state
- `currentSongIndex`: Index of the currently playing song
- `currentTime`: Current playback position in seconds
- `duration`: Total duration of current song in seconds
- `volume`: Volume level (0-1)
- `shuffle`: Boolean for shuffle mode
- `repeat`: Repeat mode ("off", "one", "all")

### Child Components

#### AlbumArt
Displays the album cover artwork for the current song with animations and responsive sizing.

#### PlayerControls
Renders playback control buttons:
- Previous/Next navigation
- Play/Pause toggle
- Shuffle button
- Repeat button

#### ProgressBar
Interactive progress indicator with:
- Visual progress representation
- Seek functionality (click to jump)
- Time display (current / total)
- ARIA attributes for accessibility

#### VolumeControl
Volume adjustment interface:
- Volume slider (0-100%)
- Mute/unmute button
- Visual volume indicators

#### Playlist
Displays all available songs with:
- Current track highlighting
- Album thumbnails
- Click-to-play functionality
- Scrollable view

## Data Management

### Songs Data

Located in `src/data/songs.ts`, the songs array contains static song metadata:

```typescript
interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number; // in seconds
  cover: string;    // image URL
  audioSrc: string; // audio file URL
}
```

### Player State Types

Located in `src/types/music.ts`:

```typescript
interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentSongIndex: number;
}
```

## Audio Implementation

The application uses the HTML5 Audio API (`<audio>` element) for playback.

### Key Methods

- `play()`: Start or resume playback
- `pause()`: Pause playback
- `currentTime`: Get/set playback position
- `volume`: Get/set volume level (0-1)
- `duration`: Get track duration

### Event Listeners

- `loadedmetadata`: Updates duration when metadata is loaded
- `timeupdate`: Updates current time during playback
- `ended`: Triggers next track when current ends (if autoplay enabled)
- `canplay`: Ensures audio is ready for playback

## Styling

### Technology

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Modules**: Component-scoped styles
- **CSS Variables**: For consistent theming

### Design System

- Glassmorphism effects for modern aesthetic
- Responsive design breakpoints
- Dark/light theme support through Tailwind
- Accessibility-first approach (ARIA attributes)

## State Management Pattern

Harmony Player uses React Hooks for state management without external libraries (Redux/Zustand).

### Pattern

```typescript
const [state, setState] = useState(initialValue);
const handleAction = useCallback(() => {
  // State update logic
}, [dependencies]);
```

### Advantages

- Minimal dependencies
- Easy to understand
- Suitable for this application's scope

### Limitations

- May need refactoring for complex global state
- No time-travel debugging
- No middleware support

## Performance Optimizations

1. **useCallback**: Memoized callbacks prevent unnecessary re-renders
2. **useRef**: Persistent audio element reference without re-renders
3. **Lazy Loading**: Components loaded on-demand via React Router

## Type Safety

All components use TypeScript interfaces for props:

```typescript
interface ComponentProps {
  prop1: string;
  prop2: number;
  onAction: () => void;
}
```

Benefits:
- Compile-time type checking
- IDE autocomplete support
- Self-documenting code

## Testing Strategy

Test coverage includes:
- Component rendering tests
- User interaction tests
- State management tests
- Audio functionality tests

Run tests with: `npm run test`

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Color contrast compliance
- Screen reader compatibility

## Future Enhancement Opportunities

1. **Local Storage**: Persist user preferences (volume, recent songs)
2. **Search/Filter**: Find songs by title or artist
3. **Favorites**: Save and manage favorite songs
4. **Themes**: Dark/light mode toggle
5. **Queue Management**: Reorder upcoming songs
6. **Settings Panel**: User preferences UI
7. **Now Playing**: Enhanced now-playing view
8. **Audio Visualization**: Waveform or spectrum visualizer
9. **Multi-Playlist**: Support multiple playlists
10. **Remote API**: Fetch songs from backend service

## Deployment

The application is built with Vite and optimized for production:

```bash
npm run build        # Creates dist/ folder
npm run preview      # Preview production build locally
```

Suitable deployment platforms:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Docker container

## Dependencies

### Core Dependencies

- `react`: UI framework
- `react-router-dom`: Client-side routing
- `@tanstack/react-query`: Server state management
- `typescript`: Type safety
- `tailwindcss`: Styling framework
- `lucide-react`: Icon library

### Development Dependencies

- `vite`: Build tool
- `vitest`: Unit testing framework
- `eslint`: Code linting
- `postcss`: CSS processing

See `package.json` for complete dependency list with versions.
