import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Box } from "@chakra-ui/react";
import theme from "../../theme";
import "react-circular-progressbar/dist/styles.css";

/*
  Example IPA JSON Format (utilizes a subset of on-chain terms):
  {
    "IPID": "0xa3BF0eF933f3A1DB17CFb35b1A7b3Dac91149F4b",
    "creationDate": "2022-04-20 12:00:00",
    "licenseFlavor": "Non-Commercial Social Remixing", # The type of license the IP Asset has
    "commercialUse": false,  # You can make money from using the original IP Asset, subject to limitations below.
    "commercialAttribution": false,  # If true, people must give credit to the original work in their commercial application (eg. merch)
    "derivativesAllowed": true,  # If true, people can make remixes, adaptations, or other derivative works based on the original IP Asset
    "derivativesAttribution": true,  # If true, people must give credit to the original work in their derivative works
    "raw_text": "This is the original text of the IP Asset." # The original text of the IP Asset
  }
*/

const test_primary_author_IPA = {
  "IPID": "0xa3BF0eF933f3A1DB17CFb35b1A7b3Dac91149F4b",
  "creationDate": "2022-04-20 12:00:00",
  "licenseFlavor": "Non-Commercial Social Remixing",
  "commercialUse": false,
  "commercialAttribution": false,
  "derivativesAllowed": true,
  "derivativesAttribution": true,
  "raw_text": "This is the original text of the IP Asset."
};

const test_secondary_author_IPA = {
  "IPID": "0x3aDf0eF933f3A1DB17CFb35b1A7b3Dac91149F4b",
  "creationDate": "2022-04-20 12:00:00",
  "licenseFlavor": "Non-Commercial Social Remixing",
  "commercialUse": false,
  "commercialAttribution": false,
  "derivativesAllowed": true,
  "derivativesAttribution": true,
  "raw_text": "This is the original text of the IP Asset."
};

const test_claim = "The secondary author has plagiarized the primary author's work.";

async function callGPT({ primary_author_IPA, secondary_author_IPA, claim }: { primary_author_IPA: object; secondary_author_IPA: object; claim: string }) {
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
          { role: 'system', content: 'You are an arbiter between a dispute of two assets on the Story Protocol. Please examine the IP assets, including all licensing terms and raw text. Return a JSON with (1) a 120 word analysis of the claim findings and (2) a percentage score of how confident you are that the claim is correct.' },
          { role: 'user', content: `IPA of the author making the claim: ${JSON.stringify(primary_author_IPA)}. Other author IPA: ${JSON.stringify(secondary_author_IPA)}. Here is the claim of the disbute: ${claim}. Your job is to understand all metadata and raw text, return a JSON with (1) a 150 word analysis on the evaluation of the claim, and (2) give a specific percentage confidence score of how likely the claim is true.` }
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

//callGPT({ primary_author_IPA: test_primary_author_IPA, secondary_author_IPA: test_secondary_author_IPA, claim: test_claim });

const ConfidenceScore: React.FC = () => {
  const percentage = 42; // Hardcoded for now, will be a variable later

  return (
    <Box
      overflow="hidden"
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: "#000",
          trailColor: "#d6d6d6",
          backgroundColor: "#f8f9fa",
        })}
      />
    </Box>
  );
};

export default ConfidenceScore;
