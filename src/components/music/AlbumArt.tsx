interface AlbumArtProps {
  cover: string;
  title: string;
  isPlaying: boolean;
}

/**
 * Album artwork display with spinning animation when playing
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
