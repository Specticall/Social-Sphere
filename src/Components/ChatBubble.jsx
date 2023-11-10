function ChatBubble({ type = "user", isFirst = false, text, date }) {
  return (
    <div
      className={`chat-bubble ${type === "user" ? "user" : "friend"} ${
        isFirst ? "is-first" : ""
      }`}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, suscipit
        perspiciatis reprehenderit natus culpa esse nostrum illo optio vitae
        aut?
      </p>
      <span className="date">17:00 PM</span>
    </div>
  );
}

export default ChatBubble;
