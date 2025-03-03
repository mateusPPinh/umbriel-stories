//https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/7ba3919c928860637210-youtube_NoMqvniiEkk_1920x1080_h264.mp4

import { useRef, useState, useEffect } from "react";
import Link from "../../../components/Link";
import { Article } from "../../../components/PageblockV2/types";
import { generateArticleUrl } from "../../../components/PageblockV2/utils/generateArticleUrl";
import styles from "../../../styles";
import React from "react";

const VideoPlayer = ({ 
  article, 
  customUrl,
  className 
}: { 
  article: Article; 
  customUrl?: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout>();
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      // Clear any existing preview timeout
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
      setIsPreviewPlaying(false);

      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setIsVideoCompleted(false); // Reset completion state when manually playing
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isPlaying) {
      // Start preview only if video isn't already playing
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPreviewPlaying(true);
        // Set timeout to stop preview after 5 seconds
        previewTimeoutRef.current = setTimeout(() => {
          if (videoRef.current && !isPlaying) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPreviewPlaying(false);
          }
        }, 5000);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Clear preview timeout
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    if (videoRef.current && !isPlaying) {
      // Stop preview only if it's not in full playback mode
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPreviewPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsVideoCompleted(true);
    setIsPreviewPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  // Video content
  if (customUrl) {
    return (
      <article className={customStyles?.article || 'flex flex-col'}>
        <div 
          className={`relative w-full ${className || ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            src={customUrl}
            autoPlay={mediaConfig.videoConfig?.autoplay ?? false}
            loop={isPreviewPlaying}
            muted={isPreviewPlaying || isMuted || (mediaConfig.videoConfig?.muted ?? false)}
            controls={!isPreviewPlaying && (mediaConfig.videoConfig?.controls ?? true)}
            className="w-full h-full object-cover aspect-video"
            playsInline
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onPlay={() => !isPreviewPlaying && setIsPlaying(true)}
            onPause={() => !isPreviewPlaying && setIsPlaying(false)}
            onEnded={handleVideoEnd}
            poster={isVideoCompleted ? article.content?.image?.desktop_image_path : undefined}
          >
            <track kind="captions" />
            Seu navegador não suporta o elemento de vídeo.
          </video>

          {/* Title and Subtitle Overlay */}
          <div 
            className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Link 
              href={generateArticleUrl(article)}
              className="hover:underline transition-all duration-300"
            >
              <h2 className={`${customStyles?.heading || 'text-xl font-semibold mb-2'} text-white`}>
                {article.title}
              </h2>
            </Link>
            
            {styles.showExcerpt && (
              <p className={`${customStyles?.subtitle || 'text-base'} text-white/80`}>
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Center Play Button */}
          {!isPlaying && !isPreviewPlaying && (
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          {/* Video Controls */}
          {!mediaConfig.videoConfig?.controls && (
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {isPlaying || isPreviewPlaying ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-white text-sm">
                  <span>{useFormatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{useFormatTime(duration)}</span>
                </div>
              </div>
              
              <div className="relative w-full h-1 bg-white/20 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // Non-video content (images)
  return (
    <article className={customStyles?.article || 'flex flex-col'}>  
      <Link 
        href={generateArticleUrl(article)}
        className="hover:underline transition-all duration-300"
      >
        <h2 className={`${classes?.heading || 'text-xl font-semibold mb-2'} ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          {article.title}
        </h2>
      </Link>
      
      {styles.showExcerpt && (
        <p className={`${classes?.subtitle || 'text-base'} ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.subtitle}
        </p>
      )}
    </article>
  );
};

export default function VideoURLInput({ onSave }: { onSave: (videoUrl: string) => void }) {
  const [videoUrl, setVideoUrl] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    
    setIsSubmitting(true);
    // Simular validação da URL
    setTimeout(() => {
      onSave(videoUrl);
      setVideoUrl('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Adicionar URL do vídeo</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Cole a URL do vídeo aqui"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar vídeo'}
        </button>
      </form>
    </div>
  );
}