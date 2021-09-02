import { createContext } from 'react'

import { Theme } from '../create'

const ThemeContext = createContext<Theme | null>(null)
export default ThemeContext
