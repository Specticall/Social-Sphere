function ChatInput() {
  return (
    <form className="chat-input">
      <div className="attach">
        <i className="bx bx-paperclip"></i>
      </div>
      <input
        type="text"
        className="text-input"
        placeholder="Enter Message..."
      />
      <button className="send-text">
        <i className="bx bxs-send"></i>
      </button>
    </form>
  );
}

export default ChatInput;
