import { isDevEnv } from '../../utils/misc'
import { isValidColorHex } from './check'

export type RGBAObject = {
    r: number
    g: number
    b: number
    alpha: number
    rgb: string
    rgba: string
    hex: string
}

/**
 * To get array of length 3 representing red, green and blue
 * equivalent of hex.
 *
 * @param hexValue hex colour value without "#".
 * @returns {([number, number, number] | undefined)} [red, green, blue]
 */
export const hex2rgbArray = (hexValue: string): [number, number, number] => {
    if (!isValidColorHex(`#${hexValue}`)) {
        if (isDevEnv()) {
            console.error(
                'Expecting hex value only. Hex without "#"',
                'Got: '.concat(hexValue)
            )
        }

        return [0, 0, 0]
    }

    let hex = hexValue

    if (hexValue.length === 3) {
        hex = hexValue
            .split('')
            .map((v) => v + v)
            .join('')
    }

    return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16),
    ]
}

/**
 * It converts the given hex value to rgb value.
 *
 * @example
 *
 * hex2rgba('#ff0000')
 *
 * output: {
 *  r: 255,
 *  g: 0,
 *  b: 0,
 *  alpha: 1,
 *  rgba: "rgba(255, 0, 0, 1)",
 *  rgb: (255, 0, 0),
 *  hex: '#ff0000'
 * }
 *
 * hex2rgba('#ff0000', 0.4)
 *
 * output: {
 *  r: 255,
 *  g: 0,
 *  b: 0,
 *  alpha: 0.4,
 *  rgba: "rgba(255, 0, 0, 0.4)",
 *  rgb: (255, 0, 0),
 *  hex: '#ff0000'
 * }
 *
 *
 * @param {string} hex any valid hex value
 * @param {number} alpha alpha value. Value must be between 0 and 1.
 *
 * @returns {RGBAObject} rgba object equivalent to the given hex
 */
export const hex2rgba = (hex: string, alpha = 1): RGBAObject => {
    if (!isValidColorHex(hex)) {
        if (isDevEnv()) {
            console.error('[hex2rgba]: Not a valid hex. Given', hex)
        }

        return {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0,
            rgb: '',
            rgba: '',
            hex: '',
        }
    }

    const value = hex.split('#')[1]
    const alphaValue = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
    const [r, g, b] = hex2rgbArray(value)

    return {
        r,
        g,
        b,
        alpha: alphaValue,
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgba: `rgba(${r}, ${g}, ${b}, ${alphaValue})`,
        hex,
    }
}
