'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // Listeners para diferentes eventos de carregamento
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('canplaythrough', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    // Força o carregamento do áudio
    audio.load();

    // Se a duração já está disponível, atualiza imediatamente
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
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
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

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl p-8 text-white">
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        preload="metadata"
        src="https://ia801607.us.archive.org/17/items/08-minecraft_202302/18%20-%20Sweden.mp3"
      />

      {/* Album Cover */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
        <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <div className="text-6xl">🎵</div>
        </div>
      </div>

      {/* Track Info */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">Audio Player</h2>
        <p className="text-sm text-gray-400">Sua Música</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <button className="text-gray-400 hover:text-white transition-colors">
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

        <button className="text-gray-400 hover:text-white transition-colors">
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 px-2">
        <Volume2 size={18} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-xs text-gray-400 w-6 text-right">{volume}</span>
      </div>

      {/* Status */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          {isPlaying ? '🎵 Reproduzindo' : '⏸ Pausado'}
        </p>
      </div>
    </div>
  );
}
