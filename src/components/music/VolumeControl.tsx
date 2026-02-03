import { useRef, useCallback, useState } from "react";
import { Volume2, Volume1, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

/**
 * Volume control with slider and mute toggle
 */
const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [previousVolume, setPreviousVolume] = useState(volume);

  // Get appropriate volume icon based on level
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  // Handle click on volume slider
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    
    onVolumeChange(Math.max(0, Math.min(percentage, 1)));
  }, [onVolumeChange]);

  // Handle mute/unmute toggle
  const handleMuteToggle = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(previousVolume || 0.5);
    }
  }, [volume, previousVolume, onVolumeChange]);

  return (
    <div className="flex items-center gap-2 group">
      {/* Mute/Unmute button */}
      <button
        onClick={handleMuteToggle}
        className="control-button p-2"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        <VolumeIcon className="w-5 h-5" />
      </button>

      {/* Volume slider */}
      <div
        ref={sliderRef}
        className="volume-slider w-24 relative"
        onClick={handleClick}
        role="slider"
        aria-label="Volume"
        aria-valuenow={Math.round(volume * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
