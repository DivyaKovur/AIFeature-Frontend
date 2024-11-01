"use client"
import React, { useState } from 'react';
import axios from 'axios';

const AIFeatures = () => {
  const [resumeText, setResumeText] = useState('');
  const [sentimentTranscript, setSentimentTranscript] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [skillTags, setSkillTags] = useState('');
  const [sentimentResult, setSentimentResult] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSkillTagging = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/skill-tagging', {
        resumeText,
      });
      setSkillTags(response.data.skills);
    } catch (error) {
      if (error.response) {
        console.error('Error in Skill Tagging:', error.response.data);
        setSkillTags('Error retrieving skill tags: ' + error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        setSkillTags('Error: No response from server.');
      } else {
        console.error('Error:', error.message);
        setSkillTags('Error: ' + error.message);
      }
    }
  };

  const handleSentimentAnalysis = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/sentiment-analysis', {
        transcript: sentimentTranscript,
      });
      setSentimentResult(response.data.sentiment);
    } catch (error) {
      if (error.response) {
        console.error('Error in Sentiment Analysis:', error.response.data);
        setSentimentResult('Error retrieving sentiment: ' + error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        setSentimentResult('Error: No response from server.');
      } else {
        console.error('Error:', error.message);
        setSentimentResult('Error: ' + error.message);
      }
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        userMessage: chatInput,
      });
      setChatResponse(response.data.botResponse);
      setChatInput(''); // Clear input after sending
    } catch (error) {
      if (error.response) {
        console.error('Error in Chatbot:', error.response.data);
        setChatResponse('Error: ' + error.response.data.error);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        setChatResponse('Error: No response from server.');
      } else {
        console.error('Error:', error.message);
        setChatResponse('Error: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>AI Features</h2>

      {/* Skill Tagging */}
      <form onSubmit={handleSkillTagging}>
        <h3>Skill Tagging</h3>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Enter resume text here..."
          rows="4"
          required
        />
        <button type="submit">Tag Skills</button>
        <div>
          <h4>Extracted Skills:</h4>
          <p>{skillTags}</p>
        </div>
      </form>

      {/* Sentiment Analysis */}
      <form onSubmit={handleSentimentAnalysis}>
        <h3>Sentiment Analysis</h3>
        <textarea
          value={sentimentTranscript}
          onChange={(e) => setSentimentTranscript(e.target.value)}
          placeholder="Enter transcript here..."
          rows="4"
          required
        />
        <button type="submit">Analyze Sentiment</button>
        <div>
          <h4>Sentiment Result:</h4>
          <p>{sentimentResult}</p>
        </div>
      </form>

      {/* Chatbot */}
      <form onSubmit={handleChat}>
        <h3>Chatbot</h3>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit">Send</button>
        <div>
          <h4>Chatbot Reply:</h4>
          <p>{chatResponse}</p>
        </div>
      </form>
    </div>
  );
};

export default AIFeatures;
