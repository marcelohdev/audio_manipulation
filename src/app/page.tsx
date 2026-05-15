import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">🎵 Audio Manipulation</h1>
          <p className="text-gray-400 text-lg">Controle seu áudio com facilidade</p>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
}
