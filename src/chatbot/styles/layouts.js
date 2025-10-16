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

  /* Modal Layout - Centered popup */
  .chatbot-layout-modal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 9999 !important;
    width: 100vw !important;
    height: 100vh !important;
    display: none; /* Hidden by default */
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    padding: 0 !important;
  }

  .chatbot-layout-modal.open {
    display: flex; /* Show when open */
  }

  .chatbot-modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  .chatbot-layout-modal .chatbot-window {
    position: relative;
    width: ${config.width || '800px'} !important;
    height: ${config.height || '600px'} !important;
    min-width: ${config.width || '800px'};
    min-height: ${config.height || '600px'};
    max-width: 95vw;
    max-height: 95vh;
    background: var(--bg-primary);
    border-radius: var(--radius);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modal-slide-in 0.3s ease-out;
  }

  .chatbot-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    z-index: 10;
  }

  .chatbot-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  @keyframes modal-slide-in {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Mobile responsiveness for modal */
  @media (max-width: 768px) {
    .chatbot-layout-modal .chatbot-window {
      width: 95vw !important;
      height: 90vh !important;
      min-width: 95vw;
      min-height: 90vh;
      max-width: 95vw;
      max-height: 90vh;
    }
  }
`;

