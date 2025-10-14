// InputBox component - input field and send button
export class InputBox {
  constructor(config) {
    this.config = config;
  }

  render() {
    return `
      <div class="chatbot-input-container">
        <div class="chatbot-input-wrapper">
          <input 
            type="text" 
            class="chatbot-input" 
            id="chatbot-input" 
            placeholder="${this.config.placeholder}"
          />
          <button class="chatbot-btn-send" id="chatbot-send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

