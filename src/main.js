import { ChatbotWidget } from './chatbot/chatbot.js'
import { chatApi } from './api/api.js'
import { markdownToHtml } from './utils/markdown.js'

let chatbotWidget = null;
// Get session id for the user
// use 44 to see chat history for bpjs and 43 for oneassure.
let SESSION_ID = 'testing-ui-65'; 

// API LOGIC
async function loadChatHistory() {
  try {
    const response = await chatApi.getChatHistory(SESSION_ID);
    
    if (response.data && Array.isArray(response.data)) {
      // get the older msgs first
      const messages = response.data.reverse();
      
      // Filter and format messages
      return messages.map(msg => {
        if (msg.type === 'UserMessage') {
          // Remove metadata from user messages
          const content = msg.content.replace(/\n\[METADATA:.*\]$/, '');
          return {
            text: content,
            sender: 'user',
            timestamp: new Date()
          };
        } else if (msg.type === 'AssistantMessage') {
          const htmlContent = markdownToHtml(msg.content);
          return {
            html: htmlContent,
            isHtml: true,
            sender: 'bot',
            timestamp: new Date()
          };
        }
        return null;
      }).filter(msg => msg !== null);
    }
    return [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
}

// OneAssure Theme Configuration
const OAThemeConfig = {
  layout: 'inline',
  target: '#chat-container',
  width: '100%',
  height: '100%',
  
  theme: 'dark',
  
  themeOverrides: {
    primaryColor: '#36B3B3',        
    secondaryColor: '#2196F3',      
    accentColor: '#1976D2',         
    
    bgPrimary: '#FFFFFF',           
    bgSecondary: '#E0F2F1',         
    bgTertiary: '#F5FAFA',          
    

    textPrimary: '#333333',         
    textSecondary: '#555555',       
    textMuted: '#999999',           
    
    
    borderColor: '#E0E0E0',         
    shadowColor: 'rgba(54, 179, 179, 0.15)',  
    

    headerBg: '#36B3B3',            
    headerText: '#FFFFFF',          
    
    
    botBubbleBg: '#E0F2F1',         
    botBubbleText: '#333333',       
    userBubbleBg: '#1976D2',        
    userBubbleText: '#FFFFFF',      
    
    
    inputBg: '#FFFFFF',             
    inputBorder: '#E0E0E0',         
    inputText: '#333333',           
    inputPlaceholder: '#999999',    
    

    buttonPrimary: '#1976D2',      
    buttonHover: '#1565C0',         
    
    
    fontFamily: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    
    borderRadius: '8px',            
    shadow: '0 2px 8px rgba(54, 179, 179, 0.12)',           
    shadowHover: '0 4px 16px rgba(54, 179, 179, 0.18)',     
  },
  
  autoOpen: true,
  showGreeting: false,  // Will be set dynamically based on chat history
  greeting: 'Hi! I\'m your OneAssure Insurance Assistant. How can I help you today?',
  placeholder: 'Type your message here...',
};

async function initChatbot() {
  // Only initialize once
  if (chatbotWidget) {
    return;
  }
  
  chatApi.sessionId = SESSION_ID;
  
  const chatHistory = await loadChatHistory();
  
  const config = {
    ...OAThemeConfig,
    initialMessages: chatHistory,
    showGreeting: chatHistory.length === 0,
    onMessage: async (message) => {
      try {
        const response = await chatApi.sendMessage(message);
        console.log('API Response:', response);
        
        
        if (response.data && response.data.content) {
          const markdownContent = response.data.content;
          const htmlContent = markdownToHtml(markdownContent);
          return { html: htmlContent, isHtml: true };
        } else if (response.data && response.data.response) {
          return { html: response.data.response, isHtml: false };
        } else if (response.data && response.data.reply) {
          return { html: response.data.reply, isHtml: false };
        } else if (typeof response.data === 'string') {
          return { html: response.data, isHtml: false };
        } else {
          console.error('Unexpected response format:', response);
          return { html: 'I received your message but got an unexpected response format.', isHtml: false };
        }
      } catch (error) {
        console.error('Chat API Error:', error);
        return { html: 'Sorry, I\'m having trouble connecting to the server. Please try again.', isHtml: false };
      }
    }
  };
  
  chatbotWidget = new ChatbotWidget(config);
}

// Make function globally available
window.initChatbot = initChatbot;