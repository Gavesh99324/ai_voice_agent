/**
 * Performance Predictor Component
 * Predicts interview performance based on multiple features
 * Inspired by krishnaik06/mlproject prediction pipeline
 */

import MLConfig from '../config/mlConfig.js';
import { 
  extractTextFeatures, 
  calculateWeightedScore, 
  normalize, 
  clip 
} from '../utils/mlUtils.js';
import { SentimentAnalyzer } from './sentimentAnalyzer.js';

export class PerformancePredictor {
  constructor(config = MLConfig) {
    this.config = config;
    this.sentimentAnalyzer = new SentimentAnalyzer(config);
    this.featureWeights = config.featureWeights;
    this.thresholds = config.performanceThresholds;
  }

  /**
   * Predict interview performance
   * @param {object} interviewData - Interview data containing responses and metadata
   * @returns {object} Performance prediction results
   */
  predict(interviewData) {
    try {
      // Validate input
      if (!interviewData || !interviewData.responses) {
        throw new Error('Invalid interview data: responses required');
      }

      // Extract features from interview data
      const features = this.extractFeatures(interviewData);

      // Calculate performance score
      const score = this.calculatePerformanceScore(features);

      // Get performance rating
      const rating = this.getPerformanceRating(score);

      // Generate insights
      const insights = this.generateInsights(features, score);

      return {
        score: Math.round(score * 100) / 100,
        rating,
        features,
        insights,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Performance prediction error:', error);
      return this.getDefaultPrediction(error.message);
    }
  }

  /**
   * Extract features from interview data
   */
  extractFeatures(interviewData) {
    const { responses, duration, questionCount } = interviewData;

    // Combine all responses
    const allText = responses.join(' ');
    const textFeatures = extractTextFeatures(allText);

    // Calculate response length score (normalized)
    const avgResponseLength = responses.length > 0 
      ? textFeatures.wordCount / responses.length 
      : 0;
    const responseLengthScore = normalize(
      clip(avgResponseLength, 0, this.config.analysis.maxExpectedResponseLength), 
      0, 
      this.config.analysis.maxExpectedResponseLength
    );

    // Calculate vocabulary score
    const vocabularyScore = clip(textFeatures.vocabularyRichness, 0, 1);

    // Analyze sentiment across all responses
    const sentimentResults = responses.map(r => this.sentimentAnalyzer.analyze(r));
    const avgSentiment = sentimentResults.reduce((sum, s) => sum + s.score, 0) / sentimentResults.length;
    const coherenceScore = (avgSentiment + 1) / 2; // Convert -1 to 1 range to 0 to 1

    // Calculate relevance score (based on response consistency)
    const relevanceScore = this.calculateRelevanceScore(responses);

    // Calculate confidence score (based on sentiment confidence)
    const avgConfidence = sentimentResults.reduce((sum, s) => sum + s.confidence, 0) / sentimentResults.length;
    const confidenceScore = avgConfidence;

    return {
      responseLength: Math.round(responseLengthScore * 100) / 100,
      vocabulary: Math.round(vocabularyScore * 100) / 100,
      coherence: Math.round(coherenceScore * 100) / 100,
      relevance: Math.round(relevanceScore * 100) / 100,
      confidence: Math.round(confidenceScore * 100) / 100,
      metadata: {
        totalWords: textFeatures.wordCount,
        uniqueWords: textFeatures.uniqueWords,
        avgSentiment: Math.round(avgSentiment * 100) / 100,
        responseCount: responses.length,
      },
    };
  }

  /**
   * Calculate relevance score based on response consistency
   */
  calculateRelevanceScore(responses) {
    if (responses.length < 2) return 0.5;

    // Calculate average response length consistency
    const lengths = responses.map(r => r.split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
    // Normalize variance using configured divisor to calculate consistency
    const consistency = 1 / (1 + variance / this.config.analysis.consistencyVarianceDivisor);

    return clip(consistency, 0, 1);
  }

  /**
   * Calculate final performance score
   */
  calculatePerformanceScore(features) {
    // Calculate weighted score (0-1 range)
    const weightedScore = calculateWeightedScore(features, this.featureWeights);
    
    // Convert to 0-100 scale
    const score = weightedScore * 100;
    
    return clip(score, 0, 100);
  }

  /**
   * Get performance rating based on score
   */
  getPerformanceRating(score) {
    if (score >= this.thresholds.excellent) return 'excellent';
    if (score >= this.thresholds.good) return 'good';
    if (score >= this.thresholds.average) return 'average';
    if (score >= this.thresholds.poor) return 'poor';
    return 'needs_improvement';
  }

  /**
   * Generate insights based on features and score
   */
  generateInsights(features, score) {
    const insights = [];

    // Response length insights
    if (features.responseLength < 0.3) {
      insights.push({
        category: 'response_length',
        message: 'Responses are relatively short. Consider providing more detailed answers.',
        severity: 'medium',
      });
    }

    // Vocabulary insights
    if (features.vocabulary < 0.4) {
      insights.push({
        category: 'vocabulary',
        message: 'Limited vocabulary diversity. Try using more varied terminology.',
        severity: 'low',
      });
    } else if (features.vocabulary > 0.7) {
      insights.push({
        category: 'vocabulary',
        message: 'Strong vocabulary diversity demonstrated.',
        severity: 'positive',
      });
    }

    // Coherence insights
    if (features.coherence < 0.4) {
      insights.push({
        category: 'coherence',
        message: 'Responses may lack coherence. Focus on structured answers.',
        severity: 'high',
      });
    }

    // Confidence insights
    if (features.confidence < 0.3) {
      insights.push({
        category: 'confidence',
        message: 'Responses suggest lower confidence. Practice and preparation may help.',
        severity: 'medium',
      });
    } else if (features.confidence > 0.7) {
      insights.push({
        category: 'confidence',
        message: 'Strong confidence demonstrated in responses.',
        severity: 'positive',
      });
    }

    // Overall performance insight
    if (score >= this.thresholds.excellent) {
      insights.push({
        category: 'overall',
        message: 'Excellent performance across all dimensions.',
        severity: 'positive',
      });
    }

    return insights;
  }

  /**
   * Get default prediction for error cases
   */
  getDefaultPrediction(errorMessage) {
    return {
      score: 0,
      rating: 'unknown',
      features: {},
      insights: [{
        category: 'error',
        message: errorMessage || 'Unable to generate prediction',
        severity: 'high',
      }],
      timestamp: new Date().toISOString(),
    };
  }
}

export default PerformancePredictor;
