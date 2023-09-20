import { useState, ReactNode } from 'react'
import '../styles/theme.css'
import Draggable from 'react-draggable'

interface ThemeProps {
  children: ReactNode
}

const Theme = (props: ThemeProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Draggable>
      <div className={`theme ${theme}`}>
        <button onClick={toggleTheme}>🌙</button>
        {props.children}
      </div>
    </Draggable>
  )
}

export default Theme
