# Video Grid Block Manager Documentation

## Overview

The Video Grid variant is designed for layouts that prominently feature video content. In this layout, the first column displays a main video, while the subsequent columns provide supporting content with simplified article details.

## Architecture

- **Core Components:**
  - Derived from MixedManager and MixedLayoutPreview with configurations specialized for video display.
  - Uses DroppableColumn to separate content into columns, with the first column dedicated to the primary video.
  - ArticlesPool is used to manage extra articles that can be added dynamically.

- **State Management:**
  - Utilizes the `useBlockState` hook to manage layout state, handling the reordering and updating of articles.

- **Configuration:**
  - The Video Grid configuration in `LAYOUT_VARIANTS` includes:
    - Maximum items per column (e.g., one main video, two supporting articles per subsequent column).
    - Column labels that are descriptive for video presentation.

## Technical Deep Dive

### Layout Structure & Configuration

The Video Grid layout is defined with specific parameters optimized for multimedia content:

```typescript
videogrid: {
  label: 'Grade de Vídeos',
  maxItems: {
    'col-0': 1,  // Vídeo principal
    'col-1': 2,  // Vídeos secundários
    'col-2': 3   // Vídeos complementares
  },
  columnLabels: {
    'col-0': 'Destaque',
    'col-1': 'Secundários',
    'col-2': 'Adicionais'
  }
}
```

This configuration:
- Dedicates the first column to a single featured video with maximum visibility
- Allocates space for two secondary videos with medium prominence
- Provides slots for three additional videos with more compact presentation
- Uses descriptive column labels that reflect the content's purpose

### Media Handling & Video Playback

The Video Grid implements specialized media handling optimized for video content:

```typescript
// Simplified video rendering function
const renderVideo = (article: Article, config: VideoDisplayConfig) => {
  const { videoUrl, thumbnailUrl, videoType } = getVideoDetails(article);
  const { autoPlay, muted, controls, loop, preload } = config;
  
  return (
    <div className="video-container" style={{ aspectRatio: config.aspectRatio || '16:9' }}>
      {/* Video overlay with play button when not autoplay */}
      {!autoPlay && (
        <div className="video-overlay">
          <button 
            className="play-button"
            onClick={() => handleVideoPlay(article.id)}
            aria-label="Play video"
          >
            <PlayIcon />
          </button>
        </div>
      )}
      
      <video
        src={videoUrl}
        poster={thumbnailUrl}
        autoPlay={autoPlay}
        muted={muted}
        controls={controls}
        loop={loop}
        preload={preload || 'metadata'}
        className="video-element"
        data-video-id={article.id}
      />
      
      <div className="video-info">
        <h3 className={getHeadingClasses('lg')}>{article.title}</h3>
        {article.excerpt && config.showExcerpt && (
          <p className={getSubtitleClasses('md')}>{article.excerpt}</p>
        )}
        {config.showDuration && article.metadata?.duration && (
          <span className="video-duration">{formatDuration(article.metadata.duration)}</span>
        )}
      </div>
    </div>
  );
};
```

Key implementation features:
- Custom video player controls with play/pause overlay
- Optional autoplay configuration with fallback thumbnail
- Metadata display including duration and publish date
- Accessibility attributes for keyboard navigation and screen readers

### Column Style Properties

The VideoGrid variant applies specific styling properties through the `getColumnProps` function:

```typescript
case 'videogrid':
  return {
    isVideoFeatured: colId === 'col-0', // Vídeo principal com autoplay
    isVideoSecondary: colId === 'col-1', // Vídeos secundários
    isVideoTertiary: colId === 'col-2', // Vídeos adicionais em formato compacto
    hasAutoplay: colId === 'col-0' && blockConfig.videoConfig?.autoplay,
    showControls: colId !== 'col-2', // Somente controles em vídeos maiores
    showExcerpt: blockConfig.styles.showExcerpt && colId !== 'col-2'
  };
```

These properties influence:
- Video playback behavior (autoplay, controls visibility)
- Video container sizing and aspect ratio
- Typography and information density
- Interactive elements like play buttons and hover states

### Grid Layout Implementation

The VideoGrid layout uses a responsive grid system with specific column spans:

```typescript
const renderVideoGridPreview = () => {
  // Column classes for responsive grid layout
  const featuredColClass = 'col-span-12 lg:col-span-6';
  const secondaryColClass = 'col-span-12 md:col-span-6 lg:col-span-3';
  const tertiaryColsClass = 'col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4';
  
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Featured video - larger with autoplay option */}
      <div className={featuredColClass}>
        {renderColumnVideos('col-0', {
          isVideoFeatured: true,
          hasAutoplay: blockConfig.videoConfig?.autoplay,
          showControls: true,
          aspectRatio: '16:9',
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      {/* Secondary videos - medium size with controls */}
      <div className="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderColumnVideos('col-1', {
          isVideoSecondary: true,
          showControls: true,
          aspectRatio: '4:3',
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      {/* Tertiary videos in compact format */}
      <div className={tertiaryColsClass}>
        {renderColumnVideos('col-2', {
          isVideoTertiary: true,
          showControls: false,
          showExcerpt: false,
          aspectRatio: '16:9'
        })}
      </div>
    </div>
  );
};
```

Key layout features:
- Prioritizes the main video with largest screen real estate
- Implements different aspect ratios optimized for each column position
- Provides responsive breakpoints for different device sizes
- Organizes tertiary videos in a clean, scannable grid

### Video Event Handling

The Video Grid implements custom event handling for video interactions:

```typescript
// Simplified video event handling
const initializeVideoHandlers = () => {
  // Track playing videos to pause others when a new one starts
  let currentlyPlaying: HTMLVideoElement | null = null;
  
  // Handle video play events
  const handleVideoPlay = (videoId: string) => {
    const videoElement = document.querySelector(`video[data-video-id="${videoId}"]`) as HTMLVideoElement;
    
    if (!videoElement) return;
    
    // Pause currently playing video if exists
    if (currentlyPlaying && currentlyPlaying !== videoElement) {
      currentlyPlaying.pause();
    }
    
    // Play the selected video
    videoElement.play()
      .then(() => {
        currentlyPlaying = videoElement;
        
        // Hide overlay once playing
        const overlay = videoElement.parentElement?.querySelector('.video-overlay');
        if (overlay) {
          overlay.classList.add('hidden');
        }
        
        // Log video start event
        logVideoEvent({
          type: 'play',
          videoId,
          timestamp: Date.now()
        });
      })
      .catch(error => {
        console.error('Video playback error:', error);
        // Show fallback UI for autoplay restrictions
        showPlaybackFallback(videoElement);
      });
  };
  
  // Add event listeners to videos
  document.querySelectorAll('video.video-element').forEach(video => {
    video.addEventListener('ended', () => {
      // Show overlay again when video ends
      const overlay = video.parentElement?.querySelector('.video-overlay');
      if (overlay) {
        overlay.classList.remove('hidden');
      }
      
      // Reset currently playing reference
      if (currentlyPlaying === video) {
        currentlyPlaying = null;
      }
    });
  });
  
  return { handleVideoPlay };
};
```

Implementation details:
- Manages exclusive playback (only one video plays at a time)
- Handles browser autoplay restrictions with fallback UI
- Provides analytics tracking for video engagement
- Manages overlay visibility based on playback state

### State Initialization for Video Content

When initializing a Video Grid layout, the state includes video-specific configurations:

```typescript
videogrid: {
  variantType: 'videogrid' as VariantType,
  variantPosition: 1,
  articles: {
    'pool': initialArticles,
    'col-0': [],
    'col-1': [],
    'col-2': []
  },
  config: {
    ...defaultConfig,
    articles: {
      'pool': initialArticles.map(article => String(article.id)),
      'col-0': [],
      'col-1': [],
      'col-2': []
    },
    videoConfig: {
      autoplay: false,
      muted: true,
      controls: true,
      loop: false,
      preload: 'metadata',
      playInline: true,
      aspectRatios: {
        'col-0': '16:9',
        'col-1': '4:3',
        'col-2': '16:9'
      }
    },
    styles: {
      ...defaultConfig.styles,
      showExcerpt: true,
      showDuration: true,
      showPublishDate: true,
      overlayStyle: 'gradient',
      playButtonSize: 'medium',
      playButtonPosition: 'center'
    }
  }
}
```

This initialization:
- Configures default video playback settings
- Sets up column-specific aspect ratios
- Configures display options for video metadata
- Customizes overlay and player control styling

### Content Type Detection and Filtering

The Video Grid implements content type detection to ensure proper media display:

```typescript
// Simplified content type detection logic
const isVideoContent = (article: Article): boolean => {
  // Check if article has video content
  if (article.mediaType === 'video') return true;
  
  // Check for video URL in content
  if (article.content && (
    article.content.includes('<video') ||
    article.content.includes('youtube.com') ||
    article.content.includes('vimeo.com')
  )) return true;
  
  // Check for video metadata
  if (article.metadata?.videoUrl) return true;
  
  return false;
};

// Filter articles to prioritize video content
const filterVideoContent = (articles: Article[]): Article[] => {
  // First get articles with explicit video content
  const videoArticles = articles.filter(isVideoContent);
  
  // If we don't have enough, include other articles that might work with video placeholders
  if (videoArticles.length < requiredCount) {
    const otherArticles = articles
      .filter(a => !isVideoContent(a))
      .slice(0, requiredCount - videoArticles.length);
    
    return [...videoArticles, ...otherArticles];
  }
  
  return videoArticles;
};
```

This functionality:
- Identifies true video content through multiple methods
- Prioritizes actual video content in the layout
- Provides fallbacks for non-video content when needed
- Helps editors select appropriate content for the video grid

## Drag and Drop Functionality

- Implements drag and drop interactions via the @hello-pangea/dnd library.
- The `handleDragEnd` function validates moves based on Video Grid rules, ensuring that the main video column maintains its limit.
- Supports repositioning and removal, with articles capable of returning to the pool for reuse.

## Styling and Themes

- Supports both dark and light themes configured through the blockConfig.
- Specialized styling is applied for video display, including aspect ratios, overlays, and interactive play buttons.

## Usage

- Initialize with appropriate article data, including video content details, a page ID, and configuration settings.
- Use the drag and drop interface to control video positioning and supporting article arrangement.
- The layout updates dynamically, and changes can be saved to persist the new arrangement via API calls.

## Customization

- Developers can adjust column limits, labels, and styling via modifications in the Video Grid variant settings.
- The design supports further enhancements through additional hooks and configuration overrides.

## Best Practices

- Place the most engaging video content in the featured position (col-0)
- Ensure video thumbnails are high quality and representative of the content
- Consider video length when arranging - shorter videos work better in secondary positions
- Use consistent aspect ratios across columns for visual harmony
- Include descriptive titles that work well with video content

## Performance Considerations

- Implements lazy loading and deferred playback to reduce initial page load time
- Uses poster images as placeholders until video interaction
- Automatically pauses off-screen videos to conserve bandwidth and system resources
- Optimizes video metadata loading to prevent render blocking
- Carefully manages video event listeners to prevent memory leaks 