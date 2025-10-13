import './index.js'
import { chatApi } from './api.js'
import { markdownToHtml } from './utils/markdown.js'

let chatbotWidget = null;

function openChatbot() {
  if (chatbotWidget) {
    chatbotWidget.destroy();
  }
  
  chatbotWidget = new ChatbotWidget({
    layout: 'fullscreen',
    theme: 'dark',
    primaryColor: '#3B82F6',
    autoOpen: true,
    greeting: 'Hi! How can I help you today?',
    placeholder: 'Write a message...',
    onMessage: async (message) => {
      try {
        const response = await chatApi.sendMessage(message);
        console.log('API Response:', response);
        
        // Extract content from your API response
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
    }, 
    onClose: () => {
      document.querySelector('.home-container').style.display = 'block';
    }
  });
  
  // Hide home page when chatbot opens
  document.querySelector('.home-container').style.display = 'none';
}

// Make function globally available
window.openChatbot = openChatbot;