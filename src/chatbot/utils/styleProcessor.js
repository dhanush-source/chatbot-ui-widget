// Style processing utilities for theme customization

/**
 * Process component-level styles into CSS variable mappings
 * @param {object} componentStyles - Component style configuration
 * @returns {object} CSS variable mappings
 */
export function processComponentStyles(componentStyles = {}) {
  const cssVars = {};
  
  // Header component styles
  if (componentStyles.header) {
    const { header } = componentStyles;
    if (header.backgroundColor) cssVars['--header-bg'] = header.backgroundColor;
    if (header.textColor) cssVars['--header-text'] = header.textColor;
    if (header.statusColor) cssVars['--header-status'] = header.statusColor;
    if (header.borderColor) cssVars['--header-border'] = header.borderColor;
    if (header.avatarSize) cssVars['--header-avatar-size'] = header.avatarSize;
    if (header.padding) cssVars['--header-padding'] = header.padding;
  }
  
  // Messages component styles
  if (componentStyles.messages) {
    const { messages } = componentStyles;
    if (messages.botBubbleBackground) cssVars['--bot-bubble-bg'] = messages.botBubbleBackground;
    if (messages.userBubbleBackground) cssVars['--user-bubble-bg'] = messages.userBubbleBackground;
    if (messages.botTextColor) cssVars['--bot-bubble-text'] = messages.botTextColor;
    if (messages.userTextColor) cssVars['--user-bubble-text'] = messages.userTextColor;
    if (messages.timestampColor) cssVars['--message-timestamp'] = messages.timestampColor;
    if (messages.spacing) cssVars['--message-spacing'] = messages.spacing;
    if (messages.maxWidth) cssVars['--message-max-width'] = messages.maxWidth;
    if (messages.borderRadius) cssVars['--message-radius'] = messages.borderRadius;
    if (messages.avatarSize) cssVars['--message-avatar-size'] = messages.avatarSize;
  }
  
  // Input component styles
  if (componentStyles.input) {
    const { input } = componentStyles;
    if (input.backgroundColor) cssVars['--input-bg'] = input.backgroundColor;
    if (input.textColor) cssVars['--input-text'] = input.textColor;
    if (input.borderColor) cssVars['--input-border'] = input.borderColor;
    if (input.placeholderColor) cssVars['--input-placeholder'] = input.placeholderColor;
    if (input.buttonBackground) cssVars['--btn-send-bg'] = input.buttonBackground;
    if (input.buttonColor) cssVars['--btn-send-color'] = input.buttonColor;
    if (input.padding) cssVars['--input-padding'] = input.padding;
  }
  
  // Layout styles
  if (componentStyles.layout) {
    const { layout } = componentStyles;
    if (layout.borderRadius) cssVars['--radius'] = layout.borderRadius;
    if (layout.shadow) cssVars['--shadow'] = layout.shadow;
    if (layout.spacing) cssVars['--spacing'] = layout.spacing;
    if (layout.fontFamily) cssVars['--font-family'] = layout.fontFamily;
    if (layout.fontSize) cssVars['--font-size'] = layout.fontSize;
  }
  
  return cssVars;
}

/**
 * Process theme overrides into CSS variable mappings
 * @param {object} themeOverrides - Theme override configuration
 * @returns {object} CSS variable mappings
 */
export function processThemeOverrides(themeOverrides = {}) {
  const cssVars = {};
  
  // Primary color affects multiple variables
  if (themeOverrides.primaryColor) {
    cssVars['--primary-color'] = themeOverrides.primaryColor;
    cssVars['--user-bubble-bg'] = themeOverrides.primaryColor;
    cssVars['--btn-send-bg'] = themeOverrides.primaryColor;
  }
  
  // Secondary color
  if (themeOverrides.secondaryColor) {
    cssVars['--secondary-color'] = themeOverrides.secondaryColor;
  }
  
  // Accent color
  if (themeOverrides.accentColor) {
    cssVars['--accent-color'] = themeOverrides.accentColor;
  }
  
  // Typography
  if (themeOverrides.fontFamily) {
    cssVars['--font-family'] = themeOverrides.fontFamily;
  }
  
  if (themeOverrides.fontSize) {
    cssVars['--font-size'] = themeOverrides.fontSize;
  }
  
  // Border radius
  if (themeOverrides.borderRadius) {
    cssVars['--radius'] = themeOverrides.borderRadius;
    cssVars['--radius-sm'] = themeOverrides.borderRadius;
  }
  
  // Shadow
  if (themeOverrides.shadow) {
    cssVars['--shadow'] = themeOverrides.shadow;
  }
  
  return cssVars;
}

/**
 * Merge all style configurations in priority order
 * @param {object} baseTheme - Base theme from preset
 * @param {object} componentStyles - Component-level styles
 * @param {object} themeOverrides - Theme overrides
 * @returns {object} Merged CSS variables
 */
export function mergeStyles(baseTheme, componentStyles, themeOverrides) {
  // Start with base theme
  const merged = { ...baseTheme };
  
  // Apply component styles (higher priority)
  const componentVars = processComponentStyles(componentStyles);
  Object.assign(merged, componentVars);
  
  // Apply theme overrides (highest priority)
  const overrideVars = processThemeOverrides(themeOverrides);
  Object.assign(merged, overrideVars);
  
  return merged;
}

/**
 * Convert theme object to CSS variable definitions
 * @param {object} theme - Theme object with color/style values
 * @returns {object} CSS variable object ready for injection
 */
export function themeToCSSVariables(theme) {
  return {
    '--primary-color': theme.primaryColor,
    '--secondary-color': theme.secondaryColor,
    '--accent-color': theme.accentColor,
    
    '--bg-primary': theme.bgPrimary,
    '--bg-secondary': theme.bgSecondary,
    '--bg-tertiary': theme.bgTertiary,
    
    '--text-primary': theme.textPrimary,
    '--text-secondary': theme.textSecondary,
    '--text-muted': theme.textMuted,
    
    '--border-color': theme.borderColor,
    '--shadow-color': theme.shadowColor,
    '--shadow': theme.shadow,
    
    '--header-bg': theme.headerBg,
    '--header-text': theme.headerText,
    
    '--bot-bubble-bg': theme.botBubbleBg,
    '--bot-bubble-text': theme.botBubbleText,
    '--user-bubble-bg': theme.userBubbleBg,
    '--user-bubble-text': theme.userBubbleText,
    
    '--input-bg': theme.inputBg,
    '--input-border': theme.inputBorder,
    '--input-text': theme.inputText,
    '--input-placeholder': theme.inputPlaceholder
  };
}

/**
 * Validate CSS value (basic validation)
 * @param {string} value - CSS value to validate
 * @returns {boolean} Whether the value appears valid
 */
export function isValidCSSValue(value) {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  
  // Very basic validation - just check it's not empty and is a string
  // More sophisticated validation could be added here
  return value.trim().length > 0;
}

