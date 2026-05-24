interface AlbumArtProps {
  cover: string;
  title: string;
  isPlaying: boolean;
}

/**
 * Album artwork display component with responsive sizing.
 *
 * Renders the album cover image for the currently playing song.
 * Dimensions are responsive based on screen size:
 * - Mobile: 256x256px
 * - Tablet: 288x288px
 * - Desktop: 320x320px
 *
 * @param cover - URL of the album cover image
 * @param title - Song title (used for alt text)
 * @param isPlaying - Whether the song is currently playing
 */
const AlbumArt = ({ cover, title, isPlaying }: AlbumArtProps) => {
  return (
    <div className="album-art w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
      <div className={`w-full h-full rounded-xl overflow-hidden ${isPlaying ? "" : ""}`}>
        <img
          src={cover}
          alt={`${title} album cover`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default AlbumArt;
