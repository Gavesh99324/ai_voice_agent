import { NextResponse } from "next/server";
import { PerformancePredictor } from "@/ml-models/components/performancePredictor";

/**
 * API Route: Performance Prediction
 * Predicts interview performance based on responses
 * POST /api/ml-performance
 */
export async function POST(req) {
  try {
    const interviewData = await req.json();

    // Validate input
    if (!interviewData || !interviewData.responses) {
      return NextResponse.json(
        { error: "Interview data with 'responses' array is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(interviewData.responses)) {
      return NextResponse.json(
        { error: "'responses' must be an array" },
        { status: 400 }
      );
    }

    if (interviewData.responses.length === 0) {
      return NextResponse.json(
        { error: "At least one response is required" },
        { status: 400 }
      );
    }

    // Create predictor and generate prediction
    const predictor = new PerformancePredictor();
    const prediction = predictor.predict(interviewData);

    return NextResponse.json({
      success: true,
      data: prediction,
    });

  } catch (error) {
    console.error('Performance prediction error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to predict performance',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
