import { useContext } from 'react';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../../App/App';

export const ThemeToggle = () => {
  const { setTheme, theme } = useContext(ThemeContext)
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div>
      <ReactSwitch
        uncheckedIcon={false}
        checkedIcon={false}
        onColor='#eee'
        onChange={handleThemeToggle}
        checked
      />
    </div>
  )
}
