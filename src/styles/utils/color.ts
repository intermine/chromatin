import { isDevEnv } from '../../utils/misc'
import { isValidColorHex, isColorOrRGBA } from './check'
import { hex2rgba, RGBA } from './convert'

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
 * @param {(RGBA | string)} hex color hex code
 * @param {number} factor must be between 0 and 1
 *
 * @returns {string} hex color code
 */
export const getTintOrShade = (
    color: RGBA | string,
    tint = true,
    factor = 0.1
): string => {
    if (!isColorOrRGBA(color)) {
        if (isDevEnv()) {
            console.error(
                '[getTintOrShade]: color should be a valid hex'.concat(
                    'code or an instance of RGBA class. Got: ',
                    typeof color
                )
            )
        }

        return color
    }

    if (factor > 1 || factor < 0) {
        if (isDevEnv()) {
            console.error(
                '[getTintOrShade] Factor should be between 0 and 1',
                'Got: '.concat(factor.toString())
            )
        }
        return typeof color === 'string' ? color : color.hex
    }

    const rgba = color instanceof RGBA ? color : hex2rgba(color)
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
    mode?: 'dark' | 'light'
}

/**
 * A utility function which is used for creating basic color object.
 *
 * 10-40 will be created using tint factor if mode is light.
 * 60-90 will be created using shade factor if mode is light.
 * 50 will be the color passed to createColor.
 * if mode is dark then 10-40 is shade and 60-90 is tint.
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
    if (!isValidColorHex(baseColor)) {
        if (isDevEnv()) {
            console.error(
                '[createColor]: Expecting baseColor as hex. Got',
                typeof baseColor
            )
        }
        return
    }

    const { tintFactor = 0.1, shadeFactor = 0.1, mode = 'light' } = options
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
        const key = mode === 'light' ? (5 - i) * 10 : (5 + i) * 10
        color[key as keyof BasicColor] = getTintOrShade(
            rgba,
            true,
            i * tintFactor * 2
        )
    }

    for (let i = 1; i <= 4; i += 1) {
        const key = mode === 'light' ? (5 + i) * 10 : (5 - i) * 10
        color[key as keyof BasicColor] = getTintOrShade(
            rgba,
            false,
            shadeFactor * 2 * i
        )
    }

    return color
}

/**
 * To calculate the luminous of the given color.
 *
 * @param {RGBA} color rgba object
 * @returns {number} luminous value
 */
export const getLuminous = (color: RGBA): number => {
    if (!(color instanceof RGBA)) {
        if (isDevEnv()) {
            console.error('[getLuminous]: color is not an instance of RGBA')
        }
        return 0
    }

    const { r, g, b } = color

    // Formula taken from:
    // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure

    const [R, G, B] = [r, g, b].map((v) => {
        const sRGB = v / 255
        return sRGB <= 0.039_28
            ? sRGB / 12.92
            : Math.pow((sRGB + 0.055) / 1.055, 2.4)
    })

    return R * 0.2126 + G * 0.7152 + B * 0.0722
}

/**
 * Check the contrast ratio of two given color
 *
 * @param {(string | RGBA)} color1 color 1 hex value or rgba object
 * @param {(string | RGBA)} color2 color 2 hex value or rgba object
 */
export const getContrastRatio = (
    color1: string | RGBA,
    color2: string | RGBA
): number => {
    if (!isColorOrRGBA(color1)) {
        if (isDevEnv()) {
            console.error(
                '[getContrastRatio]: color1 is not valid.'.concat(
                    ' It should be hex code or an instance of RGBA',
                    ' Got: ',
                    typeof color1
                )
            )
        }

        return -1
    }

    if (!isColorOrRGBA(color2)) {
        if (isDevEnv()) {
            console.error(
                '[getContrastRatio]: color2 is not valid.'.concat(
                    ' It should be hex code or an instance of RGBA',
                    ' Got: ',
                    typeof color2
                )
            )
        }

        return -1
    }

    const c1 = color1 instanceof RGBA ? color1 : hex2rgba(color1)
    const c2 = color2 instanceof RGBA ? color2 : hex2rgba(color2)

    const c1Lux = getLuminous(c1)
    const c2Lux = getLuminous(c2)

    const light = Math.max(c1Lux, c2Lux)
    const dark = Math.min(c1Lux, c2Lux)

    return (light + 0.05) / (dark + 0.05)
}
