import React, { useEffect, useState } from "react";

import PhilosopherButton from "./PhilosopherButton";
import "./App.css";
import Conversation from "./Conversation";

interface ConversationEntry {
  philosopher: string;
  text: string;
}

const philosophers = ["Plato", "Aristotle", "Descartes"];

function App() {
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lightMode, setLightMode] = useState(true);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    // console.log(conversation, "convo");
  }, [conversation]);

  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
    document.body.classList.toggle("dark-mode", !lightMode);
  }, [lightMode]);

  const fetchGPTResponse = async (prompt: string) => {
    console.log(prompt);

    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI");
    }

    const data = await response.json();
    console.log(data, "DATA");
    return data.choices[0].message.content;
  };

  const getBasePrompt = (philosopher: string) => {
    return topic;
    // ?
    //  `You are ${philosopher}.
    // ${initialPrompt}`
    // : `I have a conversation history of some philosophers.
    // You are ${philosopher} and need to add one more statement to that history of conversation,
    // by a particular person who is part of the conversation.
    // Make it readable for 10th grader. Engage in a conversation on any topic you choose.
    // Just give the philosopher's msg dont add the name and no quotes
    // `;
  };

  const simulateClaudeResponse = async (
    philosopher: string,
    conversation: ConversationEntry[]
  ) => {
    let prompt;
    // if (conversation.length === 0) {
    // prompt = getBasePrompt(philosopher);

    let participants = "Plato, Aristotle, Descartes";
    // let conversation = "[BLANK]"

    // if (conversation_history.length >= 1)
    // conversation = ...
    // speakerName1: statement1
    // speakerName2: statement2
    // speakerName1: statement3

    let speaker = ""; //whos button was pressed

    // let topic = "";
    // conversation topic in the textbox

    //     prompt = `I have a conversation history of some philosophers.
    //     You need to add one more statement to that history of conversation,
    //     by a particular person who is part of the conversation.  Make it readable for 10th grader.
    // People in the conversation: ${philosophers}
    // Conversation:${conversation}
    // Generate next statement from: ${philosopher}
    // Topic: ${topic}
    // Your output statement should give ONLY the statement as string WITHOUT quotes:
    // `;
    prompt = `I have a conversation history of some philosophers. 
You need to add one more statement to that history of conversation, 
by a particular person who is part of the conversation.  Make it readable for 10th grader.
People in the conversation:${philosophers}. Conversation will be ${conversation}
Generate next statement from ${philosopher}.Topic will be ${topic}
Your output statement should give ONLY the statement as string and WITHOUT ${philosopher} name and WITHOUT quote marks:
`;
    // } else {
    //   prompt = `You are ${philosopher}. Continue the following conversation with
    //   just give the philosopher's msg dont add the name and no quotes: ${conversation
    //     .map((entry) => `${entry.philosopher}: ${entry.text}`)
    //     .join("\n")}`;
    // }

    const responseText = await fetchGPTResponse(prompt);
    return { text: responseText };
  };

  const handlePhilosopherClick = async (philosopher: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await simulateClaudeResponse(philosopher, conversation);
      console.log(conversation);
      setConversation([...conversation, { philosopher, text: response.text }]);
    } catch (err) {
      setError("Failed to get response from OpenAI.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    setConversation([]);
    setTopic("");
  };

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <div className="app">
      <i
        onClick={toggleLightMode}
        className={`fas fa-${lightMode ? "moon" : "sun"} toggle-mode-icon`}
      ></i>
      <h1>Philosopher Conversation</h1>
      <div
        className={`input-container ${conversation.length === 0 ? "wide" : ""}`}
      >
        <h3>Topic:</h3>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter initial prompt for the conversation"
          className="initial-prompt-input"
        />
      </div>
      <div
        className={`conversation-container ${
          conversation.length === 0 ? "wide" : ""
        }`}
      >
        <Conversation conversation={conversation} />
      </div>
      {error && <div className="error">{error}</div>}
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="philosopher-buttons">
        {philosophers.map((philosopher) => (
          <PhilosopherButton
            key={philosopher}
            philosopher={philosopher}
            onClick={handlePhilosopherClick}
          />
        ))}
      </div>

      <button
        onClick={handleNewConversation}
        className="new-conversation-button"
      >
        Start New Conversation
      </button>
    </div>
  );
}

export default App;
