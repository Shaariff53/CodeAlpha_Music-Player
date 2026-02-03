import { Song } from "@/types/music";
import { formatTime } from "@/utils/formatTime";
import NowPlayingIndicator from "./NowPlayingIndicator";
import { Music } from "lucide-react";

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
}

/**
 * Playlist component displaying all available songs
 * Highlights the currently playing song with an indicator
 */
const Playlist = ({
  songs,
  currentSongIndex,
  isPlaying,
  onSongSelect,
}: PlaylistProps) => {
  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 px-2 flex items-center gap-2">
        <Music className="w-5 h-5 text-primary" />
        Playlist
      </h2>
      
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {songs.map((song, index) => {
          const isActive = index === currentSongIndex;
          
          return (
            <div
              key={song.id}
              onClick={() => onSongSelect(index)}
              className={`playlist-item ${isActive ? "playlist-item-active" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`Play ${song.title} by ${song.artist}`}
              onKeyDown={(e) => e.key === "Enter" && onSongSelect(index)}
            >
              {/* Album art thumbnail */}
              <div className="album-art-small relative">
                <img
                  src={song.cover}
                  alt={`${song.title} cover`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay indicator for active song */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <NowPlayingIndicator isPlaying={isPlaying} />
                  </div>
                )}
              </div>

              {/* Song info */}
              <div className="flex-1 min-w-0">
                <p className={`playlist-title font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                  {song.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>

              {/* Duration */}
              <span className="text-sm text-muted-foreground tabular-nums">
                {formatTime(song.duration)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
