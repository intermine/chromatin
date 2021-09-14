import { mergeDeep } from '../../../utils/misc'
import {
    blue,
    common,
    green,
    purple,
    red,
    yellow,
    darkGrey as darkGreyColor,
    grey as greyColor,
} from '../../colors'
import { createColor, getContrastRatio, ThemeType } from '../../colors/color'
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

const createIndividualPalette = (
    color: CreateThemePaletteOptionsColorType,
    options: CreateIndividualPaletteOptions
): ThemePaletteColor => {
    if (typeof color === 'function') {
        return color()
    }

    const { contrastThreshold } = options

    const basicColor =
        typeof color === 'string'
            ? createColor(color, options)
            : createColor(color.baseColor, color)

    const text =
        getContrastRatio(basicColor[50], common.white) > contrastThreshold
            ? common.white
            : common.black

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
    // TODO: Add condition default color based on theme.
    const {
        primary: primaryProps = green[50],
        secondary: secondaryProps = purple[50],
        error: errorProps = red[50],
        warning: warningProps = yellow[50],
        info: infoProps = blue[50],
        contrastThreshold = 3,
        themeType = 'light',
        grey = greyColor,
        darkGrey = darkGreyColor,
        neutral: neutralProps = themeType === 'light' ? grey[50] : darkGrey[50],
        hover: hoverInput = {},
        focus: focusInput = {},
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

    const hover = mergeDeep(
        { opacity: themeType === 'light' ? 0.06 : 0.1, tintOrShadeFactor: 0.2 },
        hoverInput
    )

    const focus = mergeDeep(
        { borderOpacity: themeType === 'light' ? 0.5 : 0.8 },
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
        neutral,
    }
}
