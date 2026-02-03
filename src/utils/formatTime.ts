/**
 * Formats seconds into MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "3:45")
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
