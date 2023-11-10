import ChatBubble from "./ChatBubble";

function Chatbox() {
  return (
    <div className="chatbox">
      <div className="wrapper">
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble type="friend" isFirst={true} />
        <ChatBubble type="friend" />
        <ChatBubble type="friend" />
        <ChatBubble isFirst={true} />
        <ChatBubble />
        <ChatBubble type="friend" isFirst={true} />
        <ChatBubble type="friend" />
        <ChatBubble isFirst={true} />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble type="friend" isFirst={true} />
        <ChatBubble type="friend" />
        <ChatBubble isFirst={true} />
      </div>
    </div>
  );
}

export default Chatbox;
