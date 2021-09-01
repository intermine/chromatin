import { isDevEnv } from '../../utils/misc'
import { RGBAObject } from './convert'

/**
 * To check whether given string is a valid color hex value.
 *
 * @example
 * isValidColorHex('abc') // false. Hex must starts with '#'
 * isValidColorHex('#abc') // true
 * isValidColorHex('#123432') // true
 *
 * @param hex any string
 * @returns {boolean}
 */
export const isValidColorHex = (hex: string): boolean => {
    if (typeof hex !== 'string') {
        return false
    }

    if (hex.length < 4 || hex.length > 7) return false

    const hexRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    return hexRegex.test(hex)
}

export const isColorOrRGBAObject = (color: string | RGBAObject): boolean => {}
