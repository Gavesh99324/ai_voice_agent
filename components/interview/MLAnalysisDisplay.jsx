'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Brain, Target, MessageCircle } from 'lucide-react';

/**
 * ML Analysis Display Component
 * Shows ML-based performance metrics after interview completion
 * 
 * Usage:
 * <MLAnalysisDisplay interviewData={interviewData} />
 */
export default function MLAnalysisDisplay({ interviewData }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewData || !interviewData.responses) {
      setLoading(false);
      return;
    }

    analyzeInterview();
  }, [interviewData]);

  const analyzeInterview = async () => {
    try {
      setLoading(true);

      // Call ML performance API
      const performanceResponse = await fetch('/api/ml-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: interviewData.responses,
          duration: interviewData.duration || 1800,
          questionCount: interviewData.responses.length,
        }),
      });

      const performanceData = await performanceResponse.json();

      // Call ML sentiment API
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

      setAnalysis({
        performance: performanceData.data,
        sentiment: sentimentData.summary,
      });
      setLoading(false);
    } catch (err) {
      console.error('Error analyzing interview:', err);
      setError('Failed to analyze interview performance');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md w-full max-w-4xl">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Analyzing your performance...</span>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return null; // Don't show anything if analysis fails
  }

  const { performance, sentiment } = analysis;
  const scoreColor = 
    performance.score >= 85 ? 'text-green-600' :
    performance.score >= 70 ? 'text-blue-600' :
    performance.score >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl p-8 shadow-md w-full max-w-4xl space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="h-8 w-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">AI Performance Analysis</h2>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm uppercase tracking-wide">Overall Score</p>
            <p className={`text-5xl font-bold ${scoreColor}`}>
              {performance.score.toFixed(1)}
            </p>
            <p className="text-gray-500 mt-1 capitalize">
              Rating: <span className="font-semibold">{performance.rating}</span>
            </p>
          </div>
          <Target className={`h-16 w-16 ${scoreColor}`} />
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          title="Response Quality"
          score={performance.features.responseLength}
          icon={<MessageCircle className="h-5 w-5" />}
        />
        <FeatureCard
          title="Vocabulary"
          score={performance.features.vocabulary}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <FeatureCard
          title="Coherence"
          score={performance.features.coherence}
          icon={<Brain className="h-5 w-5" />}
        />
        <FeatureCard
          title="Confidence"
          score={performance.features.confidence}
          icon={<Target className="h-5 w-5" />}
        />
      </div>

      {/* Sentiment Analysis */}
      {sentiment && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sentiment Analysis</h3>
          <div className="grid grid-cols-3 gap-4">
            <SentimentBadge
              label="Positive"
              count={sentiment.positive}
              color="green"
            />
            <SentimentBadge
              label="Neutral"
              count={sentiment.neutral}
              color="gray"
            />
            <SentimentBadge
              label="Negative"
              count={sentiment.negative}
              color="red"
            />
          </div>
        </div>
      )}

      {/* Insights */}
      {performance.insights && performance.insights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Key Insights</h3>
          {performance.insights.slice(0, 3).map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
}

// Helper Components

function FeatureCard({ title, score, icon }) {
  const percentage = Math.round(score * 100);
  const barColor = 
    percentage >= 80 ? 'bg-green-500' :
    percentage >= 60 ? 'bg-blue-500' :
    percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </span>
        <span className="text-gray-900 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function SentimentBadge({ label, count, color }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-3 text-center`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function InsightCard({ insight }) {
  const severityColors = {
    positive: 'border-green-500 bg-green-50',
    low: 'border-blue-500 bg-blue-50',
    medium: 'border-yellow-500 bg-yellow-50',
    high: 'border-red-500 bg-red-50',
  };

  const iconColors = {
    positive: 'text-green-600',
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div className={`border-l-4 ${severityColors[insight.severity]} p-4 rounded-r`}>
      <div className="flex items-start space-x-2">
        <div className={`${iconColors[insight.severity]} mt-0.5`}>
          {insight.severity === 'positive' ? '✓' : 'ℹ'}
        </div>
        <p className="text-gray-700">{insight.message}</p>
      </div>
    </div>
  );
}
