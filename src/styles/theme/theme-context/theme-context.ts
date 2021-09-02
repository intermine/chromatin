import { createContext } from 'react'

import { createTheme } from '../create'

const ThemeContext = createContext(createTheme())
export default ThemeContext
