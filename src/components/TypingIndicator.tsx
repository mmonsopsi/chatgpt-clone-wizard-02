export const TypingIndicator = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl px-4">
      <div className="message-content assistant-message">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};