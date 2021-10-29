import type { BasicColor } from './types'

export const isBasicColorKey = (
    key: number | string
): key is keyof BasicColor => {
    if (
        key == '10' ||
        key == '20' ||
        key == '30' ||
        key == '40' ||
        key == '50' ||
        key == '60' ||
        key == '70' ||
        key == '80' ||
        key == '90'
    ) {
        return true
    }
    return false
}
