// Header component styles
export const headerStyles = `
  .chatbot-header {
    background: var(--bg-secondary);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
  }

  .chatbot-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chatbot-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--primary-color);
  }

  .chatbot-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .chatbot-name {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  .chatbot-status {
    font-size: 12px;
    color: var(--text-muted);
  }

  .chatbot-header-actions {
    display: flex;
    gap: 8px;
  }

  .chatbot-btn-minimize {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .chatbot-btn-minimize:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
`;

