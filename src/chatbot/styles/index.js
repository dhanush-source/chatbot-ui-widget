// Styles index - combines all style modules
import { getBaseStyles } from './base.js';
import { getLayoutStyles } from './layouts.js';
import { headerStyles } from './header.js';
import { messagesStyles } from './messages.js';
import { inputStyles } from './input.js';

export const getAllStyles = (config) => {
  return `
    ${getBaseStyles(config)}
    ${getLayoutStyles(config)}
    ${headerStyles}
    ${messagesStyles}
    ${inputStyles}
  `;
};

