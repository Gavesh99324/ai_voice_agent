# ML Models Usage Examples

This document provides examples of how to use the ML models in the AI Voice Agent project.

## 1. Sentiment Analysis

### Single Text Analysis

```javascript
import { SentimentAnalyzer } from '@/ml-models';

const analyzer = new SentimentAnalyzer();
const result = analyzer.analyze("I am very excited about this opportunity!");

console.log(result);
// Output:
// {
//   sentiment: 'positive',
//   score: 0.85,
//   confidence: 0.72,
//   details: { ... }
// }
```

### Batch Analysis

```javascript
import { SentimentAnalyzer } from '@/ml-models';

const analyzer = new SentimentAnalyzer();
const texts = [
  "Great experience working on this project",
  "I struggled with the technical challenges",
  "The team collaboration was okay"
];

const results = analyzer.analyzeBatch(texts);
console.log(results);
// Returns array of sentiment analysis results
```

## 2. Performance Prediction

### Basic Usage

```javascript
import { PerformancePredictor } from '@/ml-models';

const predictor = new PerformancePredictor();

const interviewData = {
  responses: [
    "I have extensive experience in software development with a focus on backend systems.",
    "My key strengths include problem-solving, team leadership, and technical innovation.",
    "I successfully led a project that reduced server costs by 40% while improving performance."
  ],
  duration: 1800,
  questionCount: 3
};

const prediction = predictor.predict(interviewData);

console.log(prediction);
// Output:
// {
//   score: 82.5,
//   rating: 'good',
//   features: {
//     responseLength: 0.78,
//     vocabulary: 0.73,
//     coherence: 0.85,
//     relevance: 0.75,
//     confidence: 0.81
//   },
//   insights: [ ... ]
// }
```

## 3. Using ML Models in API Routes

### Sentiment Analysis API

```javascript
// POST /api/ml-sentiment
const response = await fetch('/api/ml-sentiment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "I am confident in my ability to contribute to your team"
  }),
});

const data = await response.json();
console.log(data);
```

### Performance Prediction API

```javascript
// POST /api/ml-performance
const response = await fetch('/api/ml-performance', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    responses: [
      "Response 1...",
      "Response 2...",
      "Response 3..."
    ],
    duration: 1800,
    questionCount: 3
  }),
});

const data = await response.json();
console.log(data);
```

## 4. Custom Configuration

### Modifying ML Configuration

```javascript
import { MLConfig } from '@/ml-models';
import { SentimentAnalyzer } from '@/ml-models';

// Customize configuration
const customConfig = {
  ...MLConfig,
  sentiment: {
    ...MLConfig.sentiment,
    positive: {
      keywords: [...MLConfig.sentiment.positive.keywords, 'amazing', 'fantastic'],
      weight: 1.2,
    },
  },
};

// Use custom config
const analyzer = new SentimentAnalyzer(customConfig);
```

## 5. Integration with Interview Workflow

### Analyzing Interview Completion

```javascript
import { PerformancePredictor, SentimentAnalyzer } from '@/ml-models';

async function analyzeInterviewCompletion(interviewId, responses) {
  // Initialize ML models
  const predictor = new PerformancePredictor();
  const sentimentAnalyzer = new SentimentAnalyzer();

  // Predict performance
  const performance = predictor.predict({
    responses,
    duration: 1800,
    questionCount: responses.length,
  });

  // Analyze sentiment of each response
  const sentiments = responses.map(response => 
    sentimentAnalyzer.analyze(response)
  );

  // Combine results
  return {
    interviewId,
    performance,
    sentiments,
    overallSentiment: {
      positive: sentiments.filter(s => s.sentiment === 'positive').length,
      negative: sentiments.filter(s => s.sentiment === 'negative').length,
      neutral: sentiments.filter(s => s.sentiment === 'neutral').length,
    },
  };
}
```

## 6. Utility Functions

### Using ML Utilities

```javascript
import { MLUtils } from '@/ml-models';

// Extract text features
const features = MLUtils.extractTextFeatures("This is a sample response with multiple words and sentences.");
console.log(features);
// Output:
// {
//   wordCount: 11,
//   sentenceCount: 1,
//   avgWordLength: 4.73,
//   uniqueWords: 11,
//   vocabularyRichness: 1.0
// }

// Calculate weighted score
const score = MLUtils.calculateWeightedScore(
  { feature1: 0.8, feature2: 0.6, feature3: 0.9 },
  { feature1: 0.4, feature2: 0.3, feature3: 0.3 }
);
console.log(score); // Weighted average

// Normalize values
const normalized = MLUtils.normalize(75, 0, 100);
console.log(normalized); // 0.75
```

## Best Practices

1. **Always validate input data** before passing to ML models
2. **Handle errors gracefully** using try-catch blocks
3. **Use batch processing** when analyzing multiple texts for efficiency
4. **Monitor performance** and adjust thresholds in MLConfig as needed
5. **Log predictions** for future model improvements
6. **Consider context** when interpreting ML results

## Performance Considerations

- ML models run synchronously and are optimized for real-time analysis
- Batch analysis is more efficient for multiple texts
- Models are lightweight and suitable for serverless environments
- No external ML service calls required - all processing is done locally

## Future Enhancements

- Add more sophisticated NLP features (current models use rule-based analysis)
- Implement actual ML model training capabilities (e.g., using TensorFlow.js)
- Add support for multiple languages
- Integrate with more advanced ML frameworks for deep learning
- Add A/B testing for model improvements
- Collect training data to build supervised learning models
