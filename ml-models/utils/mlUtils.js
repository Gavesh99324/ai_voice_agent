/**
 * ML Utilities
 * Common utility functions for ML operations
 * Inspired by krishnaik06/mlproject utils structure
 */

/**
 * Normalize a value to a 0-1 range
 */
export function normalize(value, min, max) {
  if (max === min) return 0.5;
  return (value - min) / (max - min);
}

/**
 * Calculate mean of an array
 */
export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(arr) {
  if (!arr || arr.length === 0) return 0;
  const avg = mean(arr);
  const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
  return Math.sqrt(mean(squareDiffs));
}

/**
 * Extract text features from response
 */
export function extractTextFeatures(text) {
  if (!text || typeof text !== 'string') {
    return {
      wordCount: 0,
      sentenceCount: 0,
      avgWordLength: 0,
      uniqueWords: 0,
      vocabularyRichness: 0,
    };
  }

  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const uniqueWords = new Set(words);

  const avgWordLength = words.length > 0 
    ? words.reduce((sum, word) => sum + word.length, 0) / words.length 
    : 0;

  const vocabularyRichness = words.length > 0 
    ? uniqueWords.size / words.length 
    : 0;

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordLength: Math.round(avgWordLength * 100) / 100,
    uniqueWords: uniqueWords.size,
    vocabularyRichness: Math.round(vocabularyRichness * 100) / 100,
  };
}

/**
 * Calculate cosine similarity between two word frequency vectors
 */
export function cosineSimilarity(vec1, vec2) {
  const keys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  keys.forEach(key => {
    const v1 = vec1[key] || 0;
    const v2 = vec2[key] || 0;
    dotProduct += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });

  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

/**
 * Create word frequency vector from text
 */
export function createWordVector(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const vector = {};
  words.forEach(word => {
    vector[word] = (vector[word] || 0) + 1;
  });
  return vector;
}

/**
 * Validate input data
 */
export function validateInput(data, requiredFields) {
  const missing = requiredFields.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  return true;
}

/**
 * Clip value to a range
 */
export function clip(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate weighted score
 */
export function calculateWeightedScore(features, weights) {
  let score = 0;
  Object.keys(weights).forEach(key => {
    if (features[key] !== undefined) {
      score += features[key] * weights[key];
    }
  });
  return score;
}
