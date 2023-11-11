function ChatBubble({ type = "user", isFirst = false, message, date }) {
  return (
    <div
      className={`chat-bubble ${type === "user" ? "user" : "friend"} ${
        isFirst ? "is-first" : ""
      }`}
    >
      <p>{message}</p>
      <span className="date">17:00 PM</span>
    </div>
  );
}

export default ChatBubble;
