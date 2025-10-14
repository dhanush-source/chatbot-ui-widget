// Styles index - combines all style modules
import { getBaseStyles } from './base.js';
import { getLayoutStyles } from './layouts.js';
import { headerStyles } from './header.js';
import { messagesStyles } from './messages.js';
import { inputStyles } from './input.js';

// Export theme functions
export { getTheme, watchSystemTheme, lightTheme, darkTheme } from './themes.js';

export const getAllStyles = (config) => {
  return `
    ${getBaseStyles(config)}
    ${getLayoutStyles(config)}
    ${headerStyles}
    ${messagesStyles}
    ${inputStyles}
  `;
};

