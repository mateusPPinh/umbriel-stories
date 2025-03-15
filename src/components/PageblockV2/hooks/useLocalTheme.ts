import { useState } from 'react';

export const useLocalTheme = (initialTheme = false) => {
  const [theme, setTheme] = useState(initialTheme);

  return {
    theme,
    toggleTheme: () => setTheme(!theme)
  };
}; 