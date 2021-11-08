// reference: https://type-scale.com/
export const namedTypographyScales = {
    minorSecond: 1.067,
    majorSecond: 1.125,
    minorThird: 1.2,
    majorThird: 1.25,
    perfectForth: 1.333,
    augmentedForth: 1414,
    perfectFifth: 1.5,
    goldenRatio: 1.618,
}

export type FontMixinReturn = {
    fontSize: string
    fontFamily: string
    fontWeight: number
    lineHeight: number
}

export const fontMixin = (
    fontFamily: string,
    fontSize: string,
    fontWeight: number,
    lineHeight: number
): FontMixinReturn => ({
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
})

export const defaultFontFamily = 'Arial'
export const defaultBoldFontWeight = 700
export const defaultRegularFontWeight = 500
export const defaultLightFontWeight = 100
export const defaultLineHeight = 1.5

export const defaultThemeTypography = {
    h1: fontMixin(
        defaultFontFamily,
        '4.236rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    h2: fontMixin(
        defaultFontFamily,
        '2.618rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    h3: fontMixin(
        defaultFontFamily,
        '1.618rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    h4: fontMixin(
        defaultFontFamily,
        '1rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    h5: fontMixin(
        defaultFontFamily,
        '0.618rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    h6: fontMixin(
        defaultFontFamily,
        '0.382rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    bodyLg: fontMixin(
        defaultFontFamily,
        '1.618rem',
        defaultRegularFontWeight,
        defaultLineHeight
    ),
    body: fontMixin(
        defaultFontFamily,
        '1rem',
        defaultRegularFontWeight,
        defaultLineHeight
    ),
    bodySm: fontMixin(
        defaultFontFamily,
        '0.618rem',
        defaultRegularFontWeight,
        defaultLineHeight
    ),
    caption: fontMixin(
        defaultFontFamily,
        '0.618rem',
        defaultRegularFontWeight,
        defaultLineHeight
    ),
    title: fontMixin(
        defaultFontFamily,
        '1rem',
        defaultBoldFontWeight,
        defaultLineHeight
    ),
    small: fontMixin(
        defaultFontFamily,
        '0.382rem',
        defaultLightFontWeight,
        defaultLineHeight
    ),
    meta: {
        documentFontSize: 16,
    },
}
