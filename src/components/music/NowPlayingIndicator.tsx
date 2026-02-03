interface NowPlayingIndicatorProps {
  isPlaying: boolean;
}

/**
 * Animated sound wave indicator for currently playing song
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
