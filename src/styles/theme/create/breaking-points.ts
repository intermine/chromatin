import { CSSObject } from 'styled-components'
import { mergeDeep } from '../../../utils/misc'
import {
    CreateThemeBreakingPointsOptions,
    ThemeBPMixinObj,
    ThemeBreakingPoints,
} from './create'

export const createThemeBreakingPoints = (
    options: CreateThemeBreakingPointsOptions
): ThemeBreakingPoints => {
    const bp = mergeDeep(
        {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600,
        },
        options
    ) as CreateThemeBreakingPointsOptions

    const baseFont = bp.baseFontSize ?? 16
    /**
     * Currently we are only supporting em as
     * the unit for screen width.
     *
     * Also, using em for media query is the best
     * practice. ref: https://zellwk.com/blog/media-query-units/
     *
     */
    const unit = 'em'

    delete bp.baseFontSize

    // TODO: Show error in all env except prod,
    // TODO: if screen bp[screen] is undefined.
    // TODO: This has to be done for all bp functions.

    const max = (screen: string) =>
        `@media (max-width: ${bp[screen] / baseFont}${unit})`

    const min = (screen: string) =>
        `@media (min-width: ${bp[screen] / baseFont}${unit})`

    const between = (start: string, end: string) =>
        `@media (min-width: ${bp[start] / baseFont}${unit}) and (max-width: ${
            bp[end] / baseFont
        }${unit})`

    const mixin = (
        obj: ThemeBPMixinObj,
        mixinFnName: 'min' | 'max' | 'between'
    ): CSSObject => {
        const screens = Object.keys(obj)
        const mixinFn = mixinFnName === 'min' ? min : max

        const cssObj = {} as CSSObject

        for (const screen of screens) {
            const key = mixinFn(screen)
            cssObj[key] = obj[screen]
        }

        return cssObj
    }

    return {
        max,
        min,
        between,
        mixin,
        baseFontSize: baseFont,
        unit,
        keys: Object.keys(bp),
        values: bp,
    }
}
