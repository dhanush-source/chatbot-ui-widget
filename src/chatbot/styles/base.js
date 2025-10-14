// Base styles and CSS variables
export const getBaseStyles = (config) => {
  const theme = config.processedTheme || {};
  
  // Generate CSS variable declarations from processed theme
  const cssVarDeclarations = Object.entries(theme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');
  
  // Fallback values if processedTheme is not available
  const fallbackVars = `
    --primary-color: ${config.primaryColor || '#3B82F6'};
    --bg-primary: #1F2937;
    --bg-secondary: #374151;
    --bg-tertiary: #4B5563;
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
    --text-muted: #9CA3AF;
    --border-color: #4B5563;
    --shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    --radius: 12px;
    --radius-sm: 8px;
  `;
  
  return `
  :host {
    ${cssVarDeclarations || fallbackVars}
    --font-family: ${theme['--font-family'] || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};
    --font-size: ${theme['--font-size'] || '14px'};
  }

  .chatbot-widget {
    font-family: var(--font-family);
    font-size: var(--font-size);
    line-height: 1.5;
  }

  .chatbot-window {
    background: var(--bg-primary);
    border-radius: var(--radius, 12px);
    box-shadow: var(--shadow);
    display: none;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--border-color);
  }

  .chatbot-window.open {
    display: flex;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
};

