import React, { useState } from 'react';
import { Box, Textarea, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

async function AIAutofill({ primary_author_IPA, secondary_author_IPA, claim }: { primary_author_IPA: object; secondary_author_IPA: object; claim: string }) {
    const API_KEY = process.env.REACT_APP_GPT_API_KEY;
    console.log("key:", API_KEY);
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    console.log(API_URL);
  
    console.log("primary_author_IPA:", JSON.stringify(primary_author_IPA));
    console.log("secondary_author_IPA:", JSON.stringify(secondary_author_IPA));
    console.log("claim:", claim);
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-0125', // or 'gpt-3.5-turbo'
          messages: [
            { role: 'system', content: '' },
            { role: 'user', content: `I` }
          ],
          max_tokens: 150, // The maximum number of tokens in the response
          temperature: 0.7, // Adjusts the creativity of the response
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.choices[0].message.content);
      } else {
        console.error('Failed to fetch data from OpenAI:', response.statusText);
      }
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
    }
}