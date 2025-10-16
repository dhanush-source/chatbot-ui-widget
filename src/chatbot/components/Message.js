// Message component - displays a single chat message
export class Message {
  constructor(config) {
    this.config = config;
  }

  render({ text, html, isHtml, sender, timestamp }) {
    const timeStr = timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });

    const content = html || text;
    const isHtmlContent = isHtml || false;

    return `
      <div class="chatbot-message ${sender}">
        <div class="chatbot-message-avatar">
          <img src="${this.config.avatar[sender]}" alt="${sender}" />
        </div>
        <div class="chatbot-message-content">
          <div class="chatbot-message-bubble ${isHtmlContent ? 'html-content' : ''}">${content}</div>
          <div class="chatbot-message-time">${timeStr}</div>
        </div>
      </div>
    `;
  }
}

