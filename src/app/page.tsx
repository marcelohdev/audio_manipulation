import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Audio Manipulation</h1>
          <p className="text-gray-400">Controle seu áudio com facilidade</p>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
}
