// API Request/Response Types

export interface GenerateVideoRequest {
  query: string;
  teacher?: 'maagne-budo' | 'raju-master' | 'dhurmusey' | 'einstein' | 'steve-jobs';
  language?: 'english' | 'nepali';
  duration?: 'short' | 'medium' | 'long'; // 30s, 60s, 120s
  style?: 'educational' | 'conversational' | 'motivational';
}

export interface GenerateVideoResponse {
  success: boolean;
  data?: {
    videoId: string;
    title: string;
    description: string;
    teacher: string;
    duration: number;
    videoUrl: string;
    thumbnailUrl: string;
    status: 'generating' | 'ready' | 'failed';
    estimatedTime?: number; // seconds
  };
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

export interface VideoStatus {
  videoId: string;
  status: 'generating' | 'ready' | 'failed';
  progress?: number; // 0-100
  estimatedTimeRemaining?: number; // seconds
  error?: string;
}

export interface VideoMetadata {
  videoId: string;
  title: string;
  description: string;
  teacher: string;
  query: string;
  duration: number;
  createdAt: string;
  views: number;
  likes: number;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  eventType: 'video_generated' | 'video_played' | 'video_liked' | 'video_shared';
  videoId?: string;
  query?: string;
  teacher?: string;
  metadata?: Record<string, any>;
}
