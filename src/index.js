/**
 * Chatbot UI Widget - Main Entry Point
 * A modern, customizable, and framework-agnostic chatbot widget
 */

import { ChatbotWidget } from './chatbot/widget.js';
import { ChatAPI } from './api/api.js';
import { markdownToHtml, formatText, sanitizeHtml } from './utils/markdown.js';

// Export main classes and utilities
export { ChatbotWidget, ChatAPI, markdownToHtml, formatText, sanitizeHtml };

// Default export for convenience
export default ChatbotWidget;
