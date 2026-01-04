/**
 * ML Configuration
 * Centralized configuration for ML models and settings
 * Inspired by krishnaik06/mlproject config structure
 */

export const MLConfig = {
  // Model settings
  models: {
    sentimentAnalysis: {
      enabled: true,
      threshold: 0.5,
    },
    performancePrediction: {
      enabled: true,
      scoreRange: [0, 100],
    },
  },

  // Feature weights for interview analysis
  featureWeights: {
    responseLength: 0.15,
    vocabulary: 0.15,
    coherence: 0.20,
    relevance: 0.25,
    confidence: 0.25,
  },

  // Sentiment scoring
  sentiment: {
    positive: {
      keywords: [
        'excellent', 'great', 'good', 'outstanding', 'perfect',
        'innovative', 'creative', 'efficient', 'effective', 'successful',
        'achieved', 'accomplished', 'improved', 'enhanced', 'optimized'
      ],
      weight: 1.0,
    },
    negative: {
      keywords: [
        'difficult', 'challenging', 'struggled', 'failed', 'problem',
        'issue', 'unable', 'never', 'no', 'not', 'cannot', 'poor'
      ],
      weight: -0.5,
    },
    neutral: {
      weight: 0.0,
    },
  },

  // Performance prediction thresholds
  performanceThresholds: {
    excellent: 85,
    good: 70,
    average: 50,
    poor: 30,
  },

  // Analysis settings
  analysis: {
    minResponseLength: 10,
    maxResponseLength: 5000,
    languageComplexityEnabled: true,
  },
};

export default MLConfig;
