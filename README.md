# Harmony Player

A modern, full-featured music player web application built with React, TypeScript, and Tailwind CSS. Harmony Player provides an intuitive interface for managing and playing music with professional-grade features.

## Overview

Harmony Player is a single-page application that delivers an exceptional music playback experience with a clean, responsive design. The application implements core playback controls, advanced features like shuffle and repeat modes, and a comprehensive playlist management system.

## Features

- **Playback Controls**: Play, pause, next, and previous track navigation
- **Progress Tracking**: Interactive progress bar with seek functionality and time display
- **Volume Management**: Adjustable volume control with visual feedback
- **Playlist Management**: Full playlist view with current track highlighting
- **Shuffle & Repeat**: Support for shuffle play and repeat modes (all, one)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations
- **Keyboard Accessibility**: Full keyboard navigation support

## Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Audio API**: HTML5 Audio API
- **State Management**: React Hooks
- **Routing**: React Router
- **Icon Library**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/harmony-player.git
cd harmony-player
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build with development mode
npm run build:dev

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── music/          # Music player specific components
│   ├── ui/             # Reusable UI components
│   └── NavLink.tsx     # Navigation component
├── pages/              # Page components
├── data/               # Static data (songs, etc.)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── lib/                # Library utilities
└── test/               # Test files
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and development process.

## Architecture

For detailed information about the application architecture, please refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
