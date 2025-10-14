// Theme presets for the chatbot widget

export const lightTheme = {
  // Color palette
  primaryColor: '#3B82F6',
  secondaryColor: '#6366F1',
  accentColor: '#8B5CF6',
  
  // Background colors
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F9FAFB',
  bgTertiary: '#F3F4F6',
  
  // Text colors
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  
  // UI colors
  borderColor: '#E5E7EB',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  
  // Component-specific
  headerBg: '#F9FAFB',
  headerText: '#1F2937',
  botBubbleBg: '#F3F4F6',
  botBubbleText: '#1F2937',
  userBubbleBg: '#3B82F6',
  userBubbleText: '#FFFFFF',
  inputBg: '#FFFFFF',
  inputBorder: '#E5E7EB',
  inputText: '#1F2937',
  inputPlaceholder: '#9CA3AF',
  
  // Effects
  shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 8px 24px rgba(0, 0, 0, 0.12)'
};

export const darkTheme = {
  // Color palette
  primaryColor: '#3B82F6',
  secondaryColor: '#6366F1',
  accentColor: '#8B5CF6',
  
  // Background colors
  bgPrimary: '#1F2937',
  bgSecondary: '#374151',
  bgTertiary: '#4B5563',
  
  // Text colors
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  
  // UI colors
  borderColor: '#4B5563',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  
  // Component-specific
  headerBg: '#374151',
  headerText: '#F9FAFB',
  botBubbleBg: '#374151',
  botBubbleText: '#F9FAFB',
  userBubbleBg: '#3B82F6',
  userBubbleText: '#FFFFFF',
  inputBg: '#1F2937',
  inputBorder: '#4B5563',
  inputText: '#F9FAFB',
  inputPlaceholder: '#9CA3AF',
  
  // Effects
  shadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  shadowHover: '0 15px 35px rgba(0, 0, 0, 0.4)'
};

/**
 * Get theme by name
 * @param {string} themeName - 'light', 'dark', or 'auto'
 * @returns {object} Theme object
 */
export function getTheme(themeName) {
  if (themeName === 'light') {
    return { ...lightTheme };
  }
  
  if (themeName === 'dark') {
    return { ...darkTheme };
  }
  
  if (themeName === 'auto') {
    // Detect system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? { ...darkTheme } : { ...lightTheme };
    }
    // Fallback to dark if detection not available
    return { ...darkTheme };
  }
  
  // Default to dark theme
  return { ...darkTheme };
}

/**
 * Listen for system theme changes (for auto mode)
 * @param {function} callback - Function to call when theme changes
 * @returns {function} Cleanup function to remove listener
 */
export function watchSystemTheme(callback) {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e) => {
      const newTheme = e.matches ? { ...darkTheme } : { ...lightTheme };
      callback(newTheme);
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }
  
  // No-op cleanup if not supported
  return () => {};
}

