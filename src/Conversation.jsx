import "./Conversation.css";

const Conversation = ({ conversation }) => (
  <div className="conversation">
    {conversation.map((entry, index) => (
      <div key={index} className="conversation-entry">
        <div className="philosopher-name">
          <span>{entry.philosopher}:</span>
        </div>
        <div className="philosopher-response">
          <span>{entry.text}</span>
        </div>
      </div>
    ))}
  </div>
);

export default Conversation;
