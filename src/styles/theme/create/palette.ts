import { mergeDeep } from '../../../utils/misc'
import {
    blue,
    common,
    green,
    purple,
    red,
    yellow,
    lightGreen,
    darkGrey as darkGreyColor,
    grey as greyColor,
    orange,
    themeTernaryOperator as tto,
} from '../../colors'
import { createColor, getContrastRatio, ThemeType } from '../../colors'
import {
    CreateThemePaletteOptions,
    CreateThemePaletteOptionsColorType,
    ThemePalette,
    ThemePaletteColor,
} from './create'

type CreateIndividualPaletteOptions = {
    contrastThreshold: number
    themeType: ThemeType
}

const { white, black } = common

const createIndividualPalette = (
    color: CreateThemePaletteOptionsColorType,
    options: CreateIndividualPaletteOptions
): ThemePaletteColor => {
    if (typeof color === 'function') {
        return color()
    }

    const { contrastThreshold, themeType } = options

    const basicColor =
        typeof color === 'string'
            ? createColor(color, options)
            : createColor(color.baseColor, color)

    const textColorFirstPref = tto(themeType, white, black)
    const textColorSecondPref = tto(themeType, black, white)

    const text =
        getContrastRatio(basicColor[50], textColorFirstPref) > contrastThreshold
            ? textColorFirstPref
            : textColorSecondPref

    return {
        ...basicColor,
        main: basicColor[50],
        mainDarkShade: basicColor[60],
        mainLightShade: basicColor[40],
        text,
    }
}

export const createPalette = (
    options = {} as CreateThemePaletteOptions
): ThemePalette => {
    const {
        themeType = 'light',
        contrastThreshold = 3,
        grey = greyColor,
        darkGrey = darkGreyColor,
        primary: primaryProps = tto(themeType, green[50], lightGreen[50]),
        secondary: secondaryProps = tto(themeType, purple[50], purple[30]),
        error: errorProps = tto(themeType, red[60], red[40]),
        warning: warningProps = tto(themeType, orange[50], yellow[50]),
        info: infoProps = tto(themeType, blue[60], blue[40]),
        neutral: neutralProps = tto(themeType, grey[20], darkGrey[30]),
        disable: disableProps = tto(themeType, grey[50], darkGrey[50]),
        hover: hoverInput = {},
        focus: focusInput = {},
        active: activeInput = {},
    } = options

    const individualPaletteOptions = { contrastThreshold, themeType }
    const primary = createIndividualPalette(
        primaryProps,
        individualPaletteOptions
    )

    const secondary = createIndividualPalette(
        secondaryProps,
        individualPaletteOptions
    )

    const error = createIndividualPalette(errorProps, individualPaletteOptions)

    const warning = createIndividualPalette(
        warningProps,
        individualPaletteOptions
    )

    const info = createIndividualPalette(infoProps, individualPaletteOptions)

    const neutral = createIndividualPalette(
        neutralProps,
        individualPaletteOptions
    )

    const disable = createIndividualPalette(
        disableProps,
        individualPaletteOptions
    )

    const hover = mergeDeep(
        {
            ghostElementBackgroundOpacity: themeType === 'light' ? 0.06 : 0.1,
            unknownColorOpacity: 0.7,
            tintOrShadeFactor: 0.2,
        },
        hoverInput
    )

    const active = mergeDeep(
        {
            ghostElementBackgroundOpacity: themeType === 'light' ? 0.2 : 0.3,
            tintOrShadeFactor: 0.2,
            unknownColorOpacity: 1,
        },
        activeInput
    )

    const focus = mergeDeep(
        {
            borderOpacity: themeType === 'light' ? 0.5 : 0.8,
            unknownColorBorderOpacity: 0.65,
        },
        focusInput
    )

    return {
        primary,
        error,
        info,
        secondary,
        warning,
        common,
        contrastThreshold,
        themeType,
        grey,
        darkGrey,
        hover,
        focus,
        active,
        neutral,
        disable,
        recommendedThemeBackground: {
            light: '#ffffff',
            dark: '#121212',
        },
    }
}
