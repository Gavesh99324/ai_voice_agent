/**
 * Test script for ML models
 * Run with: node ml-models/test-ml.js
 */

import { SentimentAnalyzer } from './components/sentimentAnalyzer.js';
import { PerformancePredictor } from './components/performancePredictor.js';

console.log('=== Testing ML Models ===\n');

// Test 1: Sentiment Analysis - Single Text
console.log('Test 1: Sentiment Analysis (Single Text)');
const analyzer = new SentimentAnalyzer();
const sentiment1 = analyzer.analyze("I am very excited about this opportunity and have excellent experience in this field!");
console.log('Input: "I am very excited about this opportunity and have excellent experience in this field!"');
console.log('Result:', JSON.stringify(sentiment1, null, 2));
console.log('\n---\n');

// Test 2: Sentiment Analysis - Negative Text
console.log('Test 2: Sentiment Analysis (Negative Text)');
const sentiment2 = analyzer.analyze("I struggled with this problem and never found a good solution. It was very difficult.");
console.log('Input: "I struggled with this problem and never found a good solution. It was very difficult."');
console.log('Result:', JSON.stringify(sentiment2, null, 2));
console.log('\n---\n');

// Test 3: Sentiment Analysis - Batch
console.log('Test 3: Sentiment Analysis (Batch)');
const texts = [
  "Great experience working on this project",
  "I struggled with the technical challenges",
  "The team collaboration was okay"
];
const sentiments = analyzer.analyzeBatch(texts);
console.log('Inputs:', texts);
console.log('Results:');
sentiments.forEach((s, i) => {
  console.log(`  ${i + 1}. Sentiment: ${s.sentiment}, Score: ${s.score}`);
});
console.log('\n---\n');

// Test 4: Performance Prediction
console.log('Test 4: Performance Prediction');
const predictor = new PerformancePredictor();
const interviewData = {
  responses: [
    "I have extensive experience in software development with a focus on backend systems and scalability. I have worked with multiple programming languages including Python, JavaScript, and Go.",
    "My key strengths include problem-solving, team leadership, and technical innovation. I excel at breaking down complex problems into manageable components and delivering efficient solutions.",
    "I successfully led a project that reduced server costs by 40% while improving performance. The project involved optimizing database queries and implementing caching strategies."
  ],
  duration: 1800,
  questionCount: 3
};

const prediction = predictor.predict(interviewData);
console.log('Interview Data:');
console.log('  Responses:', interviewData.responses.length);
console.log('  Duration:', interviewData.duration, 'seconds');
console.log('\nPrediction Result:', JSON.stringify(prediction, null, 2));
console.log('\n---\n');

// Test 5: Edge Cases
console.log('Test 5: Edge Cases');
console.log('5a. Empty text:');
const emptyResult = analyzer.analyze("");
console.log('Result:', JSON.stringify(emptyResult, null, 2));

console.log('\n5b. Very short response:');
const shortPrediction = predictor.predict({
  responses: ["Yes."],
  duration: 60,
  questionCount: 1
});
console.log('Result:', JSON.stringify(shortPrediction, null, 2));

console.log('\n=== All Tests Complete ===');
