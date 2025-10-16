import { ChatbotWidget } from './chatbot/widget.js'

let chatbotWidget = null;
let SESSION_ID = 'testing-ui-67'; 


// OneAssure Theme Configuration
const OAThemeConfig = {
  layout: 'inline',
  target: '#chat-container', // where u want to insert chatbot widget
  width: '100%',
  height: '100%',
  
  theme: 'light',
  

  avatar:{
    bot:"public/assets/chat-bot.jpg",
    user:"public/assets/user.jpg"
  },

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
  greeting: 'Hi! I\'m your OneAssure Insurance Assistant. How can I help you today?',
  placeholder: 'Type your message here...',
};

async function initChatbot() {
  // Only initialize once
  if (chatbotWidget) {
    return;
  }
  
  const config = {
    ...OAThemeConfig,
    sessionID:SESSION_ID,
    showGreeting: true,
  }
  chatbotWidget =await ChatbotWidget.Init(config)
}

// Make function globally available
window.initChatbot = initChatbot;