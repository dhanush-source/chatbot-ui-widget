# Chatbot Widget Architecture

This directory contains the modular, component-based chatbot widget implementation.

## Directory Structure

```
src/chatbot/
├── chatbot.js           # Main ChatbotWidget class
├── components/          # UI Components
│   ├── index.js        # Components barrel export
│   ├── ChatToggle.js   # Bubble layout toggle button
│   ├── ChatWindow.js   # Main chat window container
│   ├── Header.js       # Chat header with avatar & controls
│   ├── MessageList.js  # Messages container
│   ├── Message.js      # Individual message bubble
│   └── InputBox.js     # Input field & send button
└── styles/             # Style modules
    ├── index.js        # Styles barrel export
    ├── base.js         # Base styles & CSS variables
    ├── layouts.js      # Layout-specific styles
    ├── header.js       # Header component styles
    ├── messages.js     # Message & MessageList styles
    └── input.js        # InputBox component styles
```

## Component Responsibilities

### ChatbotWidget (`chatbot.js`)
- **Main class** that orchestrates all components
- Manages configuration, state, and lifecycle
- Handles Shadow DOM creation and attachment
- Coordinates event listeners and message flow

### Components

#### ChatToggle
- Renders the floating bubble toggle button
- Only visible in `bubble` layout mode

#### ChatWindow
- Container for the entire chat interface
- Composes Header, MessageList, and InputBox

#### Header
- Displays bot avatar, name, and online status
- Contains minimize button (except in `inline` layout)

#### MessageList
- Container for all chat messages
- Handles scrolling and overflow

#### Message
- Renders individual message bubbles
- Supports both plain text and HTML/markdown content
- Handles user and bot message styling

#### InputBox
- Text input field for user messages
- Send button with icon
- Handles Enter key submission

### Styles

#### base.js
- CSS custom properties (variables)
- Base widget styles
- Common animations

#### layouts.js
- `bubble` - Floating chat widget
- `inline` - Embedded in page flow
- `embedded` - Fixed container
- `fullscreen` - Full viewport overlay

#### header.js, messages.js, input.js
- Component-specific styles
- Scoped to their respective components
- Includes responsive design rules

## Usage

```javascript
import { ChatbotWidget } from './chatbot/chatbot.js';

const chatbot = new ChatbotWidget({
  layout: 'inline',
  target: '#chat-container',
  primaryColor: '#3B82F6',
  onMessage: async (msg) => {
    // Handle message
    return response;
  }
});
```

## Key Features

- **Shadow DOM**: Complete style isolation from host page
- **Modular Components**: Each component is self-contained
- **Separated Concerns**: Styles are separate from logic
- **Easy to Debug**: Clear component boundaries
- **Extensible**: Add new components easily

## Adding a New Component

1. Create component file in `components/`
2. Export the component class
3. Add to `components/index.js`
4. Create corresponding style file in `styles/`
5. Import styles in `styles/index.js`
6. Use component in `ChatbotWidget` or parent component

## Debugging Tips

- Each component has its own file for easy debugging
- Use browser DevTools to inspect Shadow DOM
- Console logs are namespaced by component
- Styles are organized by component for easy inspection

