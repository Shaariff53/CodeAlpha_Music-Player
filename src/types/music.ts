export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number; // in seconds
  cover: string;
  audioSrc: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  currentSongIndex: number;
}
