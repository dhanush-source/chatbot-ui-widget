# Chatbot Widget Integration Guide

## 🎯 Integration Approaches

### Option 1: Inline Integration (Recommended for React/Next.js)

The chatbot renders as part of your page layout, like any other component.

#### React Component Example

```jsx
// components/Chatbot.jsx
import { useEffect, useRef } from 'react';

export default function Chatbot({ sessionId = 'default-session', className = '' }) {
  const chatContainerRef = useRef(null);
  const chatbotInstance = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current && !chatbotInstance.current) {
      // Load the chatbot script
      const script = document.createElement('script');
      script.src = '/chatbot-widget.js'; // Or from CDN
      script.onload = () => {
        chatbotInstance.current = new window.ChatbotWidget({
          layout: 'inline',           // Inline = part of page flow
          target: chatContainerRef.current,
          width: '100%',
          height: '100%',
          autoOpen: true,
          showToggle: false,         // No toggle button for inline
          sessionId: sessionId,
          onMessage: async (text) => {
            // Your API logic
            return `Echo: ${text}`;
          }
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      if (chatbotInstance.current) {
        chatbotInstance.current.destroy();
      }
    };
  }, [sessionId]);

  return (
    <div 
      ref={chatContainerRef} 
      className={className}
      style={{ 
        width: '100%', 
        height: '600px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    />
  );
}
```

#### Usage in Your Page

```jsx
// app/chat/page.jsx (Next.js)
import Chatbot from '@/components/Chatbot';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Support</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h2>FAQs</h2>
            {/* Your FAQ content */}
          </div>
        </aside>

        {/* Chatbot takes up space like any other div */}
        <main className="lg:col-span-2">
          <Chatbot 
            sessionId="user-123" 
            className="bg-white rounded shadow"
          />
        </main>
      </div>
    </div>
  );
}
```

---

### Option 2: Modal/Overlay Integration

The chatbot appears on top of your page (current implementation).

```jsx
// components/ChatbotModal.jsx
import { useState, useEffect, useRef } from 'react';

export default function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotInstance = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/chatbot-widget.js';
    script.onload = () => {
      chatbotInstance.current = new window.ChatbotWidget({
        layout: 'bubble',          // Floating bubble
        position: 'bottom-right',
        autoOpen: false,
        onClose: () => setIsOpen(false)
      });
    };
    document.body.appendChild(script);

    return () => chatbotInstance.current?.destroy();
  }, []);

  return (
    <button 
      onClick={() => chatbotInstance.current?.open()}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full"
    >
      💬 Chat
    </button>
  );
}
```

---

### Option 3: Sidebar Integration

```jsx
// layouts/DashboardLayout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Chatbot in sidebar */}
      <aside className="w-96 border-l">
        <Chatbot className="h-full" />
      </aside>
    </div>
  );
}
```

---

## 🔧 Configuration for Different Layouts

### Inline Layout (Part of Page)
```javascript
new ChatbotWidget({
  layout: 'inline',
  target: '#chat-container',  // Specific div
  width: '100%',              // Takes container width
  height: '100%',             // Takes container height
  autoOpen: true,             // Always visible
  showToggle: false,          // No toggle button
})
```

### Bubble Layout (Floating)
```javascript
new ChatbotWidget({
  layout: 'bubble',
  position: 'bottom-right',   // Where to float
  width: '380px',
  height: '500px',
  autoOpen: false,            // Click to open
  showToggle: true,           // Show toggle button
})
```

### Fullscreen Layout (Overlay)
```javascript
new ChatbotWidget({
  layout: 'fullscreen',
  autoOpen: false,
  // No width/height needed
})
```

---

## 📦 NPM Package Setup

If you want to publish this as an npm package:

### 1. Update package.json

```json
{
  "name": "@yourcompany/chatbot-widget",
  "version": "1.0.0",
  "main": "dist/chatbot-widget.umd.cjs",
  "module": "dist/chatbot-widget.js",
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/chatbot-widget.js",
      "require": "./dist/chatbot-widget.umd.cjs"
    }
  }
}
```

### 2. Install in Your Project

```bash
npm install @yourcompany/chatbot-widget
```

### 3. Use in React/Next.js

```jsx
import { useEffect, useRef } from 'react';
import ChatbotWidget from '@yourcompany/chatbot-widget';

export default function Chat() {
  const containerRef = useRef(null);

  useEffect(() => {
    const chatbot = new ChatbotWidget({
      layout: 'inline',
      target: containerRef.current
    });

    return () => chatbot.destroy();
  }, []);

  return <div ref={containerRef} className="h-[600px]" />;
}
```

---

## 🎨 Styling with Tailwind/CSS

Since the chatbot uses Shadow DOM, your Tailwind/CSS won't affect it. But you can:

1. **Style the container:**
```jsx
<div 
  ref={containerRef} 
  className="rounded-lg shadow-xl border border-gray-200"
/>
```

2. **Pass theme config:**
```javascript
new ChatbotWidget({
  theme: 'dark',
  primaryColor: '#3B82F6',  // Match your brand
})
```

---

## ✅ Best Practices

1. **Inline for dedicated chat pages** - `/chat`, `/support`
2. **Bubble for adding to existing pages** - Homepage, product pages
3. **Fullscreen for mobile** - Better mobile experience
4. **Lazy load** - Only load when needed

---

## 🚀 Example: Full Next.js App

```jsx
// app/support/page.jsx
'use client';
import Chatbot from '@/components/Chatbot';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-4 py-3">
        <h1>Customer Support</h1>
      </nav>

      <main className="container mx-auto p-4 mt-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
          <Chatbot sessionId="support-123" />
        </div>
      </main>
    </div>
  );
}
```

This gives you a **professional, native-looking chatbot** that integrates seamlessly with your React/Next.js app! 🎉

