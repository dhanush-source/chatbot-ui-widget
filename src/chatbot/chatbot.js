// Main ChatbotWidget class
import { ChatToggle } from './components/ChatToggle.js';
import { ChatWindow } from './components/ChatWindow.js';
import { Message } from './components/Message.js';
import { LoadingIndicator } from './components/LoadingIndicator.js';
import { getAllStyles } from './styles/index.js';
import { getTheme, watchSystemTheme } from './styles/themes.js';
import { themeToCSSVariables, mergeStyles } from './utils/styleProcessor.js';

class ChatbotWidget {
  constructor(config = {}) {
    this.config = this.mergeConfig(config);
    this.shadowRoot = null;
    this.isOpen = false;
    this.messages = [];
    
    // Initialize components
    this.chatToggle = new ChatToggle(this.config);
    this.chatWindow = new ChatWindow(this.config);
    this.messageComponent = new Message(this.config);
    this.loadingIndicator = new LoadingIndicator(this.config);
    
    this.init();
  }

  mergeConfig(userConfig) {
    const defaults = {
      // Layout options
      layout: 'inline', // 'inline', 'bubble', 'embedded', 'fullscreen'
      target: 'body',
      width: '100%',
      height: '600px',
      
      // Positioning (only for bubble layout)
      position: 'bottom-right',
      
      // Display options
      autoOpen: false,
      showToggle: true,
      showGreeting: true,
      
      // Theme options
      theme: 'dark', // 'light', 'dark', 'auto'
      primaryColor: '#3B82F6', // Backward compatibility
      
      // Component-level styles
      componentStyles: {},
      
      // Theme overrides
      themeOverrides: {},
      
      // Custom CSS string
      customStyles: '',
      
      // Content
      greeting: 'Hi! How can I help you today?',
      placeholder: 'Write a message...',
      initialMessages: [], 
      
      // Avatars
      avatar: {
        bot: 'src/assets/chat-bot.jpg',
        user: 'src/assets/user.jpg'
      },
      
      // Callbacks
      onMessage: null,
      onOpen: null,
      onClose: null
    };

    const merged = { ...defaults, ...userConfig };
    
    // Process theme system
    merged.processedTheme = this.processTheme(merged);
    
    return merged;
  }

  processTheme(config) {
    // Get base theme from preset
    const baseTheme = getTheme(config.theme);
    
    // Handle backward compatibility - if primaryColor is set, add to themeOverrides
    if (config.primaryColor && config.primaryColor !== '#3B82F6') {
      config.themeOverrides = config.themeOverrides || {};
      if (!config.themeOverrides.primaryColor) {
        config.themeOverrides.primaryColor = config.primaryColor;
      }
    }
    
    // Merge all styles in priority order
    const mergedTheme = mergeStyles(
      baseTheme,
      config.componentStyles,
      config.themeOverrides
    );
    
    // Convert to CSS variables
    const cssVariables = themeToCSSVariables(mergedTheme);
    
    // Add custom CSS variables if provided
    if (mergedTheme['--radius']) cssVariables['--radius'] = mergedTheme['--radius'];
    if (mergedTheme['--radius-sm']) cssVariables['--radius-sm'] = mergedTheme['--radius-sm'];
    if (mergedTheme['--shadow']) cssVariables['--shadow'] = mergedTheme['--shadow'];
    if (mergedTheme['--font-family']) cssVariables['--font-family'] = mergedTheme['--font-family'];
    if (mergedTheme['--font-size']) cssVariables['--font-size'] = mergedTheme['--font-size'];
    
    // Add component-specific overrides
    Object.keys(mergedTheme).forEach(key => {
      if (key.startsWith('--') && !cssVariables[key]) {
        cssVariables[key] = mergedTheme[key];
      }
    });
    
    return cssVariables;
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
    
    // Render components
    container.innerHTML = `
      ${this.chatToggle.render()}
      ${this.chatWindow.render()}
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
    // Inject base styles with processed theme
    const baseStyle = document.createElement('style');
    baseStyle.textContent = getAllStyles(this.config);
    this.shadowRoot.appendChild(baseStyle);
    
    // Inject custom CSS if provided
    if (this.config.customStyles && typeof this.config.customStyles === 'string') {
      const customStyle = document.createElement('style');
      customStyle.textContent = this.config.customStyles;
      this.shadowRoot.appendChild(customStyle);
    }
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
    
    if (['inline', 'embedded', 'fullscreen'].includes(this.config.layout)) {
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
    
    // Inline layout should never close
    if (this.config.layout === 'inline') {
      return;
    }
    
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
    // Load initial messages if provided
    if (this.config.initialMessages && this.config.initialMessages.length > 0) {
      this.config.initialMessages.forEach(msg => {
        console.log(`Adding message to chat:`, msg);
        this.addMessage(msg);
      });
    } else if (this.config.showGreeting) {
      // Only show greeting if no initial messages
      this.addMessage({
        text: this.config.greeting,
        sender: 'bot',
        timestamp: new Date()
      });
    }
  }

  addMessage({ text, html, isHtml, sender, timestamp = new Date() }) {
    const messagesContainer = this.shadowRoot.getElementById('chatbot-messages');
    const tempContainer = document.createElement('div');
    
    // Use Message component to render
    tempContainer.innerHTML = this.messageComponent.render({
      text,
      html,
      isHtml,
      sender,
      timestamp
    });

    // Append the first child (the actual message div) to avoid extra wrapper
    messagesContainer.appendChild(tempContainer.firstElementChild);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    this.messages.push({ text: html || text, sender, timestamp });
  }

  showLoadingIndicator() {
    const messagesContainer = this.shadowRoot.getElementById('chatbot-messages');
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = this.loadingIndicator.render();
    messagesContainer.appendChild(tempContainer.firstElementChild);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideLoadingIndicator() {
    const loadingElement = this.shadowRoot.getElementById('chatbot-loading');
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  async sendMessage() {
    const input = this.shadowRoot.getElementById('chatbot-input');
    const text = input.value.trim();
    
    if (!text) return;

    input.value = '';
    this.addMessage({ text, sender: 'user', timestamp: new Date() });

    if (this.config.onMessage) {
      try {
        // Show loading animation
        this.showLoadingIndicator();
        
        const response = await this.config.onMessage(text);
        
        // Hide loading animation
        this.hideLoadingIndicator();
        
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
        // Hide loading animation on error
        this.hideLoadingIndicator();
        
        this.addMessage({ 
          text: 'Sorry, something went wrong. Please try again.', 
          sender: 'bot', 
          timestamp: new Date() 
        });
      }
    }
  }

  destroy() {
    if (this.shadowRoot && this.target) {
      // Remove the shadow root's host element
      this.target.shadowRoot = null;
    }
  }
}

// Export for ES6 modules
export { ChatbotWidget };

// Also expose globally for direct browser usage
if (typeof window !== 'undefined') {
  window.ChatbotWidget = ChatbotWidget;
}
