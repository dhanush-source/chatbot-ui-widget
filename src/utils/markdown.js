/**
 * Lightweight Markdown to HTML converter
 * Handles common markdown formatting
 */

import { marked } from 'marked';

export function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  return marked(markdown);
}

/**
 * Simple text formatter for basic formatting without full markdown
 */
export function formatText(text) {
  if (!text) return '';
  
  // Just handle line breaks and basic formatting
  return text
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}
