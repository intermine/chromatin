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
        hover: hoverInput = {},
    } = options

    const primary = createIndividualPalette(primaryProps, {
        contrastThreshold,
        themeType,
    })

    const secondary = createIndividualPalette(secondaryProps, {
        contrastThreshold,
        themeType,
    })

    const error = createIndividualPalette(errorProps, {
        contrastThreshold,
        themeType,
    })

    const warning = createIndividualPalette(warningProps, {
        contrastThreshold,
        themeType,
    })

    const info = createIndividualPalette(infoProps, {
        contrastThreshold,
        themeType,
    })

    const hover = mergeDeep(
        { opacity: 0.06, tintOrShadeFactor: 0.2 },
        hoverInput
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
    }
}
