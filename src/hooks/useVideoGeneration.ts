import { useState, useCallback, useRef, useEffect } from 'react';
import type { GenerateVideoRequest, GenerateVideoResponse, VideoStatus, VideoMetadata } from '@/types/api';
import { apiService } from '@/services/api';

interface UseVideoGenerationState {
  isGenerating: boolean;
  isPolling: boolean;
  progress: number;
  estimatedTime: number;
  error: string | null;
  videoData: GenerateVideoResponse['data'] | null;
  videoMetadata: VideoMetadata | null;
}

interface UseVideoGenerationActions {
  generateVideo: (request: GenerateVideoRequest) => Promise<void>;
  reset: () => void;
  retry: () => void;
}

interface UseVideoGenerationReturn extends UseVideoGenerationState, UseVideoGenerationActions {}

export function useVideoGeneration(): UseVideoGenerationReturn {
  const [state, setState] = useState<UseVideoGenerationState>({
    isGenerating: false,
    isPolling: false,
    progress: 0,
    estimatedTime: 0,
    error: null,
    videoData: null,
    videoMetadata: null,
  });

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestRef = useRef<GenerateVideoRequest | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const startPolling = useCallback(async (videoId: string) => {
    setState(prev => ({ ...prev, isPolling: true }));

    const pollStatus = async () => {
      try {
        const status = await apiService.getVideoStatus(videoId);
        
        setState(prev => ({
          ...prev,
          progress: status.progress || 0,
          estimatedTime: status.estimatedTimeRemaining || 0,
        }));

        if (status.status === 'ready') {
          // Video is ready, get metadata and stop polling
          const metadata = await apiService.getVideoMetadata(videoId);
          
          setState(prev => ({
            ...prev,
            isGenerating: false,
            isPolling: false,
            progress: 100,
            estimatedTime: 0,
            videoMetadata: metadata,
          }));

          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }

          // Track analytics
          await apiService.trackEvent({
            eventType: 'video_generated',
            videoId: metadata.videoId,
            query: metadata.query,
            teacher: metadata.teacher,
          });

        } else if (status.status === 'failed') {
          setState(prev => ({
            ...prev,
            isGenerating: false,
            isPolling: false,
            error: status.error || 'Video generation failed',
          }));

          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to check video status',
        }));
        
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
      }
    };

    // Poll immediately, then every 1 second
    await pollStatus();
    pollingIntervalRef.current = setInterval(pollStatus, 1000);
  }, []);

  const generateVideo = useCallback(async (request: GenerateVideoRequest) => {
    setState(prev => ({
      ...prev,
      isGenerating: true,
      isPolling: false,
      progress: 0,
      estimatedTime: 0,
      error: null,
      videoData: null,
      videoMetadata: null,
    }));

    lastRequestRef.current = request;

    try {
      const response = await apiService.generateVideo(request);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          videoData: response.data,
          estimatedTime: response.data?.estimatedTime || 30,
        }));

        // Start polling for status updates
        if (response.data.videoId) {
          await startPolling(response.data.videoId);
        }
      } else {
        setState(prev => ({
          ...prev,
          isGenerating: false,
          error: response.error?.message || 'Failed to generate video',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Network error',
      }));
    }
  }, [startPolling]);

  const reset = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setState({
      isGenerating: false,
      isPolling: false,
      progress: 0,
      estimatedTime: 0,
      error: null,
      videoData: null,
      videoMetadata: null,
    });

    lastRequestRef.current = null;
  }, []);

  const retry = useCallback(() => {
    if (lastRequestRef.current) {
      generateVideo(lastRequestRef.current);
    }
  }, [generateVideo]);

  return {
    ...state,
    generateVideo,
    reset,
    retry,
  };
}
