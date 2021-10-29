import type { ThemeType, BasicColor } from './types'

export const themeTernaryOperator = <T>(theme: ThemeType, v1: T, v2: T): T =>
    theme === 'light' ? v1 : v2

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
