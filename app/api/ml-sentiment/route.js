import { NextResponse } from "next/server";
import { SentimentAnalyzer } from "@/ml-models/components/sentimentAnalyzer";

/**
 * API Route: Sentiment Analysis
 * Analyzes sentiment of interview responses
 * POST /api/ml-sentiment
 */
export async function POST(req) {
  try {
    const { text, texts } = await req.json();

    // Validate input
    if (!text && !texts) {
      return NextResponse.json(
        { error: "Either 'text' or 'texts' parameter is required" },
        { status: 400 }
      );
    }

    const analyzer = new SentimentAnalyzer();

    // Handle single text
    if (text) {
      const result = analyzer.analyze(text);
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // Handle multiple texts
    if (texts && Array.isArray(texts)) {
      const results = analyzer.analyzeBatch(texts);
      return NextResponse.json({
        success: true,
        data: results,
        summary: {
          total: results.length,
          positive: results.filter(r => r.sentiment === 'positive').length,
          negative: results.filter(r => r.sentiment === 'negative').length,
          neutral: results.filter(r => r.sentiment === 'neutral').length,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid input format" },
      { status: 400 }
    );

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to analyze sentiment',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
