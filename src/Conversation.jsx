import { useEffect, useRef } from "react";
import "./Conversation.css";

const Conversation = ({ conversation }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation]);
  return(

  

  <div className="conversation">
    {conversation.map((entry, index) => (
      <div key={index} className="conversation-entry">
        <div className="philosopher-name">
          <span>{entry.philosopher}:</span>
        </div>
        <div className="philosopher-response">
          <span>{entry.text}</span>
        </div>
        <div ref={messagesEndRef} />
      </div>
    ))}
  </div>
)};

export default Conversation;
