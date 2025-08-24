// Video database with Google Drive links and topic matching

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  teacher: string;
  topics: string[];
  keywords: string[];
  duration: number; // seconds
  googleDriveId: string;
  thumbnailUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'organic-chemistry-video',
    title: 'Organic Chemistry with Master Maagne',
    description: 'Comprehensive introduction to organic chemistry concepts, molecular structures, and chemical reactions',
    teacher: 'Master Maagne',
    topics: ['organic chemistry', 'chemistry'],
    keywords: [
      // Organic Chemistry Core Topics
      'organic chemistry', 'organic', 'chemistry', 'carbon', 'hydrocarbon',
      'molecules', 'compounds', 'chemical reactions', 'molecular structure',
      'functional groups', 'alkanes', 'alkenes', 'alkynes', 'aromatic',
      'benzene', 'isomers', 'stereochemistry', 'polymers', 'biomolecules',
      // Chemical Processes
      'synthesis', 'oxidation', 'reduction', 'substitution', 'addition',
      'elimination', 'condensation', 'polymerization', 'catalysis',
      // Laboratory & Applications
      'laboratory', 'experiment', 'analysis', 'spectroscopy', 'chromatography',
      'pharmaceutical', 'medicine', 'drugs', 'plastics', 'materials',
      // General chemistry terms
      'chemical', 'reaction', 'bond', 'structure', 'formula', 'equation',
      // General educational terms
      'learn', 'education', 'teach', 'explain', 'understand', 'study'
    ],
    duration: 300, // 5 minutes
    googleDriveId: '1hUqYrKiBIAeML3NQMhX9d8OlriATQWVw',
    difficulty: 'intermediate'
  }
];

// Function to find the best matching video based on user query
export function findMatchingVideo(query: string): DemoVideo | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  let bestMatch: { video: DemoVideo; score: number } | null = null;
  
  for (const video of DEMO_VIDEOS) {
    let score = 0;
    
    // Check for exact topic matches (high score)
    for (const topic of video.topics) {
      if (normalizedQuery.includes(topic.toLowerCase())) {
        score += 10;
      }
    }
    
    // Check for keyword matches (medium score)
    for (const keyword of video.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 3;
      }
    }
    
    // Check for partial matches in title (medium score)
    const titleWords = video.title.toLowerCase().split(' ');
    for (const word of titleWords) {
      if (normalizedQuery.includes(word) && word.length > 3) {
        score += 2;
      }
    }
    
    // If we found matches, consider this video
    if (score > 0) {
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { video, score };
      }
    }
  }
  
  return bestMatch ? bestMatch.video : null;
}

// Function to convert Google Drive file ID to embeddable URL
export function getGoogleDriveVideoUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Function to get direct download URL (for video element src)
export function getGoogleDriveDirectUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Function to get thumbnail URL from Google Drive
export function getGoogleDriveThumbnail(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h450`;
}

// Example queries that would match the video
export const EXAMPLE_QUERIES = {
  organicChemistry: [
    'What is organic chemistry?',
    'Explain organic chemistry basics',
    'How do chemical reactions work?',
    'What are organic compounds?',
    'Molecular structure in chemistry',
    'Functional groups in organic chemistry'
  ]
};

// Function to get relevant example queries based on available videos
export function getRelevantExamples(): string[] {
  return EXAMPLE_QUERIES.organicChemistry;
}

// Constants for query validation
export const MAX_QUERY_LENGTH = 200; // Character limit for queries
export const MIN_QUERY_LENGTH = 3;   // Minimum characters required

// Function to validate query length
export function validateQueryLength(query: string): { isValid: boolean; error?: string } {
  const trimmedQuery = query.trim();
  
  if (trimmedQuery.length < MIN_QUERY_LENGTH) {
    return {
      isValid: false,
      error: 'Please enter at least 3 characters'
    };
  }
  
  if (trimmedQuery.length > MAX_QUERY_LENGTH) {
    return {
      isValid: false,
      error: 'Query is too long. AI model has a limit of 200 characters. Please shorten your question.'
    };
  }
  
  return { isValid: true };
}
