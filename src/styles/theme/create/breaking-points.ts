import { mergeDeep } from '../../../utils/misc'
import { CreateThemeBreakingPointsOptions, ThemeBreakingPoints } from './create'

export const createBreakingPoints = (
    options: CreateThemeBreakingPointsOptions
): ThemeBreakingPoints => {
    const bp = mergeDeep(
        {
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600,
        },
        options
    ) as CreateThemeBreakingPointsOptions

    const baseFont = bp.baseFontSize ?? 16
    const unit = 'em'

    delete bp.baseFontSize

    const max = (screen: string) =>
        `@media (max-width: ${bp[screen] / baseFont}${unit})`

    const min = (screen: string) =>
        `@media (min-width: ${bp[screen] / baseFont}${unit})`

    const range = (start: string, end: string) =>
        `@media (min-width: ${bp[start]}${unit}) and (max-width: ${
            bp[end] / baseFont
        }${unit})`

    return {
        max,
        min,
        range,
        baseFontSize: baseFont,
        unit,
        keys: Object.keys(bp),
        values: bp,
    }
}
