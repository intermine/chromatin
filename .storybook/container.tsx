import * as React from 'react'

import './container.css'
import {
    ThemeProvider,
    createTheme,
    createIndividualPalette
} from '../src/styles'

export default ({ story, context }) => {
    const { theme: themeContext } = context.globals

    const [theme, setTheme] = React.useState(
        createTheme({
            palette: {
                themeType: themeContext,
                other: {
                    link: createIndividualPalette('#005bff', {
                        contrastThreshold: 3,
                        themeType: themeContext
                    })
                }
            }
        })
    )

    React.useEffect(() => {
        setTheme(
            createTheme({
                themeType: themeContext,
                palette: {
                    themeType: themeContext,
                    other: {
                        link: createIndividualPalette('#005bff', {
                            contrastThreshold: 3,
                            themeType: themeContext
                        })
                    }
                }
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
