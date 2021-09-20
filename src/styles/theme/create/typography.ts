import { isProdEnv, mergeDeep } from '../../../utils/misc'
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
import { CreateThemeTypographyOptions, ThemeTypography } from './create'

export const createTypography = (
    options = {} as CreateThemeTypographyOptions
): ThemeTypography => {
    if (typeof options !== 'function' && typeof options !== 'object') {
        if (!isProdEnv()) {
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
        fontFamily: fontFamilyInput = {},
        scale: scaleInput = 'perfectForth',
    } = options

    const scale =
        typeof scaleInput === 'number'
            ? scaleInput
            : scales[scaleInput] ?? scales['perfectForth']

    const fontFamily = mergeDeep(
        {
            bold: {
                name: defaultFontFamily,
                weight: defaultBoldFontWeight,
                lineHeight: defaultLineHeight,
            },
            regular: {
                name: defaultFontFamily,
                weight: defaultRegularFontWeight,
                lineHeight: defaultLineHeight,
            },
            light: {
                name: defaultFontFamily,
                weight: defaultLightFontWeight,
                lineHeight: defaultLineHeight,
            },
        },
        fontFamilyInput
    )

    return {
        h1: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, 3),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        h2: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, 2),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        h3: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, 1),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        h4: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, 0),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        h5: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, -1),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        h6: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, -2),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        bodyLg: fontMixin(
            fontFamily.regular.name,
            getFontSizeInRem(scale, 1),
            fontFamily.regular.weight,
            fontFamily.regular.lineHeight
        ),
        body: fontMixin(
            fontFamily.regular.name,
            getFontSizeInRem(scale, 0),
            fontFamily.regular.weight,
            fontFamily.regular.lineHeight
        ),
        bodySm: fontMixin(
            fontFamily.regular.name,
            getFontSizeInRem(scale, -1),
            fontFamily.regular.weight,
            fontFamily.regular.lineHeight
        ),
        title: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, 0),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        caption: fontMixin(
            fontFamily.bold.name,
            getFontSizeInRem(scale, -1),
            fontFamily.bold.weight,
            fontFamily.bold.lineHeight
        ),
        small: fontMixin(
            fontFamily.light.name,
            getFontSizeInRem(scale, -2),
            fontFamily.light.weight,
            fontFamily.light.lineHeight
        ),
        meta: {
            documentFontSize,
        },
    }
}
