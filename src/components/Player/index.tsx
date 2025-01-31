import { type ReactElement, useState, useRef, useEffect } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  PictureInPicture,
} from 'lucide-react'

type VideoType = {
  source: string
  poster?: string
  isYoutube?: boolean
}

export default function Player({
  source,
  poster,
  isYoutube,
}: VideoType): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  // Extrai o ID do vídeo do YouTube
  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Conversão para URL embed
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${getYoutubeId(
    source
  )}?autoplay=1&mute=1`

  const togglePlay = () => {
    if (isYoutube) {
      const iframe = document.querySelector('iframe')
      if (iframe) {
        const message = isPlaying
          ? '{"event":"command","func":"pauseVideo","args":""}'
          : '{"event":"command","func":"playVideo","args":""}'
        iframe.contentWindow?.postMessage(message, '*')
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      const validVolume = Math.min(Math.max(newVolume, 0), 1)
      videoRef.current.volume = validVolume
      setVolume(validVolume)
      setIsMuted(validVolume === 0)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const togglePiP = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.current.requestPictureInPicture()
      }
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100)
    }

    video.addEventListener('timeupdate', updateProgress)
    return () => video.removeEventListener('timeupdate', updateProgress)
  }, [])

  console.log(source)

  return (
    <div className="relative group w-full aspect-video bg-black rounded-lg overflow-hidden">
      {isYoutube ? (
        <iframe
          width="100%"
          height="100%"
          src={youtubeEmbedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        />
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={poster}
            muted={isMuted}
            playsInline
          >
            <source src={source} type="video/mp4" />
            <track kind="captions" srcLang="pt" label="Português" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </>
      )}

      {!isYoutube && (
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-1 bg-gray-600">
            <div
              className="h-full bg-red-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between p-4 space-x-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVolumeChange(isMuted ? 0.5 : 0)}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(Number(e.target.value))}
                className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
              >
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={togglePiP}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Picture-in-Picture"
              >
                <PictureInPicture className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Tela cheia"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
