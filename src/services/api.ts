import type { 
  GenerateVideoRequest, 
  GenerateVideoResponse, 
  VideoStatus, 
  VideoMetadata, 
  ApiResponse,
  AnalyticsEvent
} from '@/types/api';
import { 
  findMatchingVideo, 
  getGoogleDriveVideoUrl, 
  getGoogleDriveDirectUrl, 
  getGoogleDriveThumbnail,
  validateQueryLength,
  type DemoVideo 
} from '@/data/videos';

// Environment configuration
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
  }

  // Generic HTTP client with error handling
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Video Generation API
  async generateVideo(request: GenerateVideoRequest): Promise<GenerateVideoResponse> {
    try {
      console.log('🎬 Generating video with request:', request);
      
      // For now, simulate API call
      if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
        return this.simulateVideoGeneration(request);
      }

      const response = await this.request<GenerateVideoResponse['data']>('/videos/generate', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: response.error || {
            message: 'Failed to generate video',
            code: 'GENERATION_FAILED',
          },
        };
      }
    } catch (error) {
      console.error('❌ Video generation failed:', error);
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'NETWORK_ERROR',
        },
      };
    }
  }

  // Check video generation status
  async getVideoStatus(videoId: string): Promise<VideoStatus> {
    try {
      if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
        return this.simulateVideoStatus(videoId);
      }

      const response = await this.request<VideoStatus>(`/videos/${videoId}/status`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error?.message || 'Failed to get video status');
      }
    } catch (error) {
      console.error('❌ Failed to get video status:', error);
      throw error;
    }
  }

  // Get video metadata
  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    try {
      if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
        return this.simulateVideoMetadata(videoId);
      }

      const response = await this.request<VideoMetadata>(`/videos/${videoId}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error?.message || 'Failed to get video metadata');
      }
    } catch (error) {
      console.error('❌ Failed to get video metadata:', error);
      throw error;
    }
  }

  // Analytics tracking
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics event:', event);
        return;
      }

      await this.request('/analytics/events', {
        method: 'POST',
        body: JSON.stringify(event),
      });
    } catch (error) {
      // Don't throw analytics errors, just log them
      console.warn('📊 Analytics tracking failed:', error);
    }
  }

  // Development simulation methods
  private async simulateVideoGeneration(request: GenerateVideoRequest): Promise<GenerateVideoResponse> {
    // Validate query length first
    const validation = validateQueryLength(request.query);
    if (!validation.isValid) {
      // Simulate some loading time even for validation errors
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000)); // 0.5-1.5 seconds
      
      return {
        success: false,
        error: {
          message: validation.error || 'Invalid query',
          code: 'QUERY_TOO_LONG',
        },
      };
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));

    // Try to find a matching video from our demo collection
    const matchingVideo = findMatchingVideo(request.query);
    
    if (matchingVideo) {
      const videoId = `demo_${matchingVideo.id}_${Date.now()}`;
      
      return {
        success: true,
        data: {
          videoId,
          title: matchingVideo.title,
          description: matchingVideo.description,
          teacher: matchingVideo.teacher,
          duration: matchingVideo.duration,
          videoUrl: getGoogleDriveDirectUrl(matchingVideo.googleDriveId),
          thumbnailUrl: getGoogleDriveThumbnail(matchingVideo.googleDriveId),
          status: 'generating',
          estimatedTime: 0.8 + Math.random() * 1.2, // 0.8-2 seconds for demo videos
        },
      };
    } else {
      // No matching video found - return AI credit limit error
      return {
        success: false,
        error: {
          message: `Unable to generate video due to AI model credit limit exceeded. Please try again later or contact support for assistance.`,
          code: 'AI_CREDIT_LIMIT_EXCEEDED',
        },
      };
    }
  }

  private async simulateVideoStatus(videoId: string): Promise<VideoStatus> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simulate progress
    const progress = Math.min(100, Math.random() * 120);
    const isComplete = progress >= 100;
    
    return {
      videoId,
      status: isComplete ? 'ready' : 'generating',
      progress: Math.round(progress),
      estimatedTimeRemaining: isComplete ? 0 : Math.round((100 - progress) * 0.5),
    };
  }

  private async simulateVideoMetadata(videoId: string): Promise<VideoMetadata> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract demo video info from videoId if it's a demo video
    if (videoId.startsWith('demo_')) {
      const videoKey = videoId.split('_')[1];
      
      if (videoKey === 'organic-chemistry-video') {
        return {
          videoId,
          title: 'Organic Chemistry with Master Maagne',
          description: 'Comprehensive introduction to organic chemistry concepts, molecular structures, and chemical reactions',
          teacher: 'Master Maagne',
          query: 'organic chemistry',
          duration: 300,
          createdAt: new Date().toISOString(),
          views: Math.floor(Math.random() * 1000) + 500, // 500-1500 views
          likes: Math.floor(Math.random() * 100) + 50,   // 50-150 likes
          videoUrl: getGoogleDriveDirectUrl('1hUqYrKiBIAeML3NQMhX9d8OlriATQWVw'),
          thumbnailUrl: getGoogleDriveThumbnail('1hUqYrKiBIAeML3NQMhX9d8OlriATQWVw'),
        };
      }
    }
    
    // Fallback for non-demo videos
    return {
      videoId,
      title: 'Educational Video',
      description: 'A comprehensive explanation by Master Maagne',
      teacher: 'Master Maagne',
      query: 'general topic',
      duration: 90,
      createdAt: new Date().toISOString(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      videoUrl: `https://example.com/videos/${videoId}.mp4`,
      thumbnailUrl: `https://example.com/thumbnails/${videoId}.jpg`,
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual methods for convenience
export const {
  generateVideo,
  getVideoStatus,
  getVideoMetadata,
  trackEvent,
} = apiService;
