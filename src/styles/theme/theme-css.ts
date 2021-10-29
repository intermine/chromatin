import { CSSObject } from 'styled-components'
import { __DEV__ } from '../../constants/env'
import { Theme } from './create'

export type ThemeCSSStyles = CSSObject | ((theme: Theme) => CSSObject)

export const getThemeCSSObject = (
    styles = {} as ThemeCSSStyles,
    theme?: Theme
): CSSObject => {
    if (typeof styles !== 'object' && typeof styles !== 'function') {
        if (__DEV__) {
            console.error(
                '[Chromatin - themeCSSObject]: Expecting styles as'.concat(
                    ' Object or Function. Got ',
                    typeof styles
                )
            )
        }
        return {}
    }

    if (typeof styles === 'object') return styles

    if (!theme) {
        if (__DEV__) {
            console.error(
                '[Chromatin - themeCSSObject]: If styles is a Function'.concat(
                    ' then theme object is required. '
                )
            )
        }
        return {}
    }

    if (typeof theme !== 'object') {
        if (__DEV__) {
            console.error(
                '[Chromatin - themeCSSObject]: theme is not valid'.concat(
                    ' Expecting theme as an object. Got ',
                    typeof theme
                )
            )
        }
        return {}
    }

    return styles(theme)
}
