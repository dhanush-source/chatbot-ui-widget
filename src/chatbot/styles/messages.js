// Message list and message bubble styles
export const messagesStyles = `
  .chatbot-messages {
    flex: 1;
    padding: var(--message-spacing, 16px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: var(--message-spacing, 16px);
  }

  .chatbot-messages::-webkit-scrollbar {
    width: 4px;
  }

  .chatbot-messages::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  .chatbot-messages::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }

  .chatbot-message {
    display: flex;
    gap: 8px;
    max-width: var(--message-max-width, 80%);
  }

  .chatbot-message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .chatbot-message-avatar {
    width: var(--message-avatar-size, 32px);
    height: var(--message-avatar-size, 32px);
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .chatbot-message-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .chatbot-message-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .chatbot-message-bubble {
    padding: 12px 16px;
    border-radius: var(--message-radius, var(--radius-sm, 8px));
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
  }

  .chatbot-message.bot .chatbot-message-bubble {
    background: var(--bot-bubble-bg, var(--bg-secondary));
    color: var(--bot-bubble-text, var(--text-primary));
    border-bottom-left-radius: 4px;
  }

  .chatbot-message.user .chatbot-message-bubble {
    background: var(--user-bubble-bg, var(--primary-color));
    color: var(--user-bubble-text, white);
    border-bottom-right-radius: 4px;
  }

  .chatbot-message-time {
    font-size: 11px;
    color: var(--message-timestamp, var(--text-muted));
    margin-top: 4px;
  }

  .chatbot-message.user .chatbot-message-time {
    text-align: right;
  }

  /* HTML/Markdown content formatting */
  .chatbot-message-bubble.html-content {
    line-height: 1.6;
  }

  /* Target ALL p tags inside message bubbles */
  .chatbot-message-bubble p {
    margin: 0 0 12px 0;
  }

  .chatbot-message-bubble p:first-child {
    margin-top: 0;
  }

  .chatbot-message-bubble p:last-child {
    margin-bottom: 0;
  }

  .chatbot-message-bubble.html-content ul,
  .chatbot-message-bubble.html-content ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  .chatbot-message-bubble.html-content li {
    margin: 4px 0;
  }

  .chatbot-message-bubble.html-content strong {
    font-weight: 600;
    color: var(--text-primary);
  }

  .chatbot-message-bubble.html-content em {
    font-style: italic;
  }

  .chatbot-message-bubble.html-content code {
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 13px;
  }

  .chatbot-message-bubble.html-content pre {
    background: var(--bg-tertiary);
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 8px 0;
  }

  .chatbot-message-bubble.html-content pre code {
    background: none;
    padding: 0;
  }

  .chatbot-message-bubble.html-content h1,
  .chatbot-message-bubble.html-content h2,
  .chatbot-message-bubble.html-content h3 {
    margin: 12px 0 8px 0;
    font-weight: 600;
    line-height: 1.3;
  }

  .chatbot-message-bubble.html-content h1 {
    font-size: 18px;
  }

  .chatbot-message-bubble.html-content h2 {
    font-size: 16px;
  }

  .chatbot-message-bubble.html-content h3 {
    font-size: 14px;
  }

  .chatbot-message-bubble.html-content a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .chatbot-message-bubble.html-content a:hover {
    opacity: 0.8;
  }

  .chatbot-message-bubble.html-content br {
    display: block;
    content: "";
    margin: 4px 0;
  }

  /* Loading indicator / typing animation */
  .chatbot-typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
  }

  .chatbot-typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-secondary);
    opacity: 0.6;
    animation: typing-bounce 1.4s infinite ease-in-out;
  }

  .chatbot-typing-indicator span:nth-child(1) {
    animation-delay: 0s;
  }

  .chatbot-typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .chatbot-typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing-bounce {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }

  /* Loading indicator specific styling */
  .chatbot-message.loading-indicator {
    opacity: 0.8;
  }
`;

