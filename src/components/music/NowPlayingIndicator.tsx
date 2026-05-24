interface NowPlayingIndicatorProps {
  isPlaying: boolean;
}

/**
 * Animated sound wave indicator for the currently playing song.
 *
 * Displays an animated three-bar visualizer when music is playing,
 * and shows a static play symbol when paused. Used as overlay
 * indicator in the playlist view.
 *
 * @param isPlaying - Whether the song is currently playing (true) or paused (false)
 */
const NowPlayingIndicator = ({ isPlaying }: NowPlayingIndicatorProps) => {
  if (!isPlaying) {
    return (
      <div className="w-4 h-3 flex items-center justify-center">
        <div className="w-0 h-0 border-l-[6px] border-l-primary border-y-[4px] border-y-transparent" />
      </div>
    );
  }

  return (
    <div className="now-playing-indicator">
      <div className="now-playing-bar" />
      <div className="now-playing-bar" />
      <div className="now-playing-bar" />
      <div className="now-playing-bar" />
    </div>
  );
};

export default NowPlayingIndicator;
