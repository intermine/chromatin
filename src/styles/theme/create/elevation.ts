/* eslint-disable max-len */
import type { CreateThemeElevationOptions, ThemeElevation } from './create'

export const createThemeElevation = (
    options: CreateThemeElevationOptions
): ThemeElevation => {
    const {
        high: _high,
        medium: _medium,
        low: _low,
        none = '',
        themeType = 'light',
    } = options

    /**
     * Took reference from: https://getcssscan.com/css-box-shadow-examples
     */

    const low =
        _low ?? themeType === 'light'
            ? 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
            : 'rgba(0, 0, 0, 0.3) 0px 1px 3px 0px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px'

    const medium =
        _medium ?? themeType === 'light'
            ? 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
            : 'rgba(0, 0, 0, 0.5) 0px 4px 16px -1px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px'

    const high =
        _high ?? themeType === 'light'
            ? 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
            : 'rgba(0, 0, 0, 0.5) 0px 10px 25px -3px, rgba(0, 0, 0, 0.3) 0px 4px 6px -2px'

    return {
        high,
        low,
        medium,
        none,
        themeType: themeType,
    }
}

/* eslint-enable max-len */
