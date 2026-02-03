import { useState, useRef, useEffect, useCallback } from "react";
import { songs } from "@/data/songs";
import AlbumArt from "./AlbumArt";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import Playlist from "./Playlist";
import { Disc3 } from "lucide-react";

/**
 * Main Music Player component
 * Handles all audio playback logic and state management
 */
const MusicPlayer = () => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [autoplay, setAutoplay] = useState(true);
  const [repeat, setRepeat] = useState<"off" | "one" | "all">("all");
  const [shuffle, setShuffle] = useState(false);

  // Audio element reference
  const audioRef = useRef<HTMLAudioElement>(null);

  // Current song data
  const currentSong = songs[currentSongIndex];

  // Check if navigation is possible
  const canGoBack = currentSongIndex > 0;
  const canGoForward = currentSongIndex < songs.length - 1;

  /**
   * Play or pause the current track
   */
  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  /**
   * Go to previous song
   */
  const handlePrevious = useCallback(() => {
    if (!canGoBack) return;
    setCurrentSongIndex((prev) => prev - 1);
    setCurrentTime(0);
  }, [canGoBack]);

  /**
   * Go to next song
   */
  const handleNext = useCallback(() => {
    if (shuffle) {
      // Random shuffle: pick a random song
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else if (canGoForward) {
      setCurrentSongIndex((prev) => prev + 1);
    } else if (repeat === "all") {
      // Loop back to beginning
      setCurrentSongIndex(0);
    }
    setCurrentTime(0);
  }, [canGoForward, shuffle, repeat]);

  /**
   * Select a specific song from the playlist
   */
  const handleSongSelect = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  }, []);

  /**
   * Seek to a specific time in the track
   */
  const handleSeek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  /**
   * Update volume
   */
  const handleVolumeChange = useCallback((newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }, []);

  /**
   * Cycle through repeat modes: off -> one -> all -> off
   */
  const handleRepeat = useCallback(() => {
    setRepeat((prev) => {
      if (prev === "off") return "one";
      if (prev === "one") return "all";
      return "off";
    });
  }, []);

  /**
   * Toggle shuffle mode
   */
  const handleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  /**
   * Toggle autoplay mode
   */
  const handleAutoplay = useCallback(() => {
    setAutoplay((prev) => !prev);
  }, []);

  // Update audio source when song changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = currentSong.audioSrc;
    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentSongIndex, currentSong.audioSrc]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat === "one") {
        // Repeat current song
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      } else if (autoplay) {
        // Auto-play next song if available
        if (shuffle) {
          // Random shuffle: pick a random song
          const randomIndex = Math.floor(Math.random() * songs.length);
          setCurrentSongIndex(randomIndex);
        } else if (canGoForward) {
          setCurrentSongIndex((prev) => prev + 1);
        } else if (repeat === "all") {
          // Loop back to beginning
          setCurrentSongIndex(0);
        } else {
          setIsPlaying(false);
        }
        setCurrentTime(0);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [canGoForward, autoplay, repeat, shuffle]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Header */}
      <header className="text-center mb-8 fade-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Disc3 className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Music Player
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Your personal audio experience
        </p>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Now Playing Section */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 md:p-8 fade-in">
            {/* Album Art */}
            <div className="mb-8">
              <AlbumArt
                cover={currentSong.cover}
                title={currentSong.title}
                isPlaying={isPlaying}
              />
            </div>

            {/* Song Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1 truncate">
                {currentSong.title}
              </h2>
              <p className="text-muted-foreground">
                {currentSong.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
            </div>

            {/* Player Controls */}
            <div className="mb-6">
              <PlayerControls
                isPlaying={isPlaying}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onShuffle={handleShuffle}
                onRepeat={handleRepeat}
                repeatMode={repeat}
                isShuffle={shuffle}
              />
            </div>

            {/* Volume Control */}
            <div className="flex justify-center mb-6">
              <VolumeControl
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </div>

            {/* Autoplay Indicator */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handleAutoplay}
                className={`text-sm px-4 py-2 rounded-full transition-all ${
                  autoplay
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={autoplay ? "Autoplay: On" : "Autoplay: Off"}
              >
                {autoplay ? "🔄 Autoplay ON" : "🔄 Autoplay OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* Playlist Section */}
        <div className="lg:col-span-1 fade-in" style={{ animationDelay: "0.1s" }}>
          <Playlist
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-8 text-muted-foreground text-sm">
        <p>Built with ❤️ using React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default MusicPlayer;
