// Header component - displays chatbot name, status, and minimize button
export class Header {
  constructor(config) {
    this.config = config;
  }

  render() {
    const minimizeButton = this.config.layout !== 'inline' ? `
      <button class="chatbot-btn-minimize" id="chatbot-minimize">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    ` : '';

    return `
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">
            <img src="${this.config.avatar.bot}" alt="Bot" />
          </div>
          <div class="chatbot-header-text">
            <div class="chatbot-name">Assistant</div>
            <div class="chatbot-status">Online</div>
          </div>
        </div>
        <div class="chatbot-header-actions">
          ${minimizeButton}
        </div>
      </div>
    `;
  }
}

