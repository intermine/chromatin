import { Theme, ThemeColorName, ThemePaletteColor } from './create'
import { isProdEnv } from '../../utils'
import { isThemeColorName } from './validate'
import { isThemePaletteColorKey } from '.'
import { isBasicColorKey } from '..'

export type ColorAndKeyTuple = [
    ThemeColorName | 'custom',
    keyof ThemePaletteColor | 'black' | 'white',
    (keyof ThemePaletteColor)?
]

export const getColorNameAndKey = (
    color: string,
    theme?: Theme
): ColorAndKeyTuple | undefined => {
    if (typeof color !== 'string') {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - getColorNameAndKey]: Expecting '.concat(
                    'color as string. Got: ',
                    typeof color
                )
            )
        }
        return
    }

    /**
     * Default key is 'main'
     */
    const [colorName, key = 'main', _ = 'main'] = color.split('.')

    if (colorName === undefined) {
        return
    }

    if (colorName === 'custom') {
        /**
         * it should be something like custom.abc.90
         *
         * TODO: fix typing.
         */
        return [key, _] as unknown as ColorAndKeyTuple
    }

    if (color)
        if (colorName === 'common') {
            /**
             * Special case for common color palette.
             * Currently common palette has only two colors,
             * i.e., black and white.
             */
            if (key === 'black' || key === 'white') {
                return [colorName, key] as ColorAndKeyTuple
            }
            return
        }

    if (isThemeColorName(colorName, theme) && isThemePaletteColorKey(key)) {
        if (colorName === 'darkGrey' || colorName === 'grey') {
            if (key === 'main') {
                return [colorName, 50]
            }
            /**
             * For grey and darkGrey only numbered index is supported.
             */
            if (Number.isNaN(Number(key))) {
                return
            }
        }

        return [colorName, key]
    }
}

export const getThemeColorUsingKey = (
    colorTuple: ColorAndKeyTuple,
    theme: Theme
): string => {
    if (!Array.isArray(colorTuple)) {
        if (!isProdEnv()) {
            console.error(
                '[Chromatin - getThemeColorUsingKey]: Expecting'.concat(
                    'colorTuple but Got:  ',
                    typeof colorTuple
                )
            )
        }
        return ''
    }

    const [color, key, _ = 'main'] = colorTuple

    if (color === 'custom') {
        try {
            return theme.palette.custom[key][_]
        } catch {
            if (!isProdEnv()) {
                console.error(
                    '[Chromatin - getThemeColorUsingKey]: Custom color '.concat(
                        'is not defined. theme.palette.custom.',
                        key.toString(),
                        '.',
                        _.toString(),
                        ' throw error'
                    )
                )
            }
            return ''
        }
    }

    if (color === 'common') {
        if (key === 'black' || key === 'white') {
            return theme.palette.common[key]
        }

        if (!isProdEnv()) {
            console.error(
                '[Chromatin - getThemeColorUsingKey]: Color is '.concat(
                    'common. But key is not satisfying the condition. ',
                    'It should be "black" or "white". Key: ',
                    key.toString()
                )
            )
        }
        return ''
    }

    if (key !== 'black' && key !== 'white') {
        if (color === 'grey' || color === 'darkGrey') {
            if (isBasicColorKey(key)) {
                return theme.palette[color][key]
            }

            if (!isProdEnv()) {
                console.error(
                    '[Chromatin - getThemeColorUsingKey]: Color is '.concat(
                        'a basic color. But key is not satisfying condition',
                        'of basic color key. Key: ',
                        key
                    )
                )
            }

            return ''
        }
        return theme.palette[color][key]
    }

    if (!isProdEnv()) {
        console.error(
            '[Chromatin - getThemeColorUsingKey]: Color is '.concat(
                ' not common. But key is either',
                '"black" or "white". This is not allowed. Key: ',
                key
            )
        )
    }

    return ''
}
