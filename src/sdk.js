/**
 * Chatbot UI Widget - SDK Entry Point
 * Minified single-file distribution
 */

import { ChatbotWidget } from './chatbot/widget.js';
import { ChatAPI } from './api/api.js';
import { markdownToHtml, formatText, sanitizeHtml } from './utils/markdown.js';

// Export main classes and utilities
export { ChatbotWidget, ChatAPI, markdownToHtml, formatText, sanitizeHtml };

// Default export for convenience
export default ChatbotWidget;
