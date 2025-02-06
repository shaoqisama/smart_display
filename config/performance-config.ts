export const performanceConfig = {
  // Reduce animation complexity
  animations: {
    enabled: true,
    reducedMotion: true,
    transitionDuration: '1.5s',
  },
  
  // Optimize image loading
  images: {
    quality: 75,
    loading: 'lazy',
    deviceSizes: [640, 960, 1280], // Limit sizes for RPi display
    minimumCacheTTL: 3600,
  },
  
  // Update intervals (in milliseconds)
  intervals: {
    clock: 60000,        // Update clock every minute
    weather: 900000,     // Update weather every 15 minutes
    calendar: 300000,    // Update calendar every 5 minutes
    mediaGallery: 30000, // Rotate media every 30 seconds
  }
} 