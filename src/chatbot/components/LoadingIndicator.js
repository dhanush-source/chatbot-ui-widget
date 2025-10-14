// LoadingIndicator component - shows typing animation while waiting for LLM response
export class LoadingIndicator {
  constructor(config) {
    this.config = config;
  }

  render() {
    return `
      <div class="chatbot-message bot loading-indicator" id="chatbot-loading">
        <div class="chatbot-message-avatar">
          <img src="${this.config.avatar.bot}" alt="bot" />
        </div>
        <div class="chatbot-message-content">
          <div class="chatbot-message-bubble">
            <div class="chatbot-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

