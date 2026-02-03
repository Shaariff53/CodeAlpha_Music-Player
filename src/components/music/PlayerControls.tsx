import { SkipBack, SkipForward, Play, Pause, Shuffle, Repeat } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  repeatMode?: "off" | "one" | "all";
  isShuffle?: boolean;
}

/**
 * Main player control buttons: Previous, Play/Pause, Next
 * Includes shuffle and repeat buttons (visual only for now)
 */
const PlayerControls = ({
  isPlaying,
  canGoBack,
  canGoForward,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  repeatMode = "off",
  isShuffle = false,
}: PlayerControlsProps) => {
  // Helper function to get repeat button display
  const getRepeatIcon = () => {
    if (repeatMode === "one") {
      return <span className="absolute -top-1 -right-1 text-xs font-bold">1</span>;
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Shuffle button */}
      <button
        onClick={onShuffle}
        className={`control-button p-2 ${isShuffle ? "text-primary" : ""}`}
        aria-label="Shuffle"
        title={isShuffle ? "Shuffle: On" : "Shuffle: Off"}
      >
        <Shuffle className="w-4 h-4" />
      </button>

      {/* Previous button */}
      <button
        onClick={onPrevious}
        disabled={!canGoBack}
        className="control-button"
        aria-label="Previous song"
      >
        <SkipBack className="w-5 h-5" fill="currentColor" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={onPlayPause}
        className="control-button-primary"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
        )}
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!canGoForward}
        className="control-button"
        aria-label="Next song"
      >
        <SkipForward className="w-5 h-5" fill="currentColor" />
      </button>

      {/* Repeat button */}
      <button
        onClick={onRepeat}
        className={`control-button p-2 relative ${repeatMode !== "off" ? "text-primary" : ""}`}
        aria-label={`Repeat: ${repeatMode}`}
        title={`Repeat: ${repeatMode}`}
      >
        <Repeat className="w-4 h-4" />
        {getRepeatIcon()}
      </button>
    </div>
  );
};

export default PlayerControls;
