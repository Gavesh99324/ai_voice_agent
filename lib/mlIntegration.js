/**
 * Example: ML Integration with Interview Workflow
 * This file demonstrates how to integrate ML models with the interview system
 */

import { SentimentAnalyzer, PerformancePredictor } from '@/ml-models';

/**
 * Analyze interview after completion
 * This function can be called when an interview is marked as complete
 */
export async function analyzeCompletedInterview(interviewId, interviewData) {
  try {
    const { responses, duration, questionCount, candidateId } = interviewData;

    // Initialize ML models
    const sentimentAnalyzer = new SentimentAnalyzer();
    const performancePredictor = new PerformancePredictor();

    // 1. Analyze sentiment of all responses
    console.log('Analyzing sentiment...');
    const sentimentResults = sentimentAnalyzer.analyzeBatch(responses);
    
    // Calculate overall sentiment statistics
    const sentimentStats = {
      positive: sentimentResults.filter(r => r.sentiment === 'positive').length,
      negative: sentimentResults.filter(r => r.sentiment === 'negative').length,
      neutral: sentimentResults.filter(r => r.sentiment === 'neutral').length,
      averageScore: sentimentResults.reduce((sum, r) => sum + r.score, 0) / sentimentResults.length,
      averageConfidence: sentimentResults.reduce((sum, r) => sum + r.confidence, 0) / sentimentResults.length,
    };

    // 2. Predict overall performance
    console.log('Predicting performance...');
    const performancePrediction = performancePredictor.predict({
      responses,
      duration,
      questionCount,
    });

    // 3. Combine results into comprehensive analysis
    const analysis = {
      interviewId,
      candidateId,
      timestamp: new Date().toISOString(),
      sentiment: {
        ...sentimentStats,
        details: sentimentResults,
      },
      performance: performancePrediction,
      summary: generateSummary(sentimentStats, performancePrediction),
      recommendations: generateRecommendations(sentimentStats, performancePrediction),
    };

    return analysis;
  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw error;
  }
}

/**
 * Generate human-readable summary
 */
function generateSummary(sentimentStats, performance) {
  const summaryParts = [];

  // Sentiment summary
  const dominantSentiment = 
    sentimentStats.positive > sentimentStats.negative ? 'positive' :
    sentimentStats.negative > sentimentStats.positive ? 'negative' : 'neutral';
  
  summaryParts.push(
    `The candidate demonstrated a ${dominantSentiment} attitude throughout the interview.`
  );

  // Performance summary
  summaryParts.push(
    `Overall performance rating: ${performance.rating} (${performance.score.toFixed(1)}/100).`
  );

  // Key strengths
  const strengths = [];
  if (performance.features.vocabulary > 0.7) strengths.push('strong vocabulary');
  if (performance.features.coherence > 0.7) strengths.push('good coherence');
  if (performance.features.confidence > 0.7) strengths.push('high confidence');
  
  if (strengths.length > 0) {
    summaryParts.push(`Key strengths: ${strengths.join(', ')}.`);
  }

  return summaryParts.join(' ');
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(sentimentStats, performance) {
  const recommendations = [];

  // Performance-based recommendations
  if (performance.score >= 85) {
    recommendations.push({
      category: 'hiring',
      priority: 'high',
      message: 'Strong candidate - recommend moving to next round',
      action: 'Schedule follow-up interview',
    });
  } else if (performance.score >= 70) {
    recommendations.push({
      category: 'hiring',
      priority: 'medium',
      message: 'Good candidate with potential',
      action: 'Consider for next round with additional assessment',
    });
  } else if (performance.score >= 50) {
    recommendations.push({
      category: 'hiring',
      priority: 'low',
      message: 'Average performance - needs improvement in key areas',
      action: 'Review detailed feedback before deciding',
    });
  } else {
    recommendations.push({
      category: 'hiring',
      priority: 'low',
      message: 'Below expectations - may not be suitable for this role',
      action: 'Consider rejection or alternative positions',
    });
  }

  // Sentiment-based recommendations
  if (sentimentStats.negative > sentimentStats.positive) {
    recommendations.push({
      category: 'communication',
      priority: 'medium',
      message: 'Candidate showed negative sentiment - may indicate stress or uncertainty',
      action: 'Follow up to understand concerns',
    });
  }

  // Feature-specific recommendations
  if (performance.features.responseLength < 0.3) {
    recommendations.push({
      category: 'training',
      priority: 'low',
      message: 'Responses were brief - candidate may benefit from interview preparation',
      action: 'Provide interview tips or coaching resources',
    });
  }

  return recommendations;
}

/**
 * Example: Real-time sentiment tracking during interview
 * This can be called after each question is answered
 */
export async function trackResponseSentiment(response) {
  const analyzer = new SentimentAnalyzer();
  const sentiment = analyzer.analyze(response);
  
  return {
    timestamp: new Date().toISOString(),
    sentiment: sentiment.sentiment,
    score: sentiment.score,
    confidence: sentiment.confidence,
    alert: sentiment.sentiment === 'negative' && sentiment.confidence > 0.5,
  };
}

/**
 * Example: Batch analysis for multiple interviews
 * Useful for comparing candidates or generating reports
 */
export async function compareInterviews(interviews) {
  const predictor = new PerformancePredictor();
  
  const analyses = interviews.map(interview => {
    const prediction = predictor.predict({
      responses: interview.responses,
      duration: interview.duration,
      questionCount: interview.questionCount,
    });
    
    return {
      interviewId: interview.id,
      candidateId: interview.candidateId,
      candidateName: interview.candidateName,
      score: prediction.score,
      rating: prediction.rating,
      features: prediction.features,
    };
  });

  // Sort by score descending
  analyses.sort((a, b) => b.score - a.score);

  return {
    totalInterviews: analyses.length,
    topCandidate: analyses[0],
    averageScore: analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length,
    rankings: analyses,
  };
}

/**
 * Example: API call from frontend
 */
export async function callMLAnalysisAPI(interviewData) {
  try {
    // Call performance prediction API
    const performanceResponse = await fetch('/api/ml-performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        responses: interviewData.responses,
        duration: interviewData.duration,
        questionCount: interviewData.questionCount,
      }),
    });

    const performanceData = await performanceResponse.json();

    // Call sentiment analysis API
    const sentimentResponse = await fetch('/api/ml-sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts: interviewData.responses,
      }),
    });

    const sentimentData = await sentimentResponse.json();

    return {
      performance: performanceData.data,
      sentiment: sentimentData.data,
      summary: sentimentData.summary,
    };
  } catch (error) {
    console.error('Error calling ML analysis API:', error);
    throw error;
  }
}

// Export all helper functions
export default {
  analyzeCompletedInterview,
  trackResponseSentiment,
  compareInterviews,
  callMLAnalysisAPI,
};
