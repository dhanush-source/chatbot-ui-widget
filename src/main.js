import { ChatbotWidget } from './chatbot/chatbot.js'
import { chatApi } from './api/api.js'
import { markdownToHtml } from './utils/markdown.js'

let chatbotWidget = null;
// Get session id for the user
let SESSION_ID = 'testing-ui-23'; 

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

async function initChatbot() {
  // Only initialize once
  if (chatbotWidget) {
    return;
  }
  
  chatApi.sessionId = SESSION_ID;
  
  const chatHistory = await loadChatHistory();
  
  chatbotWidget = new ChatbotWidget({
    layout: 'inline',
    target: '#chat-container',
    width: '100%',
    height: '100%',
    
    // Theme: 'light', 'dark', or 'auto'
    theme: 'dark',
    
    // Optional: Override theme colors/fonts
    themeOverrides: {
      primaryColor: '#3B82F6',
      fontFamily: 'Inter, -apple-system, sans-serif'
    },
    
    autoOpen: true,
    initialMessages: chatHistory,
    showGreeting: chatHistory.length === 0, 
    greeting: 'Hi! How can I help you today?',
    placeholder: 'Write a message...',
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
  });
}

// Make function globally available
window.initChatbot = initChatbot;