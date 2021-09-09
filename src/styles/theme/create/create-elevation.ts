/* eslint-disable max-len */
import { CreateThemeElevationOptions, ThemeElevation } from './create'

export const createElevation = (
    options: CreateThemeElevationOptions
): ThemeElevation => {
    const {
        high: hightInput,
        medium: mediumInput,
        low: lowInput,
        none = '',
        themeType = 'light',
    } = options

    /**
     * Took reference from: https://getcssscan.com/css-box-shadow-examples
     */

    // TODO: Fix dark box shadow. It is currently same as light
    const low =
        lowInput ?? themeType === 'light'
            ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            : 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'

    // TODO: Fix dark box shadow. It is currently same as light
    const medium =
        mediumInput ?? themeType === 'light'
            ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
            : 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'

    // TODO: Fix dark box shadow. It is currently same as light
    const high =
        hightInput ?? themeType === 'light'
            ? 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
            : 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'

    return {
        high,
        low,
        medium,
        none,
        themeType: themeType,
    }
}

/* eslint-enable max-len */
