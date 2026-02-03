import { useRef, useCallback } from "react";
import { formatTime } from "@/utils/formatTime";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

/**
 * Interactive progress bar with seek functionality
 * Shows current time, total duration, and allows clicking to seek
 */
const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle click on progress bar to seek
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration <= 0) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;
    
    onSeek(Math.max(0, Math.min(newTime, duration)));
  }, [duration, onSeek]);

  return (
    <div className="w-full space-y-2">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="progress-track group"
        onClick={handleClick}
        role="slider"
        aria-label="Song progress"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
        tabIndex={0}
      >
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time display */}
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
