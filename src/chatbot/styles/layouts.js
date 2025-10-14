// Layout-specific styles (bubble, inline, fullscreen, embedded)
export const getLayoutStyles = (config) => `
  /* Bubble Layout - Floating widget */
  .chatbot-layout-bubble {
    position: fixed;
    ${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
    ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
    z-index: 1000;
  }

  .chatbot-layout-bubble .chatbot-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 380px;
    height: 500px;
  }

  .chatbot-toggle {
    width: 56px;
    height: 56px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    margin-left: auto;
  }

  .chatbot-toggle:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }

  /* Inline Layout - Part of page flow */
  .chatbot-layout-inline {
    position: relative;
    width: ${config.width};
    height: ${config.height};
    display: block;
  }

  .chatbot-layout-inline .chatbot-window {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex !important;
  }

  /* Embedded Layout */
  .chatbot-layout-embedded {
    position: relative;
    width: ${config.width};
    height: ${config.height};
  }

  .chatbot-layout-embedded .chatbot-window {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }

  /* Fullscreen Layout */
  .chatbot-layout-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
  }

  .chatbot-layout-fullscreen .chatbot-window {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 0;
    border: none;
  }

  /* Mobile responsiveness */
  @media (max-width: 480px) {
    .chatbot-layout-bubble {
      bottom: 10px;
      right: 10px;
      left: 10px;
    }

    .chatbot-layout-bubble .chatbot-window {
      width: 100%;
      height: 80vh;
      bottom: 70px;
      right: 0;
      left: 0;
      border-radius: var(--radius) var(--radius) 0 0;
    }
  }
`;

