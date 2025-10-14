// Input box and send button styles
export const inputStyles = `
  .chatbot-input-container {
    padding: var(--input-padding, 16px);
    border-top: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .chatbot-input-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .chatbot-input {
    flex: 1;
    background: var(--input-bg, var(--bg-primary));
    border: 1px solid var(--input-border, var(--border-color));
    border-radius: var(--radius-sm, 8px);
    padding: 12px 16px;
    color: var(--input-text, var(--text-primary));
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .chatbot-input:focus {
    border-color: var(--primary-color);
  }

  .chatbot-input::placeholder {
    color: var(--input-placeholder, var(--text-muted));
  }

  .chatbot-btn-send {
    background: var(--btn-send-bg, var(--primary-color));
    color: var(--btn-send-color, white);
    border-radius: var(--radius-sm, 8px);
    padding: 12px;
    min-width: 44px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .chatbot-btn-send:hover {
    background: color-mix(in srgb, var(--btn-send-bg, var(--primary-color)) 85%, black);
  }

  .chatbot-btn-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

