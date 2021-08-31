import { isDevEnv } from '../../utils/misc'
import { isValidColorHex } from './check'
import { hex2rgba, RGBAObject } from './convert'

export type BasicColor = {
    10: string
    20: string
    30: string
    40: string
    50: string
    60: string
    70: string
    80: string
    90: string
}

/**
 * To get the tint or shade of the given color.
 *
 * @param {(RGBAObject | string)} hex color hex code
 * @param {number} factor tint factor
 *
 * @returns {string} hex color code
 */
export const getTintOrShade = (
    color: RGBAObject | string,
    tint = true,
    factor = 0.1
): string => {
    if (typeof color !== 'object' && typeof color !== 'string') {
        if (isDevEnv()) {
            console.error(
                '[getTint]: color should be a hex string or a RGBAObject',
                'Got: '.concat(typeof color)
            )
        }

        return color
    }

    if (typeof color === 'string' && !isValidColorHex(color)) {
        return color
    }

    const rgba = typeof color === 'object' ? color : hex2rgba(color)
    const { r, g, b } = rgba

    /**
     * intermediate color code (ich)
     */
    const ich = (val: number): string => {
        const c = tint ? val + (255 - val) * factor : val * (1 - factor)
        const h = Math.trunc(c).toString(16)

        return h.length === 1 ? '0' + h : h
    }

    return `#${ich(r)}${ich(g)}${ich(b)}`
}

export type CreateColorOptions = {
    tintFactor?: number
    shadeFactor?: number
}

/**
 * A utility function which is used for creating basic color object.
 *
 * 10-40 will be created using tint factor.
 * 60-90 will be created using shade factor.
 * 50 will be the color passed to createColor.
 *
 * @example
 *  createColor('#23704a')
 *
 *  Output:
 *  {
 *      10: '#d3e2da',
 *      20: '#a7c5b6',
 *      30: '#7ba992',
 *      40: '#4f8c6e',
 *      50: '#23704a',
 *      60: '#1c593b',
 *      70: '#15432c',
 *      80: '#0d2c1d',
 *      90: '#06160e',
 *   }
 *
 * @param {string} baseColor any valid hex color value
 * @returns {BasicColor} basic color object
 */
export const createColor = (
    baseColor: string,
    options = {} as CreateColorOptions
): BasicColor | undefined => {
    if (isValidColorHex(baseColor)) {
        if (isDevEnv()) {
            console.error(
                '[createColor]: Expecting baseColor as hex. Got',
                typeof baseColor
            )
            return
        }
    }

    const { tintFactor = 0.1, shadeFactor = 0.1 } = options
    const rgba = hex2rgba(baseColor)

    const color: BasicColor = {
        10: '',
        20: '',
        30: '',
        40: '',
        50: baseColor,
        60: '',
        70: '',
        80: '',
        90: '',
    }

    for (let i = 1; i <= 4; i += 1) {
        color[((5 - i) * 10) as keyof BasicColor] = getTintOrShade(
            rgba,
            true,
            i * tintFactor * 2
        )
    }

    for (let i = 6; i < 10; i += 1) {
        color[(i * 10) as keyof BasicColor] = getTintOrShade(
            rgba,
            false,
            shadeFactor * 2 * (i - 5)
        )
    }

    return color
}
