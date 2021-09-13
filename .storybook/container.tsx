import * as React from 'react'

import './container.css'
import { ThemeProvider, createTheme } from '../src/styles'

export default ({ story, context }) => {
    const { theme: themeContext } = context.globals

    const [theme, setTheme] = React.useState(
        createTheme({ palette: { themeType: themeContext } })
    )

    React.useEffect(() => {
        setTheme(
            createTheme({
                palette: {
                    themeType: themeContext,
                },
            })
        )
        if (themeContext === 'dark') {
            document.querySelector('.container').classList.add('dark')
        } else {
            document.querySelector('.container').classList.remove('dark')
        }
    }, [themeContext])

    return (
        <div className="container" role="main">
            <div className="component-container with">
                <ThemeProvider theme={theme}>
                    <h1>With ThemeProvider</h1>
                    {story()}
                </ThemeProvider>
            </div>
            <div className="component-container">
                <h1>Without ThemeProvider</h1>
                {story()}
            </div>
        </div>
    )
}
