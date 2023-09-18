import { useState, ReactNode } from 'react'
import '../styles/theme.css'

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
      <button onClick={toggleTheme}>🌙</button>
      {props.children}
    </div>
  )
}

export default Theme
