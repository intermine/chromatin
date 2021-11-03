import { mergeDeep } from '../../../utils'
import {
    namedTypographyScales as scales,
    defaultThemeTypography,
    defaultBoldFontWeight,
    defaultFontFamily,
    defaultLightFontWeight,
    defaultLineHeight,
    defaultRegularFontWeight,
    fontMixin,
    getFontSizeInRem,
} from '../../typography'

import type { CreateThemeTypographyOptions, ThemeTypography } from './create'

export const createThemeTypography = (
    options = {} as CreateThemeTypographyOptions
): ThemeTypography => {
    if (typeof options !== 'function' && typeof options !== 'object') {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[Chromatin - createTypography]: Expecting options as'.concat(
                    ' an object or a function. Got',
                    typeof options
                )
            )
        }
        return defaultThemeTypography
    }

    if (typeof options === 'function') return options()

    const {
        documentFontSize = 16,
        font: _font = {},
        scale: scaleInput = 'perfectForth',
    } = options

    const scale =
        typeof scaleInput === 'number'
            ? scaleInput
            : scales[scaleInput] ?? scales['perfectForth']

    const _default = {
        name: _font.default?.name ?? defaultFontFamily,
        lineHeight: _font.default?.lineHeight ?? defaultLineHeight,
    }
    const font = mergeDeep(
        {
            bold: {
                name: _default.name,
                weight: defaultBoldFontWeight,
                lineHeight: _default.lineHeight,
            },
            regular: {
                name: _default.name,
                weight: defaultRegularFontWeight,
                lineHeight: _default.lineHeight,
            },
            light: {
                name: _default.name,
                weight: defaultLightFontWeight,
                lineHeight: _default.lineHeight,
            },
        },
        _font
    )

    const { bold, regular, light } = font

    return {
        h1: fontMixin(
            bold.name,
            getFontSizeInRem(scale, 3),
            bold.weight,
            bold.lineHeight
        ),
        h2: fontMixin(
            bold.name,
            getFontSizeInRem(scale, 2),
            bold.weight,
            bold.lineHeight
        ),
        h3: fontMixin(
            bold.name,
            getFontSizeInRem(scale, 1),
            bold.weight,
            bold.lineHeight
        ),
        h4: fontMixin(
            bold.name,
            getFontSizeInRem(scale, 0),
            bold.weight,
            bold.lineHeight
        ),
        h5: fontMixin(
            bold.name,
            getFontSizeInRem(scale, -1),
            bold.weight,
            bold.lineHeight
        ),
        h6: fontMixin(
            bold.name,
            getFontSizeInRem(scale, -2),
            bold.weight,
            bold.lineHeight
        ),
        bodyLg: fontMixin(
            regular.name,
            getFontSizeInRem(scale, 1),
            regular.weight,
            regular.lineHeight
        ),
        body: fontMixin(
            regular.name,
            getFontSizeInRem(scale, 0),
            regular.weight,
            regular.lineHeight
        ),
        bodySm: fontMixin(
            regular.name,
            getFontSizeInRem(scale, -1),
            regular.weight,
            regular.lineHeight
        ),
        title: fontMixin(
            bold.name,
            getFontSizeInRem(scale, 0),
            bold.weight,
            bold.lineHeight
        ),
        caption: fontMixin(
            bold.name,
            getFontSizeInRem(scale, -1),
            bold.weight,
            bold.lineHeight
        ),
        small: fontMixin(
            light.name,
            getFontSizeInRem(scale, -2),
            light.weight,
            light.lineHeight
        ),
        meta: {
            documentFontSize,
        },
    }
}
