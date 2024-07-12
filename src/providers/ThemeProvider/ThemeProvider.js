/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ThemeContext, themes } from 'contexts/ThemeContext'
import React from 'react'

const getTheme = () => {
  if (!window?.localStorage?.getItem('theme')) {
    window?.localStorage?.setItem('theme', 'light');
  }
  const theme = `${window?.localStorage?.getItem('theme')}`
  if (Object.values(themes).includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return themes.light

  return themes.dark
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(getTheme)

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
