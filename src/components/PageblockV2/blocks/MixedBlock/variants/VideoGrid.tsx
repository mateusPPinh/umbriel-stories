import React, { useRef, useState, useEffect } from 'react';
import { BlockVariant, Article, GridStyles } from '../../../types';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
      mediaConfig?: {
        videoConfig?: {
          autoplay?: boolean;
          loop?: boolean;
          muted?: boolean;
          controls?: boolean;
          customUrl?: string;
        };
      };
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const useFormatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const VideoGrid: React.FC<BaseVariantProps> = ({ 
  variant, 
  isDarkTheme, 
  customStyles
}) => {
  const classes = defaultClasses.mixed.video || { container: '' };
  const { articles } = variant.config;
  const styles = variant.config.styles || {};
  const mediaConfig = variant.config.mediaConfig || {};

  // Get main article and secondary articles
  const mainArticle = articles['col-0']?.[0];
  const secondaryArticles = articles['col-1'] || [];
  const tertiaryArticles = articles['col-2'] || [];

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
              loop={isPreviewPlaying} // Loop only during preview
              muted={isPreviewPlaying || (mediaConfig.videoConfig?.muted ?? false)} // Always muted during preview
              controls={!isPreviewPlaying && (mediaConfig.videoConfig?.controls ?? true)} // Hide controls during preview
              className={`w-full h-full object-cover aspect-video ${classes?.customVideoHeight || ''}`}
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

            {/* Title and Subtitle Overlay for Video */}
            <div 
              className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Link 
                href={generateArticleUrl(article)}
                className="hover:underline transition-all duration-300"
              >
                <h2 className={`${classes?.heading || 'text-xl font-semibold mb-2'} text-white`}>
                  {article.title}
                </h2>
              </Link>
              
              {styles.showExcerpt && (
                <p className={`${classes?.subtitle || 'text-base'} text-white/80`}>
                  {article.subtitle}
                </p>
              )}
            </div>

            {/* Video Controls - Show during preview and normal playback */}
            {!mediaConfig.videoConfig?.controls && (
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-blue-500 transition-colors"
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
                  
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <span>{useFormatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{useFormatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="relative w-full h-1 bg-white/20 rounded-full mt-2">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
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

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || 'grid grid-cols-1 lg:grid-cols-12 gap-6'}>
        {/* Main Article */}
        {mainArticle && (
          <div className={customStyles?.mainColumn || 'lg:col-span-6'}>
            <VideoPlayer 
              article={mainArticle} 
              customUrl={mediaConfig.videoConfig?.customUrl}
              className='aspect-[16/9] mb-4'
            />
          </div>
        )}

        {/* Secondary Articles */}
        <div className={classes?.secondaryColumn || 'lg:col-span-3 lg:border-l border-gray-200 dark:border-gray-700'}>
          <div className={classes?.secondaryGrid || 'space-y-6 lg:pl-6'}>
            {secondaryArticles.map((article: Article, index: number) => (
              <div
                key={article.id}
                className={[
                  index !== secondaryArticles.length - 1
                    ? 'border-b border-gray-200 dark:border-gray-700 pb-6'
                    : ''
                ].filter(Boolean).join(' ')}
              >
                <VideoPlayer 
                  article={article}
                  className="aspect-[4/3] mb-4"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className={classes?.tertiaryColumn || 'lg:col-span-3 lg:border-l border-gray-200 dark:border-gray-700'}>
          <div className={classes?.tertiaryGrid || 'space-y-6 lg:pl-6'}>
            {tertiaryArticles.map((article: Article, index: number) => (
              <div
                key={article.id}
                className={[
                  index !== tertiaryArticles.length - 1
                    ? 'border-b border-gray-200 dark:border-gray-700 pb-6'
                    : ''
                ].filter(Boolean).join(' ')}
              >
                <VideoPlayer 
                  article={article}
                  className="aspect-[4/3] mb-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGrid; 