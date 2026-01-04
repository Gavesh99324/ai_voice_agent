# AI Voice Agent

This is a [Next.js](https://nextjs.org) project that provides an AI-powered voice agent for conducting interviews with built-in machine learning capabilities for performance analysis.

## Features

- 🎤 **AI Voice Interviews**: Conduct interviews using AI-powered voice agents
- 📊 **ML Performance Analysis**: Analyze interview performance using machine learning models
- 💬 **Sentiment Analysis**: Understand the sentiment of candidate responses
- 📈 **Performance Prediction**: Predict interview outcomes based on multiple features
- 🎯 **Real-time Feedback**: Get instant insights during interviews

## Machine Learning Capabilities

This project includes basic ML models inspired by [krishnaik06/mlproject](https://github.com/krishnaik06/mlproject):

### 1. Sentiment Analysis
Analyzes the sentiment of interview responses to understand candidate attitude and confidence.

**API Endpoint**: `POST /api/ml-sentiment`

**Example Request**:
```json
{
  "text": "I am very excited about this opportunity and have extensive experience in this field."
}
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "sentiment": "positive",
    "score": 0.85,
    "confidence": 0.72,
    "details": {
      "positiveScore": 2.0,
      "negativeScore": 0.0,
      "textFeatures": {
        "wordCount": 14,
        "sentenceCount": 1,
        "avgWordLength": 5.21,
        "uniqueWords": 13,
        "vocabularyRichness": 0.93
      }
    }
  }
}
```

### 2. Performance Prediction
Predicts interview performance based on multiple features including response quality, vocabulary, coherence, and confidence.

**API Endpoint**: `POST /api/ml-performance`

**Example Request**:
```json
{
  "responses": [
    "I have 5 years of experience in software development...",
    "My strongest skills include problem-solving and teamwork...",
    "I successfully led a project that improved efficiency by 30%..."
  ],
  "duration": 1800,
  "questionCount": 3
}
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "score": 78.5,
    "rating": "good",
    "features": {
      "responseLength": 0.75,
      "vocabulary": 0.68,
      "coherence": 0.82,
      "relevance": 0.71,
      "confidence": 0.79
    },
    "insights": [
      {
        "category": "vocabulary",
        "message": "Strong vocabulary diversity demonstrated.",
        "severity": "positive"
      }
    ]
  }
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ML Project Structure

The machine learning components are organized following best practices from [krishnaik06/mlproject](https://github.com/krishnaik06/mlproject):

```
ml-models/
├── components/          # ML model components
│   ├── sentimentAnalyzer.js
│   └── performancePredictor.js
├── config/              # Configuration files
│   └── mlConfig.js
├── utils/               # Utility functions
│   └── mlUtils.js
└── index.js            # Main entry point
```

### Key Components

- **SentimentAnalyzer**: Analyzes text sentiment using keyword-based analysis
- **PerformancePredictor**: Predicts interview performance using multiple features
- **MLConfig**: Centralized configuration for ML models
- **MLUtils**: Common utility functions for ML operations

## Documentation

- [ML Project Reference](./docs/ML_PROJECT_REFERENCE.md) - Detailed explanation of krishnaik06/mlproject and its relevance to this project

## Technologies Used

- **Next.js 15**: React framework for production
- **OpenAI/OpenRouter**: AI model integration
- **Supabase**: Backend and authentication
- **Vapi AI**: Voice AI capabilities
- **Custom ML Models**: Lightweight ML for performance analysis
- **Tailwind CSS**: Styling

## License

This project is licensed under the terms specified in the LICENSE file.
