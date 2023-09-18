import { useState, ReactNode } from 'react'
import './Theme.css' // Import your global styles here

interface ThemeProps {
  children: ReactNode
}

const Theme = (props: ThemeProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`theme ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {props.children}
    </div>
  )
}

export default Theme
