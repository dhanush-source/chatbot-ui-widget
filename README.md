# Chatbot UI Widget

A modern, customizable, and framework-agnostic chatbot widget with **embedded API integration**. Features modular components, comprehensive theming, Shadow DOM isolation, and built-in HTTP client for seamless chat functionality.

## Features

- **Embedded API Integration** - Built-in HTTP client with session management
- **Markdown Support** - Rich text rendering with `marked` library
- **Loading Indicators** - Typing animations during API calls
- **Session Management** - Automatic chat history loading
- **Fully Customizable** - Preset themes, component-level styling, and custom CSS
- **Light/Dark Modes** - Built-in themes with auto system detection
- **Multiple Layouts** - Bubble, inline, embedded, fullscreen, and modal modes
- **Framework Agnostic** - Works with React, Vue, vanilla JS, or any framework
- **Shadow DOM Isolation** - No style conflicts with your existing website
- **Modular Architecture** - Component-based design for easy customization

## Installation

### NPM Package
```bash
npm install chatbot-ui-widget
```

### CDN (Minified Version)
Use the minified version directly in HTML - no build step required:

```html
<!-- UMD version (recommended for script tags) -->
<script src="https://unpkg.com/chatbot-ui-widget/dist/chatbot-widget.min.js"></script>

<!-- Or ES module version -->
<script type="module">
  import { ChatbotWidget } from 'https://unpkg.com/chatbot-ui-widget/dist/chatbot-widget.es.min.js';
</script>
```

**File Sizes:**
- `chatbot-widget.min.js`: 70.5 kB (19.7 kB gzipped) - UMD format
- `chatbot-widget.es.min.js`: 91.2 kB (22.4 kB gzipped) - ES module format

## Quick Start

### Basic Usage with Embedded API

```javascript
import { ChatbotWidget } from 'chatbot-ui-widget';

const widget = await ChatbotWidget.Init({
  target: '#chat-container',
  layout: 'inline',
  theme: 'dark',
  sessionID: 'user-session-123',  // Required for API integration
  autoOpen: true,
  greeting: 'Hi! How can I help you today?'
});

// API calls are handled automatically!
// No need for onMessage callback - it's embedded
```

### CDN Usage (No Build Step Required)

Perfect for quick integration without any build tools:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <div id="chat-container"></div>
    <button id="open-chatbot">Open Chatbot</button>
    
    <!-- Include the minified SDK -->
    <script src="https://unpkg.com/chatbot-ui-widget/dist/chatbot-widget.min.js"></script>
    
    <script>
        let chatbotWidget = null;
        
        async function initChatbot() {
            if (chatbotWidget) return;
            
            chatbotWidget = await ChatbotWidget.Init({
                layout: 'modal',
                target: 'body',
                width: '800px',
                height: '600px',
                theme: 'light',
                autoOpen: false,
                greeting: 'Hi! How can I help you today?',
                apiConfig: {
                    baseURL: 'https://your-api-endpoint.com/api/v1',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 30000,
                    teamName: "YourTeam",
                    version: "1.0.0",
                    sessionID: 'user-session-123',
                }
            });
        }
        
        // Set up button click handler
        document.getElementById('open-chatbot').addEventListener('click', async () => {
            if (!chatbotWidget) {
                await initChatbot();
            }
            chatbotWidget.open();
        });
    </script>
</body>
</html>
```

### Simple Bubble Chat

```javascript
import { ChatbotWidget } from 'chatbot-ui-widget';

const widget = await ChatbotWidget.Init({
  layout: 'bubble',
  position: 'bottom-right',
  sessionID: 'user-123',
  autoOpen: false
});
```

### HTML Setup

```html
<div id="chat-container"></div>
<script type="module">
  import { ChatbotWidget } from './chatbot-widget.js';
  
  const widget = await ChatbotWidget.Init({
    target: '#chat-container',
    layout: 'inline',
    sessionID: 'user-123'
  });
</script>
```

### API Configuration

The widget includes a built-in HTTP client with configurable endpoints:

```javascript
const widget = await ChatbotWidget.Init({
  target: '#chat-container',
  sessionID: 'user-session-123',
  
  // API Configuration
  apiConfig: {
    baseURL: 'http://localhost:8000/api/v1',  // Your API base URL
    teamName: 'BPJS-TEST',                    // Team name for API calls
    version: '1.0.0',                        // API version
    timeout: 100000,                         // Request timeout (ms)
    headers: {
      'Content-Type': 'application/json',
      // Add custom headers here
    }
  }
});

// The API client automatically handles:
// - Message sending via /chat/query
// - Chat history loading via /chat/history
// - Session management
// - Error handling
```

### Multiple Environments

Configure different API endpoints for different environments:

```javascript
// Development
const devWidget = await ChatbotWidget.Init({
  target: '#chat-container',
  sessionID: 'dev-user-123',
  apiConfig: {
    baseURL: 'http://localhost:8000/api/v1',
    teamName: 'DEV-TEAM',
    version: '1.0.0'
  }
});

// Production
const prodWidget = await ChatbotWidget.Init({
  target: '#chat-container',
  sessionID: 'prod-user-123',
  apiConfig: {
    baseURL: 'https://api.myapp.com/v1',
    teamName: 'PRODUCTION',
    version: '2.0.0',
    headers: {
      'Authorization': 'Bearer prod-token'
    }
  }
});
```

---

## Minified SDK Benefits

The minified version (`chatbot-widget.min.js`) is perfect for production use:

### ✅ **What's Included:**
- **Complete chatbot functionality** - All layouts, components, and features
- **Embedded CSS styles** - No separate CSS file needed
- **API integration** - Built-in HTTP client with session management
- **Markdown support** - Rich text rendering capabilities
- **All dependencies** - Including `marked` library for markdown processing

### ✅ **What's Excluded:**
- ❌ Demo files and development code
- ❌ Source maps and debugging info
- ❌ Unused code and dependencies
- ❌ Development tools and examples

### ✅ **Performance:**
- **Small file size**: 70.5 kB (19.7 kB gzipped)
- **Fast loading**: Single HTTP request
- **No build step**: Direct browser usage
- **CDN ready**: Available via unpkg.com

### ✅ **Usage Scenarios:**
- **Static websites** - No build process needed
- **Quick prototypes** - Drop-in integration
- **Legacy projects** - Works with any HTML/JS setup
- **CDN distribution** - Global content delivery

## Integration Examples

### React/Next.js

Create a reusable chatbot component:

```jsx
// components/Chatbot.jsx
import { useEffect, useRef } from 'react';
import { ChatbotWidget } from 'chatbot-ui-widget';

export default function Chatbot({ sessionId, onMessage }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !widgetRef.current) {
      widgetRef.current = new ChatbotWidget({
        target: containerRef.current,
        layout: 'inline',
        width: '100%',
        height: '600px',
        theme: 'dark',
        autoOpen: true,
        onMessage: onMessage || (async (msg) => {
          // Default API handler
          const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message: msg, sessionId })
          });
          const data = await res.json();
          return data.reply;
        })
      });
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, [sessionId, onMessage]);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
}
```

**Usage:**

```jsx
// app/chat/page.jsx
import Chatbot from '@/components/Chatbot';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Support</h1>
      <Chatbot sessionId="user-123" />
    </div>
  );
}
```

### Vue.js

```vue
<!-- components/Chatbot.vue -->
<template>
  <div ref="chatContainer" class="chat-container"></div>
</template>

<script>
import { ChatbotWidget } from 'chatbot-ui-widget';

export default {
  name: 'Chatbot',
  props: {
    sessionId: String,
    theme: {
      type: String,
      default: 'dark'
    }
  },
  mounted() {
    this.widget = new ChatbotWidget({
      target: this.$refs.chatContainer,
      layout: 'inline',
      theme: this.theme,
      onMessage: async (message) => {
        const response = await fetch('/api/chat', {
          method: 'POST',
          body: JSON.stringify({ message, sessionId: this.sessionId })
        });
        const data = await response.json();
        return data.reply;
      }
    });
  },
  beforeUnmount() {
    if (this.widget) {
      this.widget.destroy();
    }
  }
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  height: 600px;
}
</style>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chatbot</title>
  <style>
    #chat-container {
      max-width: 800px;
      height: 600px;
      margin: 50px auto;
    }
  </style>
</head>
<body>
  <div id="chat-container"></div>
  
  <script type="module">
    import { ChatbotWidget } from './chatbot-widget.js';
    
    new ChatbotWidget({
      target: '#chat-container',
      layout: 'inline',
      theme: 'auto', // Matches system preference
      onMessage: async (message) => {
        const response = await fetch('https://api.example.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.reply;
      }
    });
  </script>
</body>
</html>
```

---

## Theming & Customization

### Preset Themes

Choose from built-in themes:

```javascript
new ChatbotWidget({
  theme: 'light',  // 'light', 'dark', or 'auto'
  target: '#chat'
});
```

### Quick Theme Overrides

Override common properties:

```javascript
new ChatbotWidget({
  theme: 'dark',
  themeOverrides: {
    primaryColor: '#FF6B6B',           // Brand color
    fontFamily: 'Inter, sans-serif',   // Custom font
    borderRadius: '16px',              // Rounded corners
    shadow: '0 8px 32px rgba(0,0,0,0.2)' // Custom shadow
  }
});
```

### Component-Level Styling

Customize individual components:

```javascript
new ChatbotWidget({
  theme: 'dark',
  componentStyles: {
    header: {
      backgroundColor: '#1F2937',
      textColor: '#F9FAFB',
      padding: '20px'
    },
    messages: {
      botBubbleBackground: '#374151',
      userBubbleBackground: '#3B82F6',
      spacing: '20px',
      borderRadius: '18px'
    },
    input: {
      backgroundColor: '#1F2937',
      borderColor: '#4B5563'
    }
  }
});
```

### Custom CSS

For complete control, inject custom CSS:

```javascript
new ChatbotWidget({
  theme: 'dark',
  customStyles: `
    .chatbot-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .chatbot-message.user .chatbot-message-bubble {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .chatbot-btn-send:hover {
      transform: scale(1.1);
    }
  `
});
```

**Import CSS from file (Vite/Webpack):**

```javascript
import customStyles from './chatbot-theme.css?inline';

new ChatbotWidget({
  theme: 'dark',
  customStyles: customStyles
});
```

---

## Layout Modes

### Inline Layout (Default)

Part of the page flow, no z-index, integrates naturally:

```javascript
new ChatbotWidget({
  layout: 'inline',
  target: '#chat-container',
  width: '100%',
  height: '600px'
});
```

### Bubble Layout

Floating chat button in the corner:

```javascript
new ChatbotWidget({
  layout: 'bubble',
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left'
  autoOpen: false // Opens when user clicks the bubble
});
```

### Fullscreen Layout

Covers the entire viewport:

```javascript
new ChatbotWidget({
  layout: 'fullscreen',
  autoOpen: false
});
```

### Modal Layout

Centered popup with backdrop - perfect for focused conversations:

```javascript
new ChatbotWidget({
  layout: 'modal',
  target: 'body',
  width: '1200px',
  height: '800px',
  autoOpen: false // Opens when you call widget.open()
});

// Open the modal programmatically
widget.open();
```

**Modal Features:**
- Centered modal with dark backdrop
- Close on backdrop click or × button
- Configurable size (width/height)
- Mobile responsive (becomes fullscreen on mobile)
- Smooth slide-in animation

### Embedded Layout

Fixed within a container:

```javascript
new ChatbotWidget({
  layout: 'embedded',
  target: '#sidebar-chat',
  width: '350px',
  height: '500px'
});
```

---

## Configuration Options

### Complete API Reference

```javascript
const widget = await ChatbotWidget.Init({
  // Required
  target: '#chat-container',        // CSS selector or HTMLElement
  sessionID: 'user-123',           // Required for API integration
  
  // Layout
  layout: 'inline',                 // 'inline' | 'bubble' | 'fullscreen' | 'embedded' | 'modal'
  width: '100%',                    // CSS width (for modal: '800px', '1200px', etc.)
  height: '600px',                  // CSS height (for modal: '600px', '800px', etc.)
  position: 'bottom-right',         // For bubble layout
  
  // Theme
  theme: 'dark',                    // 'light' | 'dark' | 'auto'
  themeOverrides: {},               // Quick theme customization
  componentStyles: {},              // Component-level styling
  customStyles: '',                 // Custom CSS string
  
  // Display
  autoOpen: true,                   // Auto-open on load
  showToggle: true,                 // Show toggle button (bubble only)
  showGreeting: true,               // Show welcome message
  greeting: 'Hi! How can I help?',  // Welcome message text
  placeholder: 'Type a message...',  // Input placeholder
  
  // Avatars
  avatar: {
    bot: '/bot-avatar.jpg',
    user: '/user-avatar.jpg'
  },
  
  // API Configuration
  apiConfig: {
    baseURL: 'http://localhost:8000/api/v1',  // Your API base URL
    teamName: 'BPJS-TEST',                    // Team name for API calls
    version: '1.0.0',                        // API version
    timeout: 100000,                         // Request timeout (ms)
    headers: {
      'Content-Type': 'application/json',
      // Add custom headers here
    }
  },
  
  // API Integration (Built-in)
  // - Automatic message sending via /chat/query
  // - Chat history loading via /chat/history
  // - Session management
  // - Markdown rendering
  // - Loading indicators
  
  // Optional Callbacks
  onOpen: () => {},                 // Widget opened
  onClose: () => {}                 // Widget closed
});
```

### API Configuration Properties

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `baseURL` | string | Yes | API base URL | `'http://localhost:8000/api/v1'` |
| `teamName` | string | Yes | Team name for API calls | `'BPJS-TEST'` |
| `version` | string | Yes | API version | `'1.0.0'` |
| `timeout` | number | No | Request timeout in ms | `100000` |
| `headers` | object | No | Custom headers | `{ 'Authorization': 'Bearer token' }` |

### Available Theme Override Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `primaryColor` | string | Primary brand color | `#3B82F6` |
| `secondaryColor` | string | Secondary accent | `#6366F1` |
| `accentColor` | string | Tertiary accent | `#8B5CF6` |
| `fontFamily` | string | Font family | `'Poppins, sans-serif'` |
| `fontSize` | string | Base font size | `'14px'` |
| `borderRadius` | string | Border radius | `'12px'` |
| `shadow` | string | Box shadow | `'0 4px 12px rgba(0,0,0,0.1)'` |

### Component Style Properties

**Header:**
- `backgroundColor`, `textColor`, `statusColor`, `borderColor`, `avatarSize`, `padding`

**Messages:**
- `botBubbleBackground`, `userBubbleBackground`, `botTextColor`, `userTextColor`
- `timestampColor`, `spacing`, `maxWidth`, `borderRadius`, `avatarSize`

**Input:**
- `backgroundColor`, `textColor`, `borderColor`, `placeholderColor`
- `buttonBackground`, `buttonColor`, `padding`

**Layout:**
- `borderRadius`, `shadow`, `spacing`, `fontFamily`, `fontSize`

---

## Architecture

### Component Structure

```
ChatbotWidget (Main Class)
├── ChatToggle (Bubble layout only)
├── ChatWindow
│   ├── Header (Avatar, name, controls)
│   ├── MessageList
│   │   └── Message[] (Individual bubbles)
│   └── InputBox (Input + send button)
└── Styles (Shadow DOM isolated)
```

### Directory Structure

```
src/
├── index.js                # Main entry point & exports
├── main.js                 # Example usage & theme config
├── api/
│   └── api.js              # HTTP client & ChatAPI class
├── utils/
│   └── markdown.js         # Markdown rendering utilities
└── chatbot/
    ├── widget.js           # Main ChatbotWidget class
    ├── components/
    │   ├── ChatToggle.js   # Toggle button
    │   ├── ChatWindow.js   # Window container
    │   ├── Header.js       # Header component
    │   ├── Message.js      # Message bubble
    │   ├── InputBox.js     # Input field
    │   └── LoadingIndicator.js # Typing animation
    └── styles/
        ├── base.js         # CSS variables
        ├── themes.js       # Theme presets
        ├── layouts.js      # Layout styles
        ├── header.js       # Header styles
        ├── messages.js     # Message styles
        └── input.js        # Input styles
```

### Key Features

- **Embedded API Integration** - Built-in HTTP client with session management
- **Async Initialization** - `ChatbotWidget.Init()` factory method for async setup
- **Markdown Rendering** - Automatic conversion using `marked` library
- **Loading Indicators** - Typing animations during API calls
- **Shadow DOM** - Complete style isolation from host page
- **Modular Components** - Each component is self-contained
- **CSS Variables** - All styles use CSS custom properties
- **Theme System** - Multiple levels of customization
- **Event-Driven** - Clean callback architecture

---

## Advanced Examples

### Example 1: Corporate Theme with Custom API

```javascript
const widget = await ChatbotWidget.Init({
  target: '#chat-container',
  sessionID: 'corporate-user-123',
  theme: 'light',
  
  // Custom API configuration
  apiConfig: {
    baseURL: 'https://api.mycompany.com/v1',
    teamName: 'CORPORATE-SUPPORT',
    version: '2.1.0',
    timeout: 30000,
    headers: {
      'Authorization': 'Bearer your-api-token',
      'X-Company-ID': '12345'
    }
  },
  
  themeOverrides: {
    primaryColor: '#0066CC',
    fontFamily: 'Arial, sans-serif'
  },
  componentStyles: {
    header: {
      backgroundColor: '#0066CC',
      textColor: '#FFFFFF'
    },
    messages: {
      userBubbleBackground: '#0066CC',
      botBubbleBackground: '#F0F4F8'
    }
  }
});
```

### Example 2: Glassmorphism

```javascript
new ChatbotWidget({
  theme: 'dark',
  customStyles: `
    .chatbot-window {
      background: rgba(31, 41, 55, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .chatbot-header {
      background: rgba(55, 65, 81, 0.6);
      backdrop-filter: blur(10px);
    }
    
    .chatbot-message.bot .chatbot-message-bubble {
      background: rgba(55, 65, 81, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `
});
```

### Example 3: With Chat History

```javascript
async function loadChatHistory(sessionId) {
  const response = await fetch(`/api/chat/history/${sessionId}`);
  const data = await response.json();
  
  return data.messages.map(msg => ({
    text: msg.content,
    sender: msg.role === 'user' ? 'user' : 'bot',
    timestamp: new Date(msg.timestamp)
  }));
}

const history = await loadChatHistory('session-123');

new ChatbotWidget({
  target: '#chat',
  layout: 'inline',
  initialMessages: history,
  showGreeting: history.length === 0,
  onMessage: async (message) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId: 'session-123' })
    });
    const data = await response.json();
    return data.reply;
  }
});
```

### Example 4: With Markdown Support

```javascript
import { markdownToHtml } from './utils/markdown.js';

new ChatbotWidget({
  target: '#chat',
  onMessage: async (message) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    
    // Convert markdown to HTML
    const htmlContent = markdownToHtml(data.reply);
    
    return {
      html: htmlContent,
      isHtml: true
    };
  }
});
```

---

## Methods

### `destroy()`

Clean up and remove the widget:

```javascript
const chatbot = new ChatbotWidget({ target: '#chat' });

// Later...
chatbot.destroy();
```

### `open()`

Programmatically open the widget:

```javascript
chatbot.open();
```

**Note:** For modal layout, this shows the centered popup with backdrop. For other layouts, it shows the chat window.

### `close()`

Programmatically close the widget:

```javascript
chatbot.close();
```

**Note:** For modal layout, this hides the popup and backdrop. Inline layout cannot be closed.

### `addMessage()`

Manually add a message:

```javascript
chatbot.addMessage({
  text: 'Hello!',
  sender: 'bot',
  timestamp: new Date()
});
```

---

## Responsive Design

The widget is fully responsive and works on all screen sizes:

- **Desktop:** Full-featured chat interface
- **Tablet:** Optimized touch interactions
- **Mobile:** 
  - Bubble layout becomes fullscreen
  - Touch-friendly UI
  - Optimized keyboard handling

---

## Best Practices

1. **Start Simple** - Use preset themes, then customize
2. **Progressive Enhancement** - Layer customizations (theme → overrides → component styles → custom CSS)
3. **Accessibility** - Ensure sufficient color contrast
4. **Performance** - Lazy load chat history if large
5. **Error Handling** - Always handle API errors gracefully
6. **Session Management** - Track user sessions for continuity
7. **Testing** - Test in both light and dark modes if using `auto`

---

## Debugging

### Inspect Shadow DOM

Open browser DevTools → Elements → Find your chatbot container → Expand #shadow-root

### Check Console Logs

The widget logs important events to the console during development.

### CSS Variables

Inspect CSS variables in DevTools:
```css
:host {
  --primary-color: #3B82F6;
  --bg-primary: #1F2937;
  /* ... */
}
```

---

## Build for Production

```bash
npm run build
```

Output:
- `dist/chatbot-widget.js` - ES Module
- `dist/chatbot-widget.umd.cjs` - UMD for legacy browsers

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

MIT License - feel free to use in your projects!

---

## Features Roadmap

- [ ] TypeScript definitions
- [ ] Voice message support
- [ ] File upload capability
- [ ] Emoji picker
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Multi-language support
- [ ] Additional preset themes

---

## Support

Need help? Have questions?

- Open an issue on GitHub
- Check existing issues and discussions
- Read the documentation carefully

---

**Built with care using vanilla JavaScript**
