/**
 * Sentiment Analysis Component
 * Analyzes sentiment in interview responses
 * Inspired by krishnaik06/mlproject component structure
 */

import MLConfig from '../config/mlConfig.js';
import { extractTextFeatures, normalize, clip } from '../utils/mlUtils.js';

export class SentimentAnalyzer {
  constructor(config = MLConfig) {
    this.config = config;
    this.sentimentConfig = config.sentiment;
  }

  /**
   * Analyze sentiment of a text
   * @param {string} text - Text to analyze
   * @returns {object} Sentiment analysis results
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return this.getDefaultResult();
    }

    const textLower = text.toLowerCase();
    const words = textLower.match(/\b\w+\b/g) || [];

    if (words.length === 0) {
      return this.getDefaultResult();
    }

    // Calculate sentiment scores
    const positiveScore = this.calculateKeywordScore(
      words,
      this.sentimentConfig.positive.keywords,
      this.sentimentConfig.positive.weight
    );

    const negativeScore = this.calculateKeywordScore(
      words,
      this.sentimentConfig.negative.keywords,
      this.sentimentConfig.negative.weight
    );

    // Calculate final sentiment
    const rawScore = positiveScore + negativeScore;
    const normalizedScore = this.normalizeSentimentScore(rawScore, words.length);

    // Extract text features for additional context
    const textFeatures = extractTextFeatures(text);

    return {
      sentiment: this.getSentimentLabel(normalizedScore),
      score: Math.round(normalizedScore * 100) / 100,
      confidence: this.calculateConfidence(positiveScore, negativeScore, words.length),
      details: {
        positiveScore: Math.round(positiveScore * 100) / 100,
        negativeScore: Math.round(negativeScore * 100) / 100,
        textFeatures,
      },
    };
  }

  /**
   * Calculate keyword-based score
   */
  calculateKeywordScore(words, keywords, weight) {
    let count = 0;
    words.forEach(word => {
      if (keywords.includes(word)) {
        count++;
      }
    });
    return count * weight;
  }

  /**
   * Normalize sentiment score to -1 to 1 range
   */
  normalizeSentimentScore(rawScore, wordCount) {
    // Normalize by word count to avoid bias toward longer texts
    const scorePerWord = wordCount > 0 ? rawScore / wordCount : 0;
    // Scale to -1 to 1 range
    return clip(scorePerWord * 10, -1, 1);
  }

  /**
   * Get sentiment label from score
   */
  getSentimentLabel(score) {
    if (score > 0.3) return 'positive';
    if (score < -0.3) return 'negative';
    return 'neutral';
  }

  /**
   * Calculate confidence in sentiment analysis
   */
  calculateConfidence(positiveScore, negativeScore, wordCount) {
    const totalSentimentWords = Math.abs(positiveScore) + Math.abs(negativeScore);
    const coverage = wordCount > 0 ? totalSentimentWords / wordCount : 0;
    // Confidence based on sentiment word coverage and text length
    const lengthFactor = Math.min(wordCount / 100, 1); // Cap at 100 words
    const confidence = (coverage + lengthFactor) / 2;
    return Math.round(clip(confidence, 0, 1) * 100) / 100;
  }

  /**
   * Get default result for invalid input
   */
  getDefaultResult() {
    return {
      sentiment: 'neutral',
      score: 0,
      confidence: 0,
      details: {
        positiveScore: 0,
        negativeScore: 0,
        textFeatures: extractTextFeatures(''),
      },
    };
  }

  /**
   * Batch analyze multiple texts
   */
  analyzeBatch(texts) {
    if (!Array.isArray(texts)) {
      throw new Error('Input must be an array of texts');
    }
    return texts.map(text => this.analyze(text));
  }
}

export default SentimentAnalyzer;
