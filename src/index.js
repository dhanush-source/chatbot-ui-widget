(function(global) {
  'use strict';

  class ChatbotWidget {
    constructor(config = {}) {
      this.config = this.mergeConfig(config);
      this.shadowRoot = null;
      this.isOpen = false;
      this.messages = [];
      
      this.init();
    }

    mergeConfig(userConfig) {
      const defaults = {
        // Layout options
        layout: 'bubble', // 'bubble', 'embedded', 'fullscreen'
        target: 'body',
        width: '380px',
        height: '500px',
        
        // Positioning (only for bubble layout)
        position: 'bottom-right',
        
        // Display options
        autoOpen: false,
        showToggle: true,
        
        // Theme
        theme: 'dark',
        primaryColor: '#3B82F6',
        
        // Content
        greeting: 'Hi! How can I help you today?',
        placeholder: 'Write a message...',
        
        // Avatars
        avatar: {
          bot: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNOCAxMmgyVjE0SDhWMTJaTTEwIDEyaDJWMTRIMTBWMTJaMTIgMTJIMTJaMTJWMTRIMTJaTTEyIDEyaDJWMTRIUzEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=',
          user: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRjYzNDciLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTIgMTJMMTYgMTZMMTIgMjBWMTJaTTggMTJIMTJWMTZIMThWMjBIMThaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+Cg=='
        },
        
        // Callbacks
        onMessage: null,
        onOpen: null,
        onClose: null
      };

      return { ...defaults, ...userConfig };
    }

    init() {
      this.createWidget();
      this.attachStyles();
      this.attachEventListeners();
      
      if (this.config.autoOpen) {
        this.open();
      }
    }

    createWidget() {
      const container = document.createElement('div');
      container.className = `chatbot-widget chatbot-layout-${this.config.layout}`;
      
      // Create toggle button (only for bubble layout)
      const toggleHtml = this.config.layout === 'bubble' && this.config.showToggle ? `
        <div class="chatbot-toggle" id="chatbot-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      ` : '';

      // Create minimize button
      const minimizeButton = `
        <button class="chatbot-btn-minimize" id="chatbot-minimize">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;

      container.innerHTML = `
        ${toggleHtml}
        <div class="chatbot-window" id="chatbot-window">
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
          <div class="chatbot-messages" id="chatbot-messages">
          </div>
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
        </div>
      `;

      // Handle different target types
      if (typeof this.config.target === 'string') {
        this.target = document.querySelector(this.config.target);
      } else if (this.config.target instanceof Element) {
        this.target = this.config.target;
      } else {
        this.target = document.body;
      }

      if (!this.target) {
        throw new Error(`Target element not found: ${this.config.target}`);
      }

      this.shadowRoot = this.target.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(container);

      this.addWelcomeMessage();
    }

    attachStyles() {
      const style = document.createElement('style');
      style.textContent = `
        :host {
          --primary-color: ${this.config.primaryColor};
          --bg-primary: #1F2937;
          --bg-secondary: #374151;
          --bg-tertiary: #4B5563;
          --text-primary: #F9FAFB;
          --text-secondary: #D1D5DB;
          --text-muted: #9CA3AF;
          --border-color: #4B5563;
          --shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          --radius: 12px;
          --radius-sm: 8px;
        }

        .chatbot-widget {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }

        /* Bubble Layout */
        .chatbot-layout-bubble {
          position: fixed;
          ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
          ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
          z-index: 1000;
        }

        /* Embedded Layout */
        .chatbot-layout-embedded {
          position: relative;
          width: ${this.config.width};
          height: ${this.config.height};
        }

        /* Fullscreen Layout */
        .chatbot-layout-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          width: 100vw;
          height: 100vh;
        }

        .chatbot-toggle {
          width: 56px;
          height: 56px;
          background: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          margin-left: auto;
        }

        .chatbot-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .chatbot-window {
          background: var(--bg-primary);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: none;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        /* Bubble layout window positioning */
        .chatbot-layout-bubble .chatbot-window {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 380px;
          height: 500px;
        }

        /* Embedded layout window */
        .chatbot-layout-embedded .chatbot-window {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
        }

        /* Fullscreen layout window */
        .chatbot-layout-fullscreen .chatbot-window {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          border-radius: 0;
          border: none;
        }

        .chatbot-window.open {
          display: flex;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          background: var(--bg-secondary);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--primary-color);
        }

        .chatbot-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chatbot-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .chatbot-status {
          font-size: 12px;
          color: var(--text-muted);
        }

        .chatbot-header-actions {
          display: flex;
          gap: 8px;
        }

        .chatbot-btn-minimize {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chatbot-btn-minimize:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .chatbot-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
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
          max-width: 80%;
        }

        .chatbot-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .chatbot-message-avatar {
          width: 32px;
          height: 32px;
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
          border-radius: var(--radius-sm);
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .chatbot-message.bot .chatbot-message-bubble {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .chatbot-message.user .chatbot-message-bubble {
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chatbot-message-time {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .chatbot-message.user .chatbot-message-time {
          text-align: right;
        }

        /* HTML Content Formatting */
        .chatbot-message-bubble.html-content {
          line-height: 1.6;
        }

        .chatbot-message-bubble.html-content p {
          margin: 0 0 12px 0;
        }

        .chatbot-message-bubble.html-content p:last-child {
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

        .chatbot-input-container {
          padding: 16px;
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
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .chatbot-input:focus {
          border-color: var(--primary-color);
        }

        .chatbot-input::placeholder {
          color: var(--text-muted);
        }

        .chatbot-btn-send {
          background: var(--primary-color);
          color: white;
          border-radius: var(--radius-sm);
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
          background: color-mix(in srgb, var(--primary-color) 85%, black);
        }

        .chatbot-btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chatbot-layout-bubble {
            bottom: 10px;
            right: 10px;
            left: 10px;
          }

          .chatbot-layout-bubble .chatbot-window {
            width: 100%;
            height: 80vh;
            bottom: 70px;
            right: 0;
            left: 0;
            border-radius: var(--radius) var(--radius) 0 0;
          }
        }
      `;
      this.shadowRoot.appendChild(style);
    }

    attachEventListeners() {
      const toggle = this.shadowRoot.getElementById('chatbot-toggle');
      const minimize = this.shadowRoot.getElementById('chatbot-minimize');
      const sendBtn = this.shadowRoot.getElementById('chatbot-send');
      const input = this.shadowRoot.getElementById('chatbot-input');

      if (toggle) {
        toggle.addEventListener('click', () => this.toggle());
      }
      
      if (minimize) {
        minimize.addEventListener('click', () => this.close());
      }
      
      sendBtn.addEventListener('click', () => this.sendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      const window = this.shadowRoot.getElementById('chatbot-window');
      
      if (['embedded', 'fullscreen'].includes(this.config.layout)) {
        window.style.display = 'flex';
      } else {
        window.classList.add('open');
      }
      
      this.isOpen = true;
      
      if (this.config.onOpen) {
        this.config.onOpen();
      }
    }

    close() {
      const window = this.shadowRoot.getElementById('chatbot-window');
      
      if (this.config.layout === 'bubble') {
        window.classList.remove('open');
      } else {
        window.style.display = 'none';
      }
      
      this.isOpen = false;
      
      if (this.config.onClose) {
        this.config.onClose();
      }
    }

    addWelcomeMessage() {
      this.addMessage({
        text: this.config.greeting,
        sender: 'bot',
        timestamp: new Date()
      });
    }

    addMessage({ text, html, isHtml, sender, timestamp = new Date() }) {
      const messages = this.shadowRoot.getElementById('chatbot-messages');
      const messageEl = document.createElement('div');
      messageEl.className = `chatbot-message ${sender}`;
      
      const timeStr = timestamp.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      // Use HTML content if provided, otherwise use text
      const content = html || text;
      const isHtmlContent = isHtml || false;

      messageEl.innerHTML = `
        <div class="chatbot-message-avatar">
          <img src="${this.config.avatar[sender]}" alt="${sender}" />
        </div>
        <div class="chatbot-message-content">
          <div class="chatbot-message-bubble ${isHtmlContent ? 'html-content' : ''}">${content}</div>
          <div class="chatbot-message-time">${timeStr}</div>
        </div>
      `;

      messages.appendChild(messageEl);
      messages.scrollTop = messages.scrollHeight;

      this.messages.push({ text: content, sender, timestamp });
    }

    async sendMessage() {
      const input = this.shadowRoot.getElementById('chatbot-input');
      const text = input.value.trim();
      
      if (!text) return;

      input.value = '';
      this.addMessage({ text, sender: 'user', timestamp: new Date() });

      if (this.config.onMessage) {
        try {
          const response = await this.config.onMessage(text);
          if (response) {
            // Handle both string and object responses
            if (typeof response === 'object' && response.html) {
              this.addMessage({ 
                html: response.html,
                isHtml: response.isHtml,
                sender: 'bot', 
                timestamp: new Date() 
              });
            } else {
              this.addMessage({ 
                text: response, 
                sender: 'bot', 
                timestamp: new Date() 
              });
            }
          }
        } catch (error) {
          this.addMessage({ 
            text: 'Sorry, something went wrong. Please try again.', 
            sender: 'bot', 
            timestamp: new Date() 
          });
        }
      }
    }

    destroy() {
      if (this.shadowRoot && this.shadowRoot.parentNode) {
        this.shadowRoot.parentNode.removeChild(this.shadowRoot);
      }
    }
  }

  global.ChatbotWidget = ChatbotWidget;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotWidget;
  }
})(typeof window !== 'undefined' ? window : this);