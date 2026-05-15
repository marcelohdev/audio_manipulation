'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Zap } from 'lucide-react';

interface Track {
  id: number;
  name: string;
  url: string;
  icon: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    name: 'Sweden - Minecraft',
    url: 'https://ia801607.us.archive.org/17/items/08-minecraft_202302/18%20-%20Sweden.mp3',
    icon: '🎮'
  },
  {
    id: 2,
    name: 'Subwoofer Lullaby - Minecraft',
    url: 'https://dn710204.ca.archive.org/0/items/08-minecraft_202302/03%20-%20Subwoofer%20Lullaby.mp3',
    icon: '🌙'
  },
  {
    id: 3,
    name: 'Haggstrom - Minecraft',
    url: 'https://dn710204.ca.archive.org/0/items/08-minecraft_202302/07%20-%20Haggstrom.mp3',
    icon: '🎬'
  }
];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('canplaythrough', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    audio.currentTime = 0;
    audio.load();

    setTimeout(() => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    }, 100);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('canplaythrough', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const skipForward = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + seconds, duration);
  };

  const skipBackward = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - seconds, 0);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 px-4">
      {/* Main Player - 2 colunas */}
      <div className="lg:col-span-2 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl p-8 text-white">
        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          preload="metadata"
          src={currentTrack.url}
        />

        {/* Album Cover */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
          <div className={`w-full aspect-square bg-gradient-to-br ${isPlaying ? 'from-green-400 to-green-600 animate-pulse' : 'from-gray-700 to-gray-800'} flex items-center justify-center transition-all`}>
            <div className="text-7xl">{currentTrack.icon}</div>
          </div>
        </div>

        {/* Track Info */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{currentTrack.name}</h2>
          <p className={`text-sm ${isPlaying ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>
            {isPlaying ? '🎵 Reproduzindo' : '⏸ Pausado'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => skipBackward(10)}
            className="text-gray-400 hover:text-green-400 transition-colors hover:scale-110"
            title="Retroceder 10s"
          >
            <Zap size={22} />
          </button>

          <button
            onClick={handlePreviousTrack}
            className="text-gray-400 hover:text-white transition-colors"
            title="Áudio anterior"
          >
            <SkipBack size={24} />
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full transition-all hover:scale-110 shadow-lg"
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" />
            )}
          </button>

          <button
            onClick={handleNextTrack}
            className="text-gray-400 hover:text-white transition-colors"
            title="Próximo áudio"
          >
            <SkipForward size={24} />
          </button>

          <button
            onClick={() => skipForward(10)}
            className="text-gray-400 hover:text-green-400 transition-colors hover:scale-110"
            title="Avançar 10s"
          >
            <Zap size={22} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 px-2 mb-4">
          <Volume2 size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0">{volume}%</span>
        </div>

        {/* Tempo Control */}
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">Tempo:</span>
          <select
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            className="flex-1 px-2 py-2 bg-gray-800 text-white border border-gray-600 rounded text-xs cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {/* Playlist - 3 colunas */}
      <div className="lg:col-span-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white h-fit">
        <h3 className="text-2xl font-bold mb-6">Playlist</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {TRACKS.map((track, index) => (
            <button
              key={track.id}
              onClick={() => handleSelectTrack(index)}
              className={`w-full text-left p-4 rounded-lg transition-all transform ${
                index === currentTrackIndex
                  ? 'bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold shadow-lg scale-105'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-100 hover:scale-102'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{track.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{track.name}</p>
                  <p className="text-xs opacity-75 mt-1">{formatTime(duration)}</p>
                </div>
                {index === currentTrackIndex && (
                  <div className="text-xl animate-pulse">♫</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
